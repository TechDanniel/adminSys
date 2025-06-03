# pure-admin中后台管理系统
![image](https://github.com/user-attachments/assets/3d59f194-fc61-468b-ab6f-5c9fa6d7d796)
现代、高效、响应式的中后台管理解决方案

## 🌟 项目简介
pure-admin是一款中后台管理系统，使用vue3、vite、Element-Plus、Typescript、Pinia、Tailwindcss等主流技术开发
[点击预览](https://techdanniel.github.io/adminSys)

## 🚀 核心功能
### 🔐 多模式登录体系
* 账号密码登录
* 手机验证码登录
* 二维码登录
* 自动登录与安全存储

👥 用户管理
* 用户增删改查（CRUD）
* 角色分配与权限组管理
* 用户状态控制（启用/禁用）
* 个人资料编辑与安全设置

🔑 权限控制
* 基于角色的访问控制（RBAC）
* 细粒度权限管理（按钮级）
* 动态路由权限分配

📊 数据可视化
* 实时数据仪表盘
* 多种图表类型（折线图、柱状图、饼图）
* 瀑布流产品展示

## 💻 技术栈
### 前端核心
* Vue 3 - 最新 Composition API
* Vite 4 - 极速开发体验
* TypeScript - 类型支持
* Pinia - 现代化状态管理
* Element Plus - UI组件库
* Tailwind CSS - 实用优先的CSS框架

### 开发工具
* ESLint + Prettier - 代码规范与格式化
* Husky + Lint-Staged - Git提交校验

## 📁 项目结构
```bash
pure-admin/
├── public/               # 公共资源
├── src/
│   ├── api/              # API接口模块
│   ├── assets/           # 静态资源
│   ├── components/       # 全局组件
│   ├── layout/           # 布局组件
│   ├── router/           # 路由配置
│   ├── store/            # Pinia状态管理
│   ├── styles/           # 全局样式
│   ├── types/            # TypeScript类型定义
│   ├── utils/            # 工具函数
│   ├── views/            # 页面组件
│   │   ├── dashboard/    # 仪表盘
│   │   ├── login/        # 登录模块
│   │   ├── system/       # 系统管理
│   │   └── ...           # 其他功能模块
│   ├── App.vue           # 根组件
│   └── main.ts           # 入口文件
├── .env                  # 环境变量配置
├── tsconfig.json         # TypeScript配置
├── vite.config.ts        # Vite配置
└── package.json          # 依赖管理
```

## 🛠️ 安装使用
前置要求
* Node.js 18+
* Pnpm 8+（推荐）或 Npm 9+
### 拉取代码
推荐使用vite脚手架<br>
1.克隆项目仓库
```bash
git clone https://github.com/techdanniel/adminSys.git
```

2.安装依赖
```
cd adminSys

pnpm install
```

3.启动平台
```
pnpm run dev
```

4.项目打包
```
pnpm run build
```

5.代码规范检查
```
pnpm lint
```

## 🤝 贡献指南
热情欢迎任何形式的贡献！无论是提交Bug、新功能建议还是代码贡献。
### 提交问题
发现Bug或有改进建议？请通过 GitHub Issues 提交：
* 清晰描述问题现象
* 提供复现步骤
* 如果是UI问题，请附上截图

### 代码贡献
* Fork 本项目仓库
* 创建功能分支 (git checkout -b feat/your-feature)
* 提交代码变更 (git commit -am 'Add awesome feature')
* 推送分支 (git push origin feat/your-feature)
* 创建 Pull Request

### 开发规范
* 遵循 Vue 3 官方风格指南
* 使用 TypeScript 强类型
* 组件采用 Composition API 编写
* 提交信息遵循 Conventional Commits 规范
