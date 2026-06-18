const STORAGE_KEY = "ltc2-ai-cockpit-v2-demo-data";

const sampleLogs = [
  "今天和客户信息部张总、采购王经理开会。张总认可我们的CRM方案，但采购认为价格偏高。客户预算大约80万，希望8月完成选型。目前A厂商也在跟进，报价可能更低。客户希望我们下周提供行业案例和初步报价。",
  "客户财务刘总第一次参加会议，重点关注ROI和付款方式。客户希望合同签署后30%预付款，验收后付尾款。最终拍板人是集团CIO，下周需要我们准备一份高层汇报材料。",
  "客户要求9月底上线，涉及部分定制开发。交付同事还没有评估工期。采购提出如果价格能降到70万，本月底就可以推进合同评审。",
  "客户采购说B厂商报价比我们低15%，但信息部认为B厂商实施能力一般。客户希望我们说明CRM、CPQ和合同管理之间的数据如何流转，并给出分阶段上线方案。",
  "客户老板临时参加会议，重点问项目能否本季度产生效果，以及是否会影响现有业务运行。销售判断老板对ROI比较敏感，需要公司高层陪访一次。"
];

const termKnowledge = {
  CRM: { title: "CRM 关联信息", body: "客户、联系人、商机和互动记录的主数据入口。点击后优先展示本商机历史中出现 CRM 的输入，以及相似项目经验。" },
  CPQ: { title: "CPQ 关联信息", body: "报价配置、折扣、毛利和报价版本相关。通常和商务审批、价格策略、快速报价通道有关。" },
  ROI: { title: "ROI 关联信息", body: "财务和高层关注的价值证明。建议关联收益测算、成本节约、风险降低和回收周期。" },
  ERP: { title: "ERP 关联信息", body: "订单、交付、开票、回款数据相关。常触发系统集成、交付和回款风险判断。" },
  LTC: { title: "LTC 关联信息", body: "从线索到现金的端到端流程。当前系统用实时信息驱动商机状态、任务和资源。" }
};

const signalKnowledge = {
  budget: {
    title: "预算/金额信号",
    body: "预算信息会提升商机成熟度，但还需要继续确认预算来源、审批路径和预算上限是否真实可用。",
    action: "建议下一步确认：预算是否已批、由谁审批、是否包含实施和服务费用。"
  },
  time: {
    title: "采购时间信号",
    body: "时间信息会影响推进紧迫度和预测签约周期。越接近客户决策时间，越需要检查资源响应和审批节奏。",
    action: "建议下一步确认：客户内部里程碑、选型时间、合同评审时间和上线目标。"
  },
  competitor: {
    title: "竞争态势信号",
    body: "竞品进入会提高竞争风险，也可能意味着客户已进入比较和筛选阶段。",
    action: "建议下一步准备：竞品对比、差异化价值材料、ROI 证明和价格谈判策略。"
  },
  decision: {
    title: "决策链信号",
    body: "CIO、老板、最终拍板人等信息会提升决策链清晰度，是申请高层陪访和主管介入的重要依据。",
    action: "建议下一步补齐：最终决策人、影响人、使用部门、采购和财务的关注点。"
  },
  risk: {
    title: "风险/约束信号",
    body: "压价、定制、上线、付款、验收等词通常意味着商务、交付或回款风险正在出现。",
    action: "建议下一步触发：交付评估、财务评审、折扣交换条件或合同风险预审。"
  },
  term: {
    title: "系统关键词",
    body: "CRM、CPQ、ROI、ERP、LTC 等关键词可以关联历史输入、相似项目和知识资料。",
    action: "建议点击具体关键词查看关联项目和历史记录。"
  }
};

const relatedProjectLibrary = {
  CRM: [
    { name: "华东制造 CRM 升级项目", status: "已赢单", amount: "96万", note: "客户关注联系人主数据质量，最终通过CRM与ERP集成方案打消顾虑。" },
    { name: "医药渠道客户管理项目", status: "交付中", amount: "140万", note: "先做销售线索治理，再推进移动端拜访记录，是项目推进关键。" }
  ],
  CPQ: [
    { name: "装备行业 CPQ 报价项目", status: "合同评审", amount: "180万", note: "折扣审批和毛利测算是主要风险点，财务提前介入后审批周期缩短。" }
  ],
  ROI: [
    { name: "零售集团 ROI 价值证明项目", status: "已赢单", amount: "75万", note: "用库存周转、人工节省和销售预测准确率三项指标完成高层汇报。" }
  ],
  ERP: [
    { name: "汽配企业 ERP 集成项目", status: "交付评估", amount: "120万", note: "交付风险集中在订单、开票和回款数据同步，项目经理提前介入。" }
  ],
  LTC: [
    { name: "区域销售 LTC 试点项目", status: "试点运行", amount: "内部项目", note: "试点覆盖线索、商机、报价、合同、交付和回款闭环。" }
  ]
};

const caseProjectLibrary = [
  {
    id: "case-1",
    name: "华东制造 CRM 升级项目",
    industry: "制造业",
    amount: 96,
    status: "已赢单",
    tags: ["CRM", "ERP", "招投标", "预算接近"],
    reason: "同为制造业，预算接近，且客户曾要求走招投标。",
    tenderMemory: "客户在第二次沟通中确认必须走公开招投标，采购要求提前准备技术标、商务标和竞品差异化说明。最终通过ROI材料和实施风险对比提升评标得分。",
    keyLessons: ["标书里要突出系统集成能力", "提前准备竞品对比表", "投标前必须锁定业务部门支持人"],
    attachments: ["技术标模板.docx", "商务报价拆分表.xlsx", "竞品评分对比.pdf"]
  },
  {
    id: "case-2",
    name: "医药渠道客户管理项目",
    industry: "医药流通",
    amount: 140,
    status: "交付中",
    tags: ["CRM", "POC", "渠道管理"],
    reason: "同样涉及CRM和移动端拜访记录，客户先要求POC验证。",
    tenderMemory: "该项目未走正式招投标，但客户要求两周POC验证。POC成功标准包括移动拜访录入率、客户主数据清洗效果和主管看板可用性。",
    keyLessons: ["先定义POC成功标准", "减少销售手工录入阻力", "把管理看板和销售收益绑定"],
    attachments: ["POC计划书.docx", "客户主数据清洗清单.xlsx"]
  },
  {
    id: "case-3",
    name: "汽配企业 ERP 集成项目",
    industry: "制造业",
    amount: 160,
    status: "交付评估",
    tags: ["ERP", "交付风险", "验收"],
    reason: "同属制造业，金额较高，交付和验收边界复杂。",
    tenderMemory: "项目没有招投标，但客户要求两个月上线并接入ERP订单、开票和回款数据。后续因接口范围不清导致交付风险升高。",
    keyLessons: ["不要先承诺上线周期", "ERP接口范围必须形成附件", "验收标准要进入合同"],
    attachments: ["ERP接口范围说明.xlsx", "验收标准样例.docx"]
  },
  {
    id: "case-4",
    name: "装备行业 CPQ 报价项目",
    industry: "装备制造",
    amount: 180,
    status: "合同评审",
    tags: ["CPQ", "招投标", "价格特批"],
    reason: "存在招投标和价格竞争，适合参考投标报价拆分策略。",
    tenderMemory: "客户走邀请招标，A厂商低价进入。团队将方案拆成基础模块和扩展包，并用付款条件换取折扣空间。",
    keyLessons: ["投标报价不要只做总价对比", "保留扩展包空间", "折扣必须换取客户承诺"],
    attachments: ["投标报价拆分策略.xlsx", "价格特批说明.docx"]
  }
];

const defaultOpportunity = {
  id: "opp-1",
  name: "制造业客户排程系统项目",
  amount: 120,
  winRate: 42,
  rightsLevel: "L1",
  riskLevel: "中",
  completeness: 28,
  scores: {},
  contacts: [],
  signals: [],
  tasks: ["补充客户预算来源和审批路径。", "识别最终拍板人和财务参与情况。"],
  risks: [{ level: "中", title: "信息不足", text: "当前仍缺少预算、决策链和采购路径信息。" }],
  resources: ["补充需求、预算、决策链后可解锁更多资源"],
  requests: [],
  history: [],
  pathFlags: {
    tender: false,
    poc: false
  },
  processPath: [],
  lastDiagnosis: "这是一个早期机会，建议先补齐预算、决策链和关键人态度。"
};

