# promise-create-cli

基于 Node.js 的脚手架命令行工具，用于快速初始化 **Vite + React + TypeScript** 风格的前端项目（含本地模板与远程 GitHub 模板）。

## 环境要求

- Node.js **>= 20**（与生成项目模板要求一致时建议 >= 20.19）
- 网络可访问 GitHub（使用远程模板 `react-admin` 时）

## 安装

### 全局安装（推荐）

```bash
npm install -g promise-create-cli
```

安装后，可执行命令为 **`promise`**（见 `package.json` 中 `bin` 字段）。

### 本地开发 / 联调

```bash
cd cli
npm install
npm link
```

## 使用

```bash
promise --help
promise --version
promise create --help
```

### 创建项目

```bash
promise create
```

按提示输入项目名称、是否启用 mock、选择模板（**Basic** 本地 / **react-admin** 远程），并可选择是否自动执行 `npm install`。

### 命令行参数（可选）

| 参数 | 说明 |
|------|------|
| `-n, --name <projectName>` | 项目名称（指定后可跳过名称提问） |
| `-t, --template <template>` | 模板类型（与交互选项一致时生效） |
| `--mock` | 启用 mock 相关选项 |

示例：

```bash
promise create -n my-admin -t react-admin
```

## 模板说明

### Basic（本地 · Vite 模板）

- **定位**：脚手架内置的 **Vite** 前端工程模板（离线、无需访问 GitHub）。
- **来源**：发布包中的 `templates/basic` 目录，通过复制生成项目。
- **适用**：想快速起一个 **Vite** 栈的轻量项目、或在内网 / 无外网环境下使用。

生成后请进入项目目录，按该模板 `package.json` 中的脚本安装依赖并启动（例如 `npm install` / `pnpm install`，以及 `dev` / `start` 等脚本名以模板为准）。

---

### react-admin（远程 · 后台管理模板）

- **定位**：面向 **后台管理类** 场景的 **Vite + React + TypeScript** 项目模板，由 GitHub 仓库维护，脚手架通过 [degit](https://github.com/Rich-Harris/degit) 拉取。
- **仓库**：[promiseLC/cli-template](https://github.com/promiseLC/cli-template)（默认分支 `main`，与 `cli.js` 中 `GITHUB_TEMPLATE_URL` 一致，可自行修改）。

该模板特点包括（详见上游 [README](https://github.com/promiseLC/cli-template/blob/main/README.md)）：

- **Vite + React + TypeScript**，适合 Admin 快速起步  
- 技术栈示例：`react-router-dom`、`antd`、`@tanstack/react-query`、`zustand`、`axios` 等  
- **TailwindCSS v4**、**Sass**、**MSW** 开发期 Mock（可按 `.env` 与文档开启）  
- 工程化：`eslint`、`prettier`、`husky`、`commitlint` 等  

**环境**：上游要求 Node **>= 20.19.0**；生成后推荐使用 **pnpm** 安装依赖（与模板内 `pnpm-lock.yaml` 一致），具体命令见模板 README。

---

生成完成后，进入项目目录并按对应模板的 `package.json` 与 README 安装依赖、启动开发服务器（成功提示中的 `npm run start` 仅为示例，以实际模板脚本为准）。

## 快捷键

- 问答过程中 **Ctrl+C**：会提示取消并退出（退出码 `130`）。
- 其他阶段 **Ctrl+C**：同样会触发取消提示；若在执行 `npm install`，会尝试结束子进程。

## 发布到 npm

1. 确认 `package.json` 中 `name`、`version` 正确，且 `lib/`、`templates/` **未** 被 `.npmignore` 排除。
2. 登录公共 npm（若当前 registry 指向公司 Nexus，需先切换到 `https://registry.npmjs.org/` 或按公司规范配置）：

   ```bash
   npm login
   ```

3. 发布：

   ```bash
   npm publish
   ```

作用域包需使用 `npm publish --access public`。

## 许可证

ISC（见 `package.json`）

## 作者

promise-lc
