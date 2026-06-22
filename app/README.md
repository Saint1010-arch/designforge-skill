# DesignForge 本地应用 / Local App (BYOK)

这是 DesignForge 的独立本地工具，给**不通过智能体运行**的用户使用。自带命令行 + 一个本地网页界面，自带密钥（Bring Your Own Key）。能力和技能版一致：分析、做同款、按权重融合、HTML 模式。

This is the standalone local tool for users who don't run an agent. CLI + a local web UI, bring-your-own-key. Same capabilities as the skill: analyze / clone / fuse / HTML mode.

## 安装 / Setup
```bash
npm install
npx playwright install chromium   # 装无头浏览器内核 / install the headless browser
```

填入你的密钥：复制 `.env.example` 为 `.env`，填 `OPENAI_API_KEY`（兼容 OpenAI 协议的服务都可，可设 `SITEFORGE_BASE_URL` / `SITEFORGE_MODEL`）。

Copy `.env.example` to `.env` and set `OPENAI_API_KEY` (any OpenAI-compatible endpoint works via `SITEFORGE_BASE_URL` / `SITEFORGE_MODEL`).

## 网页界面 / Web UI（推荐 / recommended）
```bash
npm run dev
```
默认在 `http://localhost:4571` 打开。界面里可填网址、出提示词、做同款（带自定义需求框）、设融合权重、一键预览/导出。

Opens at `http://localhost:4571`. Enter a URL, generate a prompt, build a same-style page (with a custom-requirements box), set fusion weight, one-click preview/export.

## 命令行 / CLI
```bash
npm run dev -- analyze https://example.com
npm run dev -- clone   https://example.com --instructions "换成我的标题，主色改青色"
npm run dev -- fuse    https://a.com https://b.com --weight 70
```
常用参数 / common flags: `--api-key`、`--base-url`、`--model`、`--out`、`-y`（跳过确认）。

## 离线整包 / Offline bundle
免安装的 Windows 离线整包（约 339MB，含 Node、浏览器内核、依赖）放在原项目的 GitHub Releases，解压后填 API 即用，适合不想装环境的用户。

The no-install Windows offline bundle (~339MB, includes Node + browser + deps) lives in the **original project's GitHub Releases** — unzip, enter your API key, and run. Best for users who don't want to set up a toolchain.

## 说明 / Notes
- 做的是**同款风格**，不是 1:1 复制；先出报告，再按需建页面。
- 还原度取决于所用模型质量和网络稳定性。
- 生成的页面默认会做 2 轮"截图对比 → 修差距"的自我迭代。