function makeHistory(time, text, changes, signals, after) {
  return {
    id: `hist-${time.replace(/\D/g, "")}`,
    time,
    text,
    changes,
    signals,
    before: { winRate: 30, rightsLevel: "L1", riskLevel: "中", completeness: 25 },
    after
  };
}

function makeDemoOpportunity(config) {
  const opp = {
    ...structuredClone(defaultOpportunity),
    ...config,
    scores: config.scores || {},
    contacts: config.contacts || [],
    signals: config.signals || [],
    tasks: config.tasks || [],
    risks: config.risks || [],
    resources: config.resources || [],
    requests: config.requests || [],
    history: config.history || [],
    pathFlags: config.pathFlags || { tender: false, poc: false }
  };
  opp.processPath = buildProcessPath(opp);
  return opp;
}

function createDemoOpportunities() {
  return [
    makeDemoOpportunity({
      id: "opp-1",
      name: "华东制造 CRM 升级项目",
      amount: 120,
      winRate: 63,
      rightsLevel: "L4",
      riskLevel: "高",
      completeness: 68,
      pathFlags: { tender: true, poc: false },
      lastDiagnosis: "需求和预算较清晰，但客户确认走招投标且 A 厂商低价进入，竞争和商务风险较高。",
      signals: [
        { type: "budget", label: "预算/金额", value: "120万" },
        { type: "competitor", label: "竞争态势", value: "A厂商" },
        { type: "term", label: "知识关键词", value: "CRM" }
      ],
      contacts: [
        { name: "张总", role: "业务/技术", attitude: "支持" },
        { name: "王经理", role: "采购", attitude: "谨慎" },
        { name: "集团CIO", role: "最终决策", attitude: "未知" }
      ],
      tasks: ["准备技术标和商务标材料。", "补齐评标规则和决策链地图。", "准备 A 厂商竞品对比和 ROI 证明。"],
      risks: [
        { level: "高", title: "招投标风险", text: "客户已确认走招投标，需提前准备标书和评标策略。" },
        { level: "高", title: "竞争风险", text: "A 厂商低价进入，需要差异化价值材料。" }
      ],
      resources: ["可申请方案专家与行业案例", "可申请主管陪访或高层拜访", "建议申请价格特批预评审"],
      requests: [
        { id: "req-demo-1", type: "售前支持", owner: "售前负责人", priority: "B", sla: "12小时", status: "已接单", material: "该项目进入招投标准备阶段，需售前支持技术标、差异化方案和演示材料。" },
        { id: "req-demo-2", type: "价格特批", owner: "销售总监", priority: "B", sla: "12小时", status: "审批中", material: "A 厂商低价进入，需预评审折扣空间和交换条件。" }
      ],
      history: [
        makeHistory("2026/6/12 09:30:00", "客户信息部张总认可我们的CRM方案，预算大约120万，希望8月完成选型。采购王经理要求我们先给初步报价。", ["赢率 42% → 54%", "权益 L1 → L3", "风险 中 → 中", "完整度 28% → 54%"], [{ label: "预算/金额", value: "120万" }, { label: "知识关键词", value: "CRM" }], { winRate: 54, rightsLevel: "L3", riskLevel: "中", completeness: 54 }),
        makeHistory("2026/6/14 14:20:00", "客户确认后续要走招投标，采购会发标书模板，需要我们准备技术标、商务标和投标文件。", ["赢率 54% → 60%", "权益 L3 → L4", "风险 中 → 高", "完整度 54% → 64%", "推进路径变动：新增“招投标”阶段，后续需要准备标书、投标策略和评标风险。"], [{ label: "采购时间", value: "后续" }, { label: "竞争态势", value: "招投标" }], { winRate: 60, rightsLevel: "L4", riskLevel: "高", completeness: 64 }),
        makeHistory("2026/6/16 16:10:00", "采购透露A厂商也进入了，报价可能更低。张总希望我们提供竞品对比和ROI材料。", ["赢率 60% → 63%", "权益 L4 → L4", "风险 高 → 高", "完整度 64% → 68%"], [{ label: "竞争态势", value: "A厂商" }, { label: "价值关注", value: "ROI" }], { winRate: 63, rightsLevel: "L4", riskLevel: "高", completeness: 68 })
      ]
    }),
    makeDemoOpportunity({
      id: "opp-2",
      name: "医药渠道 CRM 拜访管理项目",
      amount: 90,
      winRate: 71,
      rightsLevel: "L5",
      riskLevel: "中",
      completeness: 76,
      pathFlags: { tender: false, poc: true },
      lastDiagnosis: "客户需求明确，预算和时间清晰，POC/试点是当前推进关键。",
      signals: [{ type: "term", label: "知识关键词", value: "CRM" }, { type: "budget", label: "预算/金额", value: "90万" }],
      contacts: [
        { name: "刘总", role: "业务/技术", attitude: "支持" },
        { name: "赵经理", role: "采购", attitude: "未知" }
      ],
      tasks: ["明确 POC 成功标准。", "准备移动端拜访录入演示。", "输出客户主数据清洗清单。"],
      risks: [{ level: "中", title: "POC风险", text: "客户要求两周试点，需先定义成功标准。" }],
      resources: ["可进入快速报价/合同审批判断", "可申请方案专家与行业案例"],
      requests: [{ id: "req-demo-3", type: "方案专家", owner: "售前负责人", priority: "A", sla: "4小时", status: "已完成", material: "客户进入POC验证阶段，需要方案专家准备验证计划。" }],
      history: [
        makeHistory("2026/6/10 10:00:00", "客户希望解决渠道销售拜访记录不完整的问题，明确提到CRM移动端录入和主管看板。预算大约90万。", ["赢率 35% → 56%", "权益 L1 → L3", "风险 中 → 中", "完整度 25% → 58%"], [{ label: "知识关键词", value: "CRM" }, { label: "预算/金额", value: "90万" }], { winRate: 56, rightsLevel: "L3", riskLevel: "中", completeness: 58 }),
        makeHistory("2026/6/13 11:40:00", "客户要求先做两周POC，验证移动拜访录入率、客户主数据清洗效果和主管看板可用性。", ["赢率 56% → 68%", "权益 L3 → L4", "风险 中 → 中", "完整度 58% → 70%", "推进路径变动：新增“POC/试点验证”阶段，需要准备验证目标和成功标准。"], [{ label: "交付信号", value: "POC/试点" }], { winRate: 68, rightsLevel: "L4", riskLevel: "中", completeness: 70 }),
        makeHistory("2026/6/17 15:30:00", "POC范围已确认，刘总支持方案。客户希望下周给正式报价和合同条款。", ["赢率 68% → 71%", "权益 L4 → L5", "风险 中 → 中", "完整度 70% → 76%"], [{ label: "客户态度", value: "支持" }, { label: "采购时间", value: "下周" }], { winRate: 71, rightsLevel: "L5", riskLevel: "中", completeness: 76 })
      ]
    }),
    makeDemoOpportunity({
      id: "opp-3",
      name: "汽配企业 ERP 集成项目",
      amount: 160,
      winRate: 39,
      rightsLevel: "L2",
      riskLevel: "高",
      completeness: 46,
      pathFlags: { tender: false, poc: false },
      lastDiagnosis: "金额较高但交付边界复杂，ERP接口、上线周期和验收标准仍不清晰。",
      signals: [{ type: "term", label: "知识关键词", value: "ERP" }, { type: "risk", label: "交付信号", value: "上线/接口/验收" }],
      contacts: [{ name: "周主任", role: "业务/技术", attitude: "谨慎" }],
      tasks: ["申请交付评估。", "确认ERP接口范围。", "把验收标准写入合同附件。"],
      risks: [
        { level: "高", title: "交付风险", text: "客户要求两个月上线，但接口范围和验收标准不清。" },
        { level: "中", title: "回款风险", text: "付款条件尚未明确。" }
      ],
      resources: ["建议立即申请交付评估", "可申请售前初步支持"],
      history: [
        makeHistory("2026/6/11 13:20:00", "客户说现有ERP订单、开票和回款数据打通困难，希望我们两个月内上线。", ["赢率 30% → 38%", "权益 L1 → L2", "风险 中 → 高", "完整度 25% → 42%"], [{ label: "知识关键词", value: "ERP" }, { label: "交付信号", value: "两个月上线" }], { winRate: 38, rightsLevel: "L2", riskLevel: "高", completeness: 42 }),
        makeHistory("2026/6/15 17:00:00", "交付同事反馈接口范围不清，客户还没有明确验收标准和历史数据迁移边界。", ["赢率 38% → 39%", "权益 L2 → L2", "风险 高 → 高", "完整度 42% → 46%"], [{ label: "交付信号", value: "接口/验收" }], { winRate: 39, rightsLevel: "L2", riskLevel: "高", completeness: 46 })
      ]
    }),
    makeDemoOpportunity({
      id: "opp-4",
      name: "装备行业 CPQ 报价项目",
      amount: 180,
      winRate: 57,
      rightsLevel: "L4",
      riskLevel: "高",
      completeness: 64,
      pathFlags: { tender: true, poc: false },
      lastDiagnosis: "客户走邀请招标，价格竞争强，CPQ报价拆分和折扣交换条件是关键。",
      signals: [{ type: "term", label: "知识关键词", value: "CPQ" }, { type: "competitor", label: "竞争态势", value: "A厂商" }],
      contacts: [{ name: "陈总", role: "最终决策", attitude: "未知" }, { name: "采购经理", role: "采购", attitude: "谨慎" }],
      tasks: ["准备投标报价拆分策略。", "申请价格特批预评审。", "明确折扣交换条件。"],
      risks: [{ level: "高", title: "商务风险", text: "A厂商低价进入，客户要求降价。" }],
      resources: ["建议申请价格特批预评审", "可申请主管陪访或高层拜访"],
      history: [
        makeHistory("2026/6/09 09:10:00", "客户装备事业部需要CPQ报价系统，项目预计180万，采购说会走邀请招标。", ["赢率 30% → 52%", "权益 L1 → L3", "风险 中 → 高", "完整度 25% → 58%", "推进路径变动：新增“招投标”阶段，后续需要准备标书、投标策略和评标风险。"], [{ label: "知识关键词", value: "CPQ" }, { label: "预算/金额", value: "180万" }], { winRate: 52, rightsLevel: "L3", riskLevel: "高", completeness: 58 }),
        makeHistory("2026/6/14 18:30:00", "A厂商低价进入，采购希望我们把报价降到160万以内。陈总关注后续扩展包能力。", ["赢率 52% → 57%", "权益 L3 → L4", "风险 高 → 高", "完整度 58% → 64%"], [{ label: "竞争态势", value: "A厂商" }, { label: "商务信号", value: "降价/160万" }], { winRate: 57, rightsLevel: "L4", riskLevel: "高", completeness: 64 })
      ]
    }),
    makeDemoOpportunity({
      id: "opp-5",
      name: "教育集团数据平台项目",
      amount: 75,
      winRate: 49,
      rightsLevel: "L3",
      riskLevel: "中",
      completeness: 52,
      pathFlags: { tender: false, poc: false },
      lastDiagnosis: "客户原本考虑招标，后续改为直接商务谈判，路径已发生变化。",
      signals: [{ type: "budget", label: "预算/金额", value: "75万" }],
      contacts: [{ name: "李主任", role: "业务/技术", attitude: "支持" }],
      tasks: ["确认直接商务谈判的审批路径。", "准备合同条款和付款条件。"],
      risks: [{ level: "中", title: "决策风险", text: "虽然不走招标，但仍需确认内部审批人。" }],
      resources: ["可申请方案专家与行业案例"],
      history: [
        makeHistory("2026/6/08 10:20:00", "客户一开始说可能需要招标，预算约75万，需要我们准备数据平台方案和标书思路。", ["赢率 30% → 45%", "权益 L1 → L2", "风险 中 → 中", "完整度 25% → 45%", "推进路径变动：新增“招投标”阶段，后续需要准备标书、投标策略和评标风险。"], [{ label: "预算/金额", value: "75万" }, { label: "竞争态势", value: "招标" }], { winRate: 45, rightsLevel: "L2", riskLevel: "中", completeness: 45 }),
        makeHistory("2026/6/16 09:50:00", "客户今天确认这个项目不在招标了，改为直接商务谈判。李主任支持我们方案，但还要走校内审批。", ["赢率 45% → 49%", "权益 L2 → L3", "风险 中 → 中", "完整度 45% → 52%", "推进路径变动：移除“招投标”阶段，原因是客户沟通中明确不再走招标。"], [{ label: "客户态度", value: "支持" }], { winRate: 49, rightsLevel: "L3", riskLevel: "中", completeness: 52 })
      ]
    })
  ];
}

