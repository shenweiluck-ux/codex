const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT || 3000);
const ROOT = path.resolve(__dirname, "..");
const FRONTEND_DIR = path.join(ROOT, "frontend");

const memoryStore = {
  opportunities: [],
  interactions: [],
  resourceRequests: []
};

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml"
};

function sendJson(res, status, payload) {
  const body = JSON.stringify(payload, null, 2);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body)
  });
  res.end(body);
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        req.destroy();
        reject(new Error("Request body too large"));
      }
    });
    req.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
  });
}

function serveStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const requested = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
  const filePath = path.normalize(path.join(FRONTEND_DIR, requested));

  if (!filePath.startsWith(FRONTEND_DIR)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": mimeTypes[ext] || "application/octet-stream" });
    res.end(data);
  });
}

async function handleApi(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === "GET" && url.pathname === "/api/health") {
    sendJson(res, 200, { ok: true, service: "ltc-2-demo", mode: "memory" });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/opportunities") {
    sendJson(res, 200, { data: memoryStore.opportunities });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/opportunities") {
    const payload = await readJson(req);
    const opportunity = {
      id: payload.id || `opp-${Date.now()}`,
      name: payload.name || "新商机",
      amount: Number(payload.amount || 0),
      createdAt: new Date().toISOString()
    };
    memoryStore.opportunities.push(opportunity);
    sendJson(res, 201, { data: opportunity });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/interactions") {
    const payload = await readJson(req);
    const interaction = {
      id: `int-${Date.now()}`,
      opportunityId: payload.opportunityId,
      text: payload.text || "",
      createdAt: new Date().toISOString()
    };
    memoryStore.interactions.push(interaction);
    sendJson(res, 201, { data: interaction });
    return;
  }

  sendJson(res, 404, { error: "API route not found" });
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.url.startsWith("/api/")) {
      await handleApi(req, res);
      return;
    }
    serveStatic(req, res);
  } catch (error) {
    sendJson(res, 500, { error: error.message });
  }
});

server.listen(PORT, () => {
  console.log(`LTC 2.0 demo is running at http://localhost:${PORT}`);
});
