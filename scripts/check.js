const fs = require('fs');
const required = ['frontend/index.html', 'frontend/styles.css', 'frontend/app.js', 'backend/server.js'];
const missing = required.filter((file) => !fs.existsSync(file));
if (missing.length) {
  console.error(`Missing files: ${missing.join(', ')}`);
  process.exit(1);
}
const html = fs.readFileSync('frontend/index.html', 'utf8');
for (const needle of ['id="opportunity-form"', 'id="score"', 'id="tasks"', 'id="resourcePlan"']) {
  if (!html.includes(needle)) {
    console.error(`Missing required UI hook: ${needle}`);
    process.exit(1);
  }
}
console.log('Static demo checks passed.');