const defaultState = {
  activeView: "workspace",
  activeOpportunityId: "opp-1",
  activeMemoryOpportunityId: "all",
  pendingUnderstanding: null,
  opportunities: createDemoOpportunities()
};

let state = loadState();
const $ = (id) => document.getElementById(id);

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : structuredClone(defaultState);
    parsed.activeMemoryOpportunityId ||= "all";
    parsed.pendingUnderstanding = null;
    parsed.opportunities.forEach(normalizeOpportunity);
    return parsed;
  } catch {
    return structuredClone(defaultState);
  }
}

function normalizeOpportunity(opp) {
  opp.scores ||= {};
  opp.contacts ||= [];
  opp.signals ||= [];
  opp.tasks ||= [];
  opp.risks ||= [];
  opp.resources ||= [];
  opp.requests ||= [];
  opp.history ||= [];
  opp.pathFlags ||= { tender: false, poc: false };
  opp.processPath ||= [];
  opp.lastDiagnosis ||= "等待新的客户现场信息。";
}

function saveState() {
  const copy = structuredClone(state);
  copy.pendingUnderstanding = null;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(copy));
}

function activeOpp() {
  return state.opportunities.find((opp) => opp.id === state.activeOpportunityId) || state.opportunities[0];
}

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function containsAny(text, words) {
  return words.some((word) => text.includes(word));
}

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function extractContacts(text) {
  const contacts = [];
  const pattern = /([\u4e00-\u9fa5]{1,3})(总|经理|主任|CIO|CEO|CFO|采购|财务|信息部|老板)/g;
  let match;
  while ((match = pattern.exec(text))) {
    const raw = match[0];
    const role = raw.includes("采购")
      ? "采购"
      : raw.includes("财务") || raw.includes("CFO")
        ? "财务"
        : raw.includes("CIO") || raw.includes("CEO") || raw.includes("老板")
          ? "最终决策"
          : raw.includes("信息")
            ? "业务/技术"
            : "关键人";
    contacts.push({
      name: raw,
      role,
      attitude: containsAny(text, ["认可", "倾向", "支持", "满意"]) ? "支持" : containsAny(text, ["压价", "价格高", "贵"]) ? "谨慎" : "未知"
    });
  }
  return contacts;
}

function extractSignals(text) {
  const amountMatch = text.match(/(\d+(?:\.\d+)?)\s*(万|万元)/);
  const monthMatch = text.match(/(\d{1,2})\s*月|月底|下周|本月|季度|9月底|8月/);
  const competitorMatch = text.match(/[A-ZＡ-Ｚ]\s*厂商|竞品|竞争对手|友商/g);
  const discountMatch = text.match(/降到\s*(\d+(?:\.\d+)?)\s*万|降价|折扣|价格|报价|贵|压价/g);
  const signals = [];
  if (amountMatch) signals.push({ type: "budget", label: "预算/金额", value: `${amountMatch[1]}${amountMatch[2]}` });
  if (monthMatch) signals.push({ type: "time", label: "采购时间", value: monthMatch[0] });
  if (competitorMatch) signals.push({ type: "competitor", label: "竞争态势", value: unique(competitorMatch).join("、") });
  if (discountMatch) signals.push({ type: "risk", label: "商务信号", value: unique(discountMatch).slice(0, 3).join("、") });
  if (containsAny(text, ["认可", "倾向", "支持"])) signals.push({ type: "support", label: "客户态度", value: "存在支持或认可信号" });
  if (containsAny(text, ["ROI", "投资回报", "价值", "收益"])) signals.push({ type: "value", label: "价值关注", value: "客户关注 ROI/业务价值" });
  if (containsAny(text, ["定制", "交付", "上线", "工期", "验收"])) signals.push({ type: "delivery", label: "交付信号", value: "需要交付评估或验收澄清" });
  if (containsAny(text, ["最终拍板", "CIO", "CEO", "老板", "决策人"])) signals.push({ type: "decision", label: "决策链", value: "出现最终决策人线索" });
  if (containsAny(text, ["付款", "预付款", "尾款", "回款"])) signals.push({ type: "payment", label: "回款/付款", value: "出现付款条件信息" });
  Object.keys(termKnowledge).forEach((term) => {
    if (text.includes(term)) signals.push({ type: "term", label: "知识关键词", value: term });
  });
  return signals;
}

