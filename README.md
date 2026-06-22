# DesignForge / 设界

把"看一个好网页 → 说清它好在哪 → 复刻一个同款 / 融合几个方向 → 升级一份 HTML"这条重复劳动，做成一个**可被智能体加载的技能包**（Claude Code / Codex / OpenClaw 等通用）。也附带一个独立本地工具（命令行 + 本地网页界面，自带密钥）。

A skill package (loadable by agents like Claude Code / Codex / OpenClaw) that turns "look at a good page → explain why it works → recreate a same-style page → fuse directions → upgrade an HTML" into one repeatable tool. Ships with a standalone local app (CLI + local web UI, bring-your-own-key) too.

---

## 为什么做这个 / Why this exists

我在一家大厂运营岗实习。日常里有几类活儿反复出现，又零散又费时间：

- 老板临时点名一个对标网站，会前要快速拆出"它的视觉为什么好"，不能只甩几张截图。
- 要把数据 / 案例 / 复盘做成能直接发出去的 HTML，还得好看、风格统一。
- 想让新页面"贴近某个品牌的设计语言"，但手上只有一个网址，没有设计规范。
- 评审时常出现"A 的布局好、B 的配色好"，老板还想"多看几个版本再挑"。

需求多变是常态。与其每次从零手搓，不如把这套动作沉淀成一个工具，一次解决。这个项目就是这么来的——目标是**实用**，不是炫技。

I'm an operations intern at a big-tech company. A few tasks kept recurring and eating time: fast, defensible reads of reference pages before reviews; lots of send-ready HTML reports/cases; aligning new work to a brand's design language from just a URL; and producing several fused directions for a manager to pick from. Requirements shift constantly, so I packaged the repeated steps into one tool.

---

## 它能做什么 / What it does

1. **设计报告 / Design report** — 用真实无头浏览器抓全页截图（桌面 1440 / 移动 390）、配色、字体、栅格、间距、各区块布局，产出双语结构化报告（中文在上）+ 评分。
2. **同款提示词 / Same-style prompt** — 把视觉语言编码成一段可贴进任意模型的提示词。最可复用的产物。
3. **同款页面 / Same-style page** — 真正生成一个同款风格的原创页面（Next.js 工程或单文件 HTML），并做 2 轮"截图对比 → 修差距"的自我迭代。
4. **按权重融合 / Weighted fusion** — 给两个或多个参考设比重，融合成一套新的、协调的视觉，再出报告 + 提示词 + 页面。
5. **HTML 模式 / HTML mode** — 对链接或上传的 HTML 文件做分析、重做、升级；支持多文件对比与融合。

> 原则：**先出报告，再决定要不要建页面**；做的是**同款风格**，不是 1:1 复制。还原度取决于模型质量和网络稳定性——这点不藏着。

---

## 两种用法 / Two ways to use

**A. 作为智能体技能 / As an agent skill**
把本仓库作为技能加载（Claude Code / Codex / OpenClaw 等）。智能体读 `SKILL.md`，按需加载 `references/` 里的拆解、提示词、融合、HTML、验收规则，并参考 `scenarios/` 里的真实打法。

**B. 作为本地工具 / As a local app**
不跑智能体也能用。进入 `app/`，自带命令行 + 本地网页界面，自带密钥：
```bash
cd app
npm install
npx playwright install chromium
npm run dev            # 打开本地网页界面 / open the local web UI
```
详见 `app/README.md`。免安装的 Windows 离线整包（约 339MB）放在 Releases 里。

---

## 仓库结构 / Layout
```
SKILL.md            技能入口（4 类产物、4 种模式、6 条原则、工作流）
references/         需要时加载的细则（抽取 / 提示词 / 融合 / HTML / 验收）
scenarios/          5 条真实工作打法（竞品 demo / HTML 报告 / 品牌对齐 / 融合 / 评审）
app/                独立本地工具（CLI + 本地网页界面，BYOK）
```

---

## 技术要点 / Technical notes
- **真实浏览器抽取**：Playwright 无头浏览器跑全页滚动、抓真实 computed 值（hex / px / 字体名 / 栅格列数 / 间距）和资源，而不是猜。
- **自我迭代**：生成后渲染自己的产物、截图、和原图比对、修最大的视觉差距，默认 2 轮。
- **容错**：BYOK 客户端处理 max_tokens 自动减半、JSON 修复、地域限制等错误的友好提示；支持视觉模型。
- **自包含产物**：生成的 React 只依赖 React（图标用内联 SVG/emoji），第三方依赖会自动写进工程。

## 诚实的边界 / Honest limitations
- 不追求、也做不到 1:1 像素级还原；它给的是**同款风格**和**可复用提示词**。
- 复杂动效、受登录 / 地域 / 反爬限制的页面，抽取会打折。
- 生成质量随所用模型变化。

---

设计语言相关产物均为**风格参考**，请勿用于复制他人品牌、商标或受版权保护的内容。
DesignForge outputs are **style references** — not for reproducing anyone's brand, trademarks, or copyrighted content.
