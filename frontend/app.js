const $ = (id) => document.getElementById(id);
const state = { history: JSON.parse(localStorage.getItem('ltc-history') || '[]') };

const riskRules = [
  { keys: ['预算', '资金', '价格', '贵'], level: 'warn', text: '预算或价格存在不确定性，建议准备 ROI 测算和分层报价。' },
  { keys: ['竞争', '友商', '竞品'], level: 'danger', text: '存在竞争对手介入，需要补充差异化价值证明和客户证言。' },
  { keys: ['决策人', '老板', '采购', '法务'], level: 'warn', text: '关键决策链需要澄清，建议绘制客户组织与影响力地图。' },
  { keys: ['交付', '实施', '延期', '风险'], level: 'danger', text: '交付风险可能影响签约，建议提前拉通交付与解决方案资源。' },
  { keys: ['资源', '专家', '方案', '技术'], level: 'ok', text: '客户需要专业资源支持，可发起资源加速申请。' }
];

const stageTasks = {
  '线索识别': ['确认客户业务痛点与采购动机', '完成线索分级并判断是否进入商机池'],
  '需求确认': ['组织需求澄清会，输出痛点-能力匹配表', '识别决策人、影响人和反对者'],
  '方案验证': ['安排方案演示或 PoC 验证', '沉淀客户成功案例与差异化价值'],
  '商务谈判': ['准备报价策略、让步边界和审批材料', '锁定合同条款、付款与交付计划'],
  '合同签署': ['推动法务与采购闭环', '制定交付启动计划和客户成功交接清单']
};

function analyze(input) {
  let score = 45 + Number(input.winRate) * 0.35 + Math.min(Number(input.amount) / 20, 15);
  const risks = riskRules.filter((rule) => rule.keys.some((key) => input.notes.includes(key)));
  score -= risks.filter((risk) => risk.level === 'danger').length * 14;
  score -= risks.filter((risk) => risk.level === 'warn').length * 7;
  if (input.stage === '合同签署') score += 12;
  if (input.stage === '线索识别') score -= 8;
  score = Math.max(5, Math.min(98, Math.round(score)));

  const tasks = [...(stageTasks[input.stage] || [])];
  if (input.winRate < 40) tasks.push('安排主管复盘低赢率原因，并明确一项可验证推进动作');
  if (risks.some((risk) => risk.level === 'danger')) tasks.push('升级红色风险，约定 24 小时内的责任人与解决动作');
  if (input.nextStep) tasks.push(`跟进销售承诺动作：${input.nextStep}`);

  const resources = [];
  if (input.notes.includes('技术') || input.notes.includes('方案') || input.notes.includes('专家')) resources.push('解决方案专家支持');
  if (input.notes.includes('交付') || input.notes.includes('实施')) resources.push('交付经理预评估');
  if (input.notes.includes('价格') || input.notes.includes('预算') || input.notes.includes('报价')) resources.push('商务报价与 ROI 测算支持');
  if (Number(input.amount) >= 200) resources.push('大客户高优资源通道');
  if (!resources.length) resources.push('标准销售作战包');

  return { score, risks, tasks, resources };
}

function renderResult(input, result) {
  $('score').textContent = result.score;
  $('heroStatus').textContent = result.score >= 75 ? '重点推进' : result.score >= 55 ? '稳健跟进' : '需要加速';
  $('scoreReason').textContent = `${input.customer} 处于「${input.stage}」阶段，当前赢率 ${input.winRate}%，预计金额 ${input.amount} 万元。系统综合阶段、金额、风险关键词与资源诉求生成评分。`;
  $('riskCount').textContent = result.risks.length;
  $('taskCount').textContent = result.tasks.length;
  $('resourceCount').textContent = result.resources.length;

  $('risks').classList.remove('empty');
  $('risks').innerHTML = result.risks.length ? result.risks.map((risk) => `<li class="${risk.level}">${risk.text}</li>`).join('') : '<li class="ok">暂未发现明显风险，建议保持节奏并持续更新客户反馈。</li>';
  $('tasks').classList.remove('empty');
  $('tasks').innerHTML = result.tasks.map((task) => `<li>${task}</li>`).join('');
  $('resourcePlan').textContent = `资源申请摘要\n客户：${input.customer}\n商机阶段：${input.stage}\n申请资源：${result.resources.join('、')}\n申请理由：围绕当前风险与下一步动作，缩短方案验证、商务推进和交付评估周期。`;
}

function renderDashboard() {
  const total = state.history.reduce((sum, item) => sum + Number(item.amount), 0);
  const avg = state.history.length ? Math.round(state.history.reduce((sum, item) => sum + Number(item.winRate), 0) / state.history.length) : 0;
  $('pipelineAmount').textContent = total;
  $('avgWinRate').textContent = `${avg}%`;
  $('highRiskDeals').textContent = state.history.filter((item) => item.result.score < 55).length;
  $('resourceNeeds').textContent = state.history.reduce((sum, item) => sum + item.result.resources.length, 0);
  $('history').innerHTML = state.history.map((item) => `<li><strong>${item.customer}</strong>｜${item.stage}｜${item.amount} 万｜评分 ${item.result.score}<br><small>${item.createdAt}</small></li>`).join('');
}

$('opportunity-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const input = {
    customer: $('customer').value.trim(),
    stage: $('stage').value,
    amount: Number($('amount').value || 0),
    winRate: Number($('winRate').value || 0),
    notes: $('notes').value,
    nextStep: $('nextStep').value.trim()
  };
  const result = analyze(input);
  renderResult(input, result);
  state.history.unshift({ ...input, result, createdAt: new Date().toLocaleString('zh-CN') });
  state.history = state.history.slice(0, 10);
  localStorage.setItem('ltc-history', JSON.stringify(state.history));
  renderDashboard();
});

$('clearHistory').addEventListener('click', () => {
  state.history = [];
  localStorage.removeItem('ltc-history');
  renderDashboard();
});

renderDashboard();