function scoreText(text, opp) {
  const signals = extractSignals(text);
  const newContacts = extractContacts(text);
  const pathUpdate = evaluateProcessPath(text, opp);
  const hasBudget = signals.some((s) => s.label === "预算/金额");
  const hasTime = signals.some((s) => s.label === "采购时间");
  const hasCompetitor = signals.some((s) => s.label === "竞争态势");
  const hasDecision = signals.some((s) => s.label === "决策链");
  const hasDelivery = signals.some((s) => s.label === "交付信号");
  const hasPayment = signals.some((s) => s.label === "回款/付款");
  const hasValue = signals.some((s) => s.label === "价值关注") || containsAny(text, ["痛点", "效率", "成本", "风险", "价值"]);
  const hasSupporter = containsAny(text, ["认可", "倾向", "支持"]);
  const hasPriceRisk = containsAny(text, ["贵", "压价", "降价", "折扣", "价格", "报价更低", "降到"]);

  const scores = {
    需求清晰度: clamp((opp.scores.需求清晰度 || 25) + (hasValue ? 25 : 8)),
    痛点强度: clamp((opp.scores.痛点强度 || 25) + (containsAny(text, ["迫切", "必须", "影响", "效率", "成本", "风险"]) ? 22 : 8)),
    预算确定性: clamp((opp.scores.预算确定性 || 15) + (hasBudget ? 32 : -2)),
    决策链清晰度: clamp((opp.scores.决策链清晰度 || 12) + (hasDecision ? 30 : newContacts.length ? 12 : 0)),
    关键人支持度: clamp((opp.scores.关键人支持度 || 20) + (hasSupporter ? 28 : 4)),
    采购时间明确度: clamp((opp.scores.采购时间明确度 || 15) + (hasTime ? 28 : 0)),
    竞争风险: clamp((opp.scores.竞争风险 || 20) + (hasCompetitor ? 38 : 4)),
    方案匹配度: clamp((opp.scores.方案匹配度 || 25) + (hasSupporter ? 20 : 6)),
    商务风险: clamp((opp.scores.商务风险 || 15) + (hasPriceRisk ? 35 : 5)),
    交付风险: clamp((opp.scores.交付风险 || 10) + (hasDelivery ? 34 : 4)),
    回款风险: clamp((opp.scores.回款风险 || 10) + (hasPayment ? 18 : 3))
  };

  const completeness = clamp(["需求清晰度", "预算确定性", "决策链清晰度", "采购时间明确度", "方案匹配度"].reduce((sum, key) => sum + scores[key], 0) / 5);
  const riskScore = Math.round((scores.竞争风险 + scores.商务风险 + scores.交付风险 + scores.回款风险) / 4);
  const riskLevel = riskScore >= 68 ? "高" : riskScore >= 38 ? "中" : "低";
  const winRate = clamp(Math.round((scores.需求清晰度 + scores.预算确定性 + scores.决策链清晰度 + scores.关键人支持度 + scores.方案匹配度 + scores.采购时间明确度) / 7 - riskScore * 0.18 + 22));
  const rightsLevel = getRightsLevel(completeness, scores);
  const risks = buildRisks(scores, hasCompetitor, hasPriceRisk, hasDelivery, hasPayment);
  const tasks = buildTasks(scores, risks);
  const resources = buildResources(rightsLevel, scores, risks);
  const diagnosis = buildDiagnosis(scores, riskLevel, winRate, rightsLevel);

  return { text, signals, newContacts, scores, completeness: Math.round(completeness), riskLevel, winRate, rightsLevel, risks, tasks, resources, diagnosis, pathUpdate };
}

function evaluateProcessPath(text, opp) {
  const beforeFlags = { ...(opp.pathFlags || {}) };
  const nextFlags = { ...beforeFlags };
  const changes = [];

  const tenderRemoved = containsAny(text, ["不招标", "不走招标", "不在招标", "不需要招标", "不用招标", "取消招标", "不走招投标", "无需招投标"]);
  const tenderAdded = containsAny(text, ["招标", "投标", "招投标", "标书", "投标文件", "开标", "中标"]);
  if (tenderRemoved && nextFlags.tender) {
    nextFlags.tender = false;
    changes.push("推进路径变动：移除“招投标”阶段，原因是客户沟通中明确不再走招标。");
  } else if (tenderAdded && !nextFlags.tender && !tenderRemoved) {
    nextFlags.tender = true;
    changes.push("推进路径变动：新增“招投标”阶段，后续需要准备标书、投标策略和评标风险。");
  }

  const pocRemoved = containsAny(text, ["不做POC", "不做试点", "取消试点", "不需要演示", "不用演示"]);
  const pocAdded = containsAny(text, ["POC", "试点", "演示", "样板", "验证环境", "概念验证"]);
  if (pocRemoved && nextFlags.poc) {
    nextFlags.poc = false;
    changes.push("推进路径变动：移除“POC/试点验证”阶段。");
  } else if (pocAdded && !nextFlags.poc && !pocRemoved) {
    nextFlags.poc = true;
    changes.push("推进路径变动：新增“POC/试点验证”阶段，需要准备验证目标和成功标准。");
  }

  return {
    pathFlags: nextFlags,
    changes,
    processPath: buildProcessPath({ ...opp, pathFlags: nextFlags })
  };
}

function buildProcessPath(opp) {
  const flags = opp.pathFlags || {};
  const stages = [
    { key: "discover", title: "需求澄清", desc: "确认痛点、场景和成功标准" },
    { key: "solution", title: "方案验证", desc: "形成方案、价值证明和技术边界" }
  ];
  if (flags.poc) stages.push({ key: "poc", title: "POC/试点验证", desc: "验证效果、范围和客户成功标准" });
  if (flags.tender) stages.push({ key: "tender", title: "招投标", desc: "准备标书、投标策略和评标风险" });
  stages.push(
    { key: "quote", title: "商务报价", desc: "报价、折扣、毛利和付款条件" },
    { key: "contract", title: "合同签约", desc: "合同条款、法务财务评审" },
    { key: "delivery", title: "交付启动", desc: "交底、排期、资源和验收标准" },
    { key: "cash", title: "验收回款", desc: "验收、开票、回款和复盘" }
  );

  const progress = Math.max(1, Number(String(opp.rightsLevel || "L1").replace("L", "")) || 1);
  const currentIndex = Math.min(stages.length - 1, Math.max(0, Math.round((progress - 1) / 5 * (stages.length - 1))));
  return stages.map((stage, index) => ({
    ...stage,
    status: index < currentIndex ? "done" : index === currentIndex ? "active" : "pending"
  }));
}

function getRightsLevel(completeness, scores) {
  if (completeness >= 82 && scores.商务风险 < 60 && scores.交付风险 < 60) return "L6";
  if (completeness >= 72 && scores.预算确定性 >= 60) return "L5";
  if (scores.决策链清晰度 >= 55 && scores.关键人支持度 >= 50) return "L4";
  if (scores.预算确定性 >= 45 && scores.采购时间明确度 >= 45) return "L3";
  if (scores.需求清晰度 >= 45) return "L2";
  if (completeness >= 25) return "L1";
  return "L0";
}

