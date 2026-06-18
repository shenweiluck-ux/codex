# LTC 2.0 智能销售作战 Demo

这是一个基于本次讨论整理出的 LTC 2.0 原型项目。当前版本仍是前端规则版 demo，但已经按未来可部署、可扩展的方式整理了目录。

## 项目结构

```text
.
├─ frontend/          # 当前可运行的网页 demo
├─ backend/           # 无依赖 Node 后端骨架，后续可接数据库和 AI
├─ database/          # 数据库 schema 草案
├─ docs/              # 产品说明 Word 和测试输入样例
├─ package.json       # 启动与检查脚本
└─ README.md
```

## 本地打开前端

直接打开：

```text
frontend/index.html
```

## 启动本地服务

如果本机有 Node.js，可以在项目根目录执行：

```bash
npm start
```

然后访问：

```text
http://localhost:3000
```

## 当前 demo 能力

- 销售实时输入
- 商机状态评分
- 风险预警
- 动态任务推荐
- 资源申请与自动申请材料
- 输入与变动历史
- 关键词关联信息卡
- 管理者驾驶舱

## 后续演进方向

1. 前端改造为 React/Vue 工程。
2. 后端接入 PostgreSQL/MySQL，替代浏览器 localStorage。
3. 增加用户登录、角色权限和团队数据隔离。
4. 接入大模型，替代当前关键词规则抽取。
5. 部署到阿里云 ECS/轻量应用服务器，通过 Nginx 和域名访问。