function buildRisks(scores, hasCompetitor, hasPriceRisk, hasDelivery, hasPayment) {
  const risks = [];
  if (scores.预算确定性 < 45) risks.push({ level: "中", title: "预算风险", text: "预算来源或审批路径还不够清楚，正式报价前建议先确认预算上限。" });
  if (scores.决策链清晰度 < 50) risks.push({ level: "中", title: "决策风险", text: "最终拍板人和影响人仍不完整，建议补充客户决策链地图。" });
  if (hasCompetitor || scores.竞争风险 >= 55) risks.push({ level: "高", title: "竞争风险", text: "竞品已进入或低价竞争明显，需要准备差异化价值材料。" });
  if (hasPriceRisk || scores.商务风险 >= 55) risks.push({ level: "高", title: "商务风险", text: "客户存在压价或折扣诉求，建议用付款条件、采购范围或签约时间交换折扣。" });
  if (hasDelivery || scores.交付风险 >= 55) risks.push({ level: "高", title: "交付风险", text: "涉及上线周期、定制或验收承诺，必须先做交付评估。" });
  if (hasPayment || scores.回款风险 >= 45) risks.push({ level: "中", title: "回款风险", text: "付款条件已出现，建议财务提前介入判断回款风险。" });
  if (!risks.length) risks.push({ level: "低", title: "暂无重大风险", text: "当前信息未识别到高风险，但仍需持续补全关键客户信息。" });
  return risks;
}

function buildTasks(scores, risks) {
  const tasks = [];
  if (scores.预算确定性 < 60) tasks.push("确认预算来源、预算上限和审批路径。");
  if (scores.决策链清晰度 < 60) tasks.push("补充决策链地图，识别最终拍板人、影响人和反对者。");
  if (risks.some((r) => r.title === "竞争风险")) tasks.push("准备竞品对比和差异化价值材料。");
  if (risks.some((r) => r.title === "商务风险")) tasks.push("生成折扣申请说明，并设计折扣交换条件。");
  if (risks.some((r) => r.title === "交付风险")) tasks.push("申请交付评估，确认上线周期、定制范围和验收标准。");
  if (scores.方案匹配度 < 60) tasks.push("安排一次需求澄清会，确认客户成功标准和核心场景。");
  return tasks.slice(0, 6);
}

function buildResources(level, scores, risks) {
  const resources = [];
  if (["L2", "L3", "L4", "L5", "L6"].includes(level)) resources.push("可申请售前初步支持");
  if (["L3", "L4", "L5", "L6"].includes(level)) resources.push("可申请方案专家与行业案例");
  if (["L4", "L5", "L6"].includes(level)) resources.push("可申请主管陪访或高层拜访");
  if (["L5", "L6"].includes(level)) resources.push("可进入快速报价/合同审批判断");
  if (risks.some((r) => r.title === "交付风险")) resources.push("建议立即申请交付评估");
  if (scores.商务风险 >= 55) resources.push("建议申请价格特批预评审");
  return resources.length ? resources : ["补充需求、预算、决策链后可解锁更多资源"];
}

function buildDiagnosis(scores, riskLevel, winRate, rightsLevel) {
  const strengths = [];
  const gaps = [];
  if (scores.需求清晰度 >= 55) strengths.push("需求正在变清晰");
  if (scores.关键人支持度 >= 55) strengths.push("存在关键人支持");
  if (scores.预算确定性 < 55) gaps.push("预算来源不够清楚");
  if (scores.决策链清晰度 < 55) gaps.push("决策链仍不完整");
  if (scores.竞争风险 >= 55) gaps.push("竞品压力明显");
  if (scores.交付风险 >= 55) gaps.push("交付承诺需评估");
  const strengthText = strengths.length ? strengths.join("、") : "机会仍处于信息补全阶段";
  const gapText = gaps.length ? gaps.join("、") : "暂未识别到重大缺口";
  return `系统判断：${strengthText}；主要缺口是${gapText}。当前赢率 ${winRate}%，权益等级 ${rightsLevel}，风险等级 ${riskLevel}。`;
}

function snapshot(opp) {
  return { winRate: opp.winRate, rightsLevel: opp.rightsLevel, riskLevel: opp.riskLevel, completeness: opp.completeness };
}

function diffSnapshot(before, after) {
  return [
    `赢率 ${before.winRate}% → ${after.winRate}%`,
    `权益 ${before.rightsLevel} → ${after.rightsLevel}`,
    `风险 ${before.riskLevel} → ${after.riskLevel}`,
    `完整度 ${before.completeness}% → ${after.completeness}%`
  ];
}

function mergeContacts(oldContacts, newContacts) {
  const map = new Map(oldContacts.map((c) => [c.name, c]));
  newContacts.forEach((c) => map.set(c.name, { ...map.get(c.name), ...c }));
  return [...map.values()].slice(0, 8);
}

function generateUnderstanding() {
  const text = $("salesLogInput").value.trim();
  if (!text) {
    $("salesLogInput").focus();
    return;
  }
  state.pendingUnderstanding = scoreText(text, activeOpp());
  renderUnderstanding();
  $("confirmBtn").disabled = false;
}

function confirmUnderstanding() {
  const pending = state.pendingUnderstanding;
  if (!pending) return;
  const opp = activeOpp();
  const before = snapshot(opp);
  opp.signals = pending.signals;
  opp.contacts = mergeContacts(opp.contacts, pending.newContacts);
  opp.scores = pending.scores;
  opp.completeness = pending.completeness;
  opp.riskLevel = pending.riskLevel;
  opp.winRate = pending.winRate;
  opp.rightsLevel = pending.rightsLevel;
  opp.risks = pending.risks;
  opp.tasks = pending.tasks;
  opp.resources = pending.resources;
  opp.pathFlags = pending.pathUpdate.pathFlags;
  opp.processPath = buildProcessPath(opp);
  opp.lastDiagnosis = pending.diagnosis;

  const after = snapshot(opp);
  const time = new Date().toLocaleString("zh-CN", { hour12: false });
  opp.history.unshift({
    id: `hist-${Date.now()}`,
    time,
    text: pending.text,
    signals: pending.signals,
    changes: [...diffSnapshot(before, after), ...pending.pathUpdate.changes],
    before,
    after
  });

  $("salesLogInput").value = "";
  state.pendingUnderstanding = null;
  $("confirmBtn").disabled = true;
  renderAll();
}

function requestResource(type) {
  const opp = activeOpp();
  const request = {
    id: `req-${Date.now()}`,
    type,
    owner: type.includes("售前") || type.includes("方案") ? "售前负责人" : type.includes("交付") ? "项目经理" : type.includes("合同") ? "法务经理" : type.includes("价格") ? "销售总监" : "业务负责人",
    priority: ["L5", "L6"].includes(opp.rightsLevel) ? "A" : ["L3", "L4"].includes(opp.rightsLevel) ? "B" : "C",
    sla: ["L5", "L6"].includes(opp.rightsLevel) ? "4小时" : ["L3", "L4"].includes(opp.rightsLevel) ? "12小时" : "24小时",
    status: "待接单",
    material: buildMaterial(opp, type)
  };
  opp.requests.unshift(request);
  renderAll();
}

function buildMaterial(opp, type) {
  const signalText = opp.signals.map((s) => `${s.label}：${s.value}`).join("；") || "当前商机信息仍需补充";
  const riskText = opp.risks.map((r) => r.title).join("、");
  return `【${type}申请】\n商机：${opp.name}\n预计金额：${opp.amount} 万元\n当前权益等级：${opp.rightsLevel}，预测赢率：${opp.winRate}%\n关键信号：${signalText}\n主要风险：${riskText}\n申请理由：该商机已形成可判断的客户现场信息，建议投入${type}，帮助销售补齐关键缺口、加快流程推进并提升赢单概率。`;
}

function renderAll() {
  saveState();
  renderOpportunityCards();
  renderWorkspace();
  renderMemory();
  renderResources();
  renderManager();
  renderSamples();
}

function renderOpportunityCards() {
  $("opportunityCards").innerHTML = [...state.opportunities]
    .sort((a, b) => riskWeight(b.riskLevel) - riskWeight(a.riskLevel) || b.winRate - a.winRate)
    .map((opp) => `
      <button class="opp-card ${opp.id === state.activeOpportunityId ? "active" : ""}" data-opp-id="${opp.id}">
        <strong>${escapeHtml(opp.name)}</strong>
        <div class="opp-meta">
          <span class="badge">${opp.amount}万</span>
          <span class="badge ${opp.riskLevel === "高" ? "bad" : opp.riskLevel === "中" ? "warn" : "good"}">风险${opp.riskLevel}</span>
          <span class="badge">赢率${opp.winRate}%</span>
          <span class="badge">${opp.rightsLevel}</span>
        </div>
      </button>
    `).join("");
}

function riskWeight(level) {
  return level === "高" ? 3 : level === "中" ? 2 : 1;
}

function renderWorkspace() {
  const opp = activeOpp();
  $("activeOppName").textContent = opp.name;
  $("activeOppMeta").textContent = `预计金额 ${opp.amount} 万元`;
  $("winRateMetric").textContent = `${opp.winRate}%`;
  $("healthRing").style.setProperty("--value", opp.winRate);
  $("rightsMetric").textContent = opp.rightsLevel;
  $("riskMetric").textContent = opp.riskLevel;
  $("completenessMetric").textContent = `${opp.completeness}%`;
  $("aiDiagnosis").textContent = opp.lastDiagnosis;
  $("signalList").innerHTML = opp.signals.length
    ? opp.signals.map((s) => `<div class="signal-chip"><span>${s.label}</span><strong>${escapeHtml(s.value)}</strong></div>`).join("")
    : `<div class="signal-chip"><span>等待输入</span><strong>还没有新的业务信号</strong></div>`;
  $("taskList").innerHTML = listItems(opp.tasks, "任务", "good");
  $("riskList").innerHTML = opp.risks.map((r) => `<div class="list-item ${r.level === "高" ? "risk-high" : r.level === "中" ? "risk-mid" : "good"}"><span>${r.level}风险｜${r.title}</span><strong>${r.text}</strong></div>`).join("");
  renderUnlockPath(opp);
  renderUnderstanding();
}

function renderUnderstanding() {
  const pending = state.pendingUnderstanding;
  const card = $("understandingCard");
  if (!pending) {
    card.className = "understanding-card empty-state";
    card.innerHTML = `<span>等待输入</span><strong>AI 理解卡会显示在这里</strong><p>先生成理解卡，确认后再更新商机状态，避免系统替销售乱判断。</p>`;
    return;
  }
  card.className = "understanding-card";
  card.innerHTML = `
    <div class="understanding-grid">
      <div>
        <h2>AI 理解卡</h2>
        <p class="insight-line">${escapeHtml(pending.diagnosis)}</p>
        ${pending.pathUpdate.changes.length ? `<div class="path-change-preview">${pending.pathUpdate.changes.map((change) => `<strong>${escapeHtml(change)}</strong>`).join("")}</div>` : ""}
      </div>
      <div class="signal-list">
        ${pending.signals.map((s) => `<div class="signal-chip"><span>${s.label}</span><strong>${escapeHtml(s.value)}</strong></div>`).join("") || `<div class="signal-chip"><span>未识别</span><strong>建议补充预算、时间、决策人或风险信息</strong></div>`}
      </div>
    </div>
  `;
}

function renderUnlockPath(opp) {
  const path = (opp.processPath && opp.processPath.length) ? opp.processPath : buildProcessPath(opp);
  $("unlockPath").innerHTML = path.map((stage, index) => {
    const label = String(index + 1).padStart(2, "0");
    return `<div class="unlock-step ${stage.status}">
      <div class="unlock-level">${label}</div>
      <div><strong>${escapeHtml(stage.title)}</strong><p>${escapeHtml(stage.desc)}</p></div>
    </div>`;
  }).join("");
}

function renderMemory() {
  const selectedId = state.activeMemoryOpportunityId || "all";
  const selectedOpp = selectedId === "all" ? null : state.opportunities.find((opp) => opp.id === selectedId);
  renderMemoryOpportunityList(selectedId);

  const scopeOpps = selectedOpp ? [selectedOpp] : state.opportunities;
  const memories = scopeOpps
    .flatMap((opp) => (opp.history || []).map((item) => ({ ...item, oppName: opp.name, oppId: opp.id })))
    .sort((a, b) => String(b.time).localeCompare(String(a.time), "zh-CN"));

  $("memoryTitle").textContent = selectedOpp ? selectedOpp.name : "全部商机记忆";
  $("memorySubtitle").textContent = selectedOpp
    ? `展示 ${selectedOpp.name} 的沟通流水、系统判断和阶段变化。`
    : "未选择商机时，按时间展示全部商机记忆。";
  $("memoryInfoTitle").textContent = "关键信息面板";
  $("memoryInfoSubtitle").textContent = selectedOpp
    ? `范围：当前商机｜${selectedOpp.name}`
    : "范围：全部商机｜汇总全部商机的关键人和信息";

  $("historyList").innerHTML = memories.length
    ? memories.map((item, index) => `
      <article class="history-item">
        <div class="history-meta"><span>${selectedOpp ? `第 ${memories.length - index} 次输入` : escapeHtml(item.oppName)}</span><span>${item.time}</span></div>
        <div class="history-text">${linkTerms(item.text)}</div>
        <div class="history-change-grid">${item.changes.map((c) => `<div class="history-change"><span>系统变动</span><strong>${escapeHtml(c)}</strong></div>`).join("")}</div>
        <div class="history-signals">${item.signals.map((s) => `<span class="history-signal">${s.label}：${escapeHtml(s.value)}</span>`).join("")}</div>
      </article>
    `).join("")
    : `<div class="empty-state panel"><strong>${selectedOpp ? "这个商机还没有记忆" : "暂无商机记忆"}</strong><p>${selectedOpp ? "在作战台选择该商机并确认一次 AI 理解卡后，这里会自动归档。" : "确认一次 AI 理解卡后，这里会保存所有商机的原文、信号和系统变化。"}</p></div>`;

  const contacts = scopeOpps.flatMap((opp) => (opp.contacts || []).map((contact) => ({ ...contact, oppName: opp.name })));
  $("contactMap").innerHTML = contacts.length
    ? contacts.map((c) => `<div class="contact-card"><div><strong>${escapeHtml(c.name)}</strong><p>${escapeHtml(c.role)}${selectedOpp ? "" : `｜${escapeHtml(c.oppName)}`}</p></div><span class="badge ${c.attitude === "支持" ? "good" : c.attitude === "谨慎" ? "warn" : ""}">${escapeHtml(c.attitude)}</span></div>`).join("")
    : `<div class="empty-state"><strong>暂无关键人</strong><p>${selectedOpp ? "这个商机还没有沉淀关键人。" : "任一商机中输入客户联系人、采购、财务、CIO 或老板后都会沉淀到这里。"}</p></div>`;
  renderRelatedProjects(scopeOpps, selectedOpp);
}

function renderRelatedProjects(scopeOpps, selectedOpp) {
  const matches = getRelatedProjects(scopeOpps, selectedOpp);
  $("relatedProjectList").innerHTML = matches.length
    ? matches.map((match) => `
      <button class="related-project-card" data-case-id="${match.id}">
        <div>
          <strong>${escapeHtml(match.name)}</strong>
          <p>${escapeHtml(match.reason)}</p>
        </div>
        <div class="related-project-meta">
          <span class="badge">${escapeHtml(match.industry)}</span>
          <span class="badge">${match.amount}万</span>
          <span class="badge ${match.score >= 80 ? "good" : match.score >= 55 ? "warn" : ""}">匹配${match.score}</span>
        </div>
      </button>
    `).join("")
    : `<div class="empty-state"><strong>暂无相关项目</strong><p>当商机记忆中出现行业、预算、招投标、POC 或系统关键词后，会在这里召回相似项目。</p></div>`;
}

function getRelatedProjects(scopeOpps, selectedOpp) {
  const profileText = scopeOpps.map((opp) => [
    opp.name,
    opp.lastDiagnosis,
    ...(opp.signals || []).map((signal) => signal.value),
    ...(opp.history || []).map((item) => item.text)
  ].join(" ")).join(" ");
  const avgAmount = Math.round(scopeOpps.reduce((sum, opp) => sum + Number(opp.amount || 0), 0) / Math.max(1, scopeOpps.length));
  const hasTender = /招标|投标|招投标|标书|中标/.test(profileText) || scopeOpps.some((opp) => opp.pathFlags?.tender);
  const hasPoc = /POC|试点|演示|验证/.test(profileText) || scopeOpps.some((opp) => opp.pathFlags?.poc);

  return caseProjectLibrary.map((item) => {
    let score = 20;
    const reasons = [];
    if (profileText.includes("CRM") && item.tags.includes("CRM")) {
      score += 20;
      reasons.push("同样涉及CRM");
    }
    if (profileText.includes("ERP") && item.tags.includes("ERP")) {
      score += 18;
      reasons.push("都涉及ERP/集成");
    }
    if (profileText.includes("CPQ") && item.tags.includes("CPQ")) {
      score += 18;
      reasons.push("都涉及CPQ/报价");
    }
    if (hasTender && item.tags.includes("招投标")) {
      score += 24;
      reasons.push("都有招投标场景");
    }
    if (hasPoc && item.tags.includes("POC")) {
      score += 20;
      reasons.push("都有POC/试点验证");
    }
    if (selectedOpp && item.industry.includes("制造") && selectedOpp.name.includes("制造")) {
      score += 18;
      reasons.push("客户行业相近");
    }
    if (Math.abs(item.amount - avgAmount) <= 40) {
      score += 16;
      reasons.push("预算金额接近");
    }
    return {
      ...item,
      score: Math.min(99, score),
      reason: reasons.length ? reasons.join("，") : item.reason
    };
  }).filter((item) => item.score >= 45).sort((a, b) => b.score - a.score).slice(0, 4);
}

function showRelatedProjectDetail(caseId) {
  const item = caseProjectLibrary.find((project) => project.id === caseId);
  if (!item) return;
  $("relatedProjectDetail").innerHTML = `
    <h2>${escapeHtml(item.name)}</h2>
    <div class="related-project-detail-meta">
      <span class="badge">${escapeHtml(item.industry)}</span>
      <span class="badge">${item.amount}万</span>
      <span class="badge">${escapeHtml(item.status)}</span>
      ${item.tags.map((tag) => `<span class="badge">${escapeHtml(tag)}</span>`).join("")}
    </div>
    <section class="detail-block">
      <h3>当时的招投标/推进记忆</h3>
      <p>${escapeHtml(item.tenderMemory)}</p>
    </section>
    <section class="detail-block">
      <h3>关键经验</h3>
      <ul>${item.keyLessons.map((lesson) => `<li>${escapeHtml(lesson)}</li>`).join("")}</ul>
    </section>
    <section class="detail-block">
      <h3>附件</h3>
      <div class="attachment-list">${item.attachments.map((file) => `<button type="button" class="attachment-chip">${escapeHtml(file)}</button>`).join("")}</div>
    </section>
  `;
  $("relatedProjectDialog").showModal();
}

function renderMemoryOpportunityList(selectedId) {
  const totalMemories = state.opportunities.reduce((sum, opp) => sum + (opp.history || []).length, 0);
  const allButton = `
    <button class="memory-opp-card ${selectedId === "all" ? "active" : ""}" data-memory-opp-id="all">
      <strong>全部商机</strong>
      <p>按时间查看全部记忆</p>
      <div><span class="badge">${totalMemories}条记忆</span></div>
    </button>
  `;
  const oppButtons = state.opportunities.map((opp) => `
    <button class="memory-opp-card ${selectedId === opp.id ? "active" : ""}" data-memory-opp-id="${opp.id}">
      <strong>${escapeHtml(opp.name)}</strong>
      <p>${escapeHtml(opp.lastDiagnosis || "暂无诊断")}</p>
      <div class="opp-meta">
        <span class="badge">${(opp.history || []).length}条</span>
        <span class="badge ${opp.riskLevel === "高" ? "bad" : opp.riskLevel === "中" ? "warn" : "good"}">风险${opp.riskLevel}</span>
        <span class="badge">赢率${opp.winRate}%</span>
      </div>
    </button>
  `).join("");
  $("memoryOpportunityList").innerHTML = allButton + oppButtons;
}

function renderResources() {
  const opp = activeOpp();
  const latest = opp.requests[0];
  $("materialBox").textContent = latest ? latest.material : "点击左侧资源按钮后，系统会基于商机状态自动生成申请理由。";
  $("requestTable").innerHTML = opp.requests.length
    ? opp.requests.map((r) => `<tr><td>${r.type}</td><td>${r.owner}</td><td><span class="badge">${r.priority}</span></td><td>${r.sla}</td><td><span class="badge warn">${r.status}</span></td></tr>`).join("")
    : `<tr><td colspan="5">暂无资源申请。</td></tr>`;
}

function renderManager() {
  const totalAmount = state.opportunities.reduce((sum, opp) => sum + Number(opp.amount || 0) * (opp.winRate || 0) / 100, 0);
  const avgWin = Math.round(state.opportunities.reduce((sum, opp) => sum + opp.winRate, 0) / state.opportunities.length);
  const highRisk = state.opportunities.filter((opp) => opp.riskLevel === "高").length;
  const requests = state.opportunities.reduce((sum, opp) => sum + opp.requests.length, 0);
  $("forecastAmount").textContent = `${Math.round(totalAmount)}万`;
  $("avgWinRate").textContent = `${avgWin}%`;
  $("highRiskCount").textContent = highRisk;
  $("requestCount").textContent = requests;
  $("managerInsight").textContent = `当前系统可信预测约 ${Math.round(totalAmount)} 万，高风险商机 ${highRisk} 个。建议优先介入风险高且金额大的机会，并检查资源 SLA 是否阻塞签约。`;
  $("managerTable").innerHTML = state.opportunities.map((opp) => `<tr><td>${escapeHtml(opp.name)}</td><td>${opp.amount}万</td><td>${opp.winRate}%</td><td>${opp.rightsLevel}</td><td><span class="badge ${opp.riskLevel === "高" ? "bad" : opp.riskLevel === "中" ? "warn" : "good"}">${opp.riskLevel}</span></td></tr>`).join("");
  const items = state.opportunities
    .filter((opp) => opp.riskLevel === "高" || ["L5", "L6"].includes(opp.rightsLevel))
    .map((opp) => `${opp.name}：${opp.riskLevel === "高" ? "风险较高，需要主管介入" : "已接近签约冲刺，建议加速资源响应"}`);
  $("interventionList").innerHTML = listItems(items, "介入建议", "risk-mid");
}

function renderSamples() {
  $("sampleList").innerHTML = sampleLogs.map((sample, index) => `<div class="sample-item"><strong>样例 ${index + 1}</strong><p>${escapeHtml(sample)}</p><button class="ghost-btn use-sample" data-index="${index}" value="cancel">放入输入框</button></div>`).join("");
}

function listItems(items, label, cls = "") {
  return (items && items.length ? items : ["暂无建议，先录入一条销售现场信息。"])
    .map((item) => `<div class="list-item ${cls}"><span>${label}</span><strong>${escapeHtml(item)}</strong></div>`)
    .join("");
}

function liveHighlight(text) {
  if (!text.trim()) return "输入内容后，这里会实时标出预算、竞品、决策人、风险和系统关键词。";
  let html = escapeHtml(text);
  const rules = [
    [/(\d+(?:\.\d+)?\s*(?:万|万元))/g, "budget"],
    [/(月底|下周|本月|季度|\d{1,2}\s*月|9月底|8月)/g, "time"],
    [/([A-ZＡ-Ｚ]\s*厂商|竞品|竞争对手|友商)/g, "competitor"],
    [/(CIO|CEO|CFO|老板|最终拍板人|决策人)/g, "decision"],
    [/(贵|压价|降价|折扣|定制|上线|工期|验收|付款|回款)/g, "risk"],
    [/(CRM|CPQ|ROI|ERP|LTC)/g, "term"]
  ];
  rules.forEach(([regex, cls]) => {
    html = html.replace(regex, `<button class="token ${cls} signal-token" data-signal="${cls}" data-value="$1">$1</button>`);
  });
  return html;
}

function linkTerms(text) {
  let html = escapeHtml(text);
  Object.keys(termKnowledge).forEach((term) => {
    html = html.replace(new RegExp(term, "g"), `<button class="term-link" data-term="${term}">${term}</button>`);
  });
  return html;
}

function showTermPopover(term, target) {
  const data = termKnowledge[term];
  if (!data) return;
  const histories = [];
  state.opportunities.forEach((opp) => {
    opp.history.forEach((item) => {
      if (item.text.includes(term)) histories.push({ oppName: opp.name, time: item.time, text: item.text, winRate: item.after.winRate, riskLevel: item.after.riskLevel });
    });
  });
  const historyRows = histories.length
    ? histories.slice(0, 4).map((h) => `<div class="related-row"><strong>${escapeHtml(h.oppName)}</strong><span>${h.time}｜赢率 ${h.winRate}%｜风险 ${h.riskLevel}</span><p>${escapeHtml(h.text.slice(0, 86))}${h.text.length > 86 ? "..." : ""}</p></div>`).join("")
    : `<div class="related-empty">当前暂无匹配历史。</div>`;
  const projectRows = (relatedProjectLibrary[term] || []).map((p) => `<div class="related-row"><strong>${p.name}</strong><span>${p.status}｜${p.amount}</span><p>${p.note}</p></div>`).join("");
  const popover = $("termPopover");
  popover.innerHTML = `<h3>${data.title}</h3><p>${data.body}</p><div class="related-section"><h4>当前/历史输入</h4>${historyRows}</div><div class="related-section"><h4>相似项目</h4>${projectRows || `<div class="related-empty">暂无相似项目。</div>`}</div>`;
  const rect = target.getBoundingClientRect();
  popover.hidden = false;
  popover.style.left = `${Math.max(16, Math.min(rect.left, window.innerWidth - 450))}px`;
  popover.style.top = `${Math.max(16, Math.min(rect.bottom + 8, window.innerHeight - popover.offsetHeight - 16))}px`;
}

function showSignalPopover(signalType, value, target) {
  const data = signalKnowledge[signalType];
  if (!data) return;
  const opp = activeOpp();
  const popover = $("termPopover");
  const currentMeaning = buildSignalMeaning(signalType, value, opp);
  popover.innerHTML = `
    <h3>${escapeHtml(data.title)}：${escapeHtml(value)}</h3>
    <p>${escapeHtml(data.body)}</p>
    <div class="related-section">
      <h4>对当前商机的含义</h4>
      <div class="related-row">
        <strong>${escapeHtml(opp.name)}</strong>
        <span>赢率 ${opp.winRate}%｜风险 ${opp.riskLevel}｜权益 ${opp.rightsLevel}</span>
        <p>${escapeHtml(currentMeaning)}</p>
      </div>
    </div>
    <div class="related-section">
      <h4>建议动作</h4>
      <div class="related-row"><p>${escapeHtml(data.action)}</p></div>
    </div>
  `;
  const rect = target.getBoundingClientRect();
  popover.hidden = false;
  popover.style.left = `${Math.max(16, Math.min(rect.left, window.innerWidth - 450))}px`;
  popover.style.top = `${Math.max(16, Math.min(rect.bottom + 8, window.innerHeight - popover.offsetHeight - 16))}px`;
}

function buildSignalMeaning(signalType, value, opp) {
  const map = {
    budget: `系统会把“${value}”视为预算/金额线索，但仍需确认预算是否已批，否则赢率不应过度上调。`,
    time: `系统会把“${value}”视为采购时间线索，用于判断紧迫度、资源 SLA 和签约预测。`,
    competitor: `系统会把“${value}”视为竞争信号，竞争风险会上升，任务会更偏向竞品对比和价值证明。`,
    decision: `系统会把“${value}”视为决策链线索，若能确认其角色，可提升商机可信度和资源申请优先级。`,
    risk: `系统会把“${value}”视为风险或约束信号，可能触发商务、交付、财务或法务评审建议。`,
    term: `系统会把“${value}”视为知识关键词，可关联历史项目、当前商机记忆和资料库。`
  };
  return map[signalType] || `该信号会进入 ${opp.name} 的商机画像。`;
}

function hideTermPopover() {
  $("termPopover").hidden = true;
}

function switchView(view) {
  state.activeView = view;
  document.querySelectorAll(".view").forEach((el) => el.classList.toggle("active", el.id === `${view}View`));
  document.querySelectorAll(".nav-item").forEach((el) => el.classList.toggle("active", el.dataset.view === view));
  const titles = {
    workspace: ["AI 销售作战台", "像和销售助理对话一样输入客户现场，系统实时判断商机状态、风险和下一步打法。"],
    memory: ["商机记忆与画像", "沉淀销售输入、状态变化、关键人和关键词关联信息。"],
    resources: ["资源加速中心", "让销售用真实信息解锁售前、方案、交付、法务、财务和高层支持。"],
    manager: ["管理者 AI 驾驶舱", "用系统预测、风险大单和资源瓶颈辅助经营判断。"]
  };
  $("pageTitle").textContent = titles[view][0];
  $("pageSubtitle").textContent = titles[view][1];
  saveState();
}

function bindEvents() {
  document.querySelectorAll(".nav-item").forEach((btn) => btn.addEventListener("click", () => switchView(btn.dataset.view)));
  $("salesLogInput").addEventListener("input", (event) => {
    $("liveHighlight").innerHTML = liveHighlight(event.target.value);
    $("confirmBtn").disabled = true;
    state.pendingUnderstanding = null;
    renderUnderstanding();
  });
  $("analyzeBtn").addEventListener("click", generateUnderstanding);
  $("confirmBtn").addEventListener("click", confirmUnderstanding);
  $("clearInputBtn").addEventListener("click", () => {
    $("salesLogInput").value = "";
    $("liveHighlight").innerHTML = liveHighlight("");
    state.pendingUnderstanding = null;
    $("confirmBtn").disabled = true;
    renderUnderstanding();
  });
  $("seedBtn").addEventListener("click", () => {
    const value = sampleLogs[Math.floor(Math.random() * sampleLogs.length)];
    $("salesLogInput").value = value;
    $("liveHighlight").innerHTML = liveHighlight(value);
    switchView("workspace");
  });
  $("resetBtn").addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    state = structuredClone(defaultState);
    $("salesLogInput").value = "";
    $("liveHighlight").innerHTML = liveHighlight("");
    renderAll();
    switchView("workspace");
  });
  $("newOpportunityBtn").addEventListener("click", () => $("newOppDialog").showModal());
  $("createOppBtn").addEventListener("click", (event) => {
    event.preventDefault();
    const id = `opp-${Date.now()}`;
    state.opportunities.push({
      ...structuredClone(defaultOpportunity),
      id,
      name: $("newOppName").value.trim() || "新商机",
      amount: Number($("newOppAmount").value || 80),
      winRate: 30,
      rightsLevel: "L1",
      riskLevel: "低",
      completeness: 15,
      history: [],
      contacts: [],
      signals: [],
      requests: []
    });
    state.activeOpportunityId = id;
    $("newOppDialog").close();
    $("newOppName").value = "";
    renderAll();
  });
  $("openDocsBtn").addEventListener("click", () => $("samplesDialog").showModal());
  document.addEventListener("click", (event) => {
    const card = event.target.closest(".opp-card");
    if (card) {
      state.activeOpportunityId = card.dataset.oppId;
      state.pendingUnderstanding = null;
      $("confirmBtn").disabled = true;
      renderAll();
      return;
    }
    const memoryCard = event.target.closest(".memory-opp-card");
    if (memoryCard) {
      state.activeMemoryOpportunityId = memoryCard.dataset.memoryOppId || "all";
      renderMemory();
      saveState();
      return;
    }
    const relatedProjectCard = event.target.closest(".related-project-card");
    if (relatedProjectCard) {
      showRelatedProjectDetail(relatedProjectCard.dataset.caseId);
      return;
    }
    const sampleButton = event.target.closest(".use-sample");
    if (sampleButton) {
      const value = sampleLogs[Number(sampleButton.dataset.index)];
      $("salesLogInput").value = value;
      $("liveHighlight").innerHTML = liveHighlight(value);
      $("samplesDialog").close();
      switchView("workspace");
      return;
    }
    const signalButton = event.target.closest(".signal-token");
    if (signalButton) {
      event.preventDefault();
      showSignalPopover(signalButton.dataset.signal, signalButton.dataset.value || signalButton.textContent, signalButton);
      return;
    }
    const termButton = event.target.closest(".term-link");
    if (termButton) {
      event.preventDefault();
      showTermPopover(termButton.dataset.term, termButton);
      return;
    }
    if (!event.target.closest("#termPopover")) hideTermPopover();
  });
  document.querySelectorAll(".resource-btn").forEach((btn) => btn.addEventListener("click", () => requestResource(btn.dataset.resource)));
  window.addEventListener("scroll", hideTermPopover, true);
}

bindEvents();
renderAll();
switchView(state.activeView || "workspace");
