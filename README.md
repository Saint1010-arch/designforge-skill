# DesignForge / 设界

一个开源的 **AI Skill**。你不用写代码，只要把一个网址（或一份 HTML 文件）丢给 AI，它就会用浏览器把页面看一遍、抽出真实的设计语言，然后给你想要的东西：一份**设计报告**、一段可复用的**同款提示词**、一个**同款页面**，或把几个参考**按权重融合**成一套新视觉。

An open-source **AI skill**. No coding. Hand your agent a URL (or an HTML file); it reads the page in a real browser, extracts the actual design language, and gives you a **design report**, a reusable **same-style prompt**, a **same-style page**, or a **weighted fusion** of several references.

> 它做的是**同款风格**，不是 1:1 复制；而且**每次先给报告，再决定要不要建页面**。

---

## 演示 / Demo

下面这段视频是 DesignForge 克隆 [klingai.com](https://klingai.com/) 的实录。


https://github.com/user-attachments/assets/d0d1a2ce-21f2-48a0-a313-4d8377ae067b


A recording of DesignForge cloning [klingai.com](https://klingai.com/).

https://github.com/Saint1010-arch/designforge-skill/raw/main/demo/kling-clone-demo.mp4

> 若页面里没有自动出现播放器，点这里下载：[`demo/kling-clone-demo.mp4`](demo/kling-clone-demo.mp4)

---

## 为什么做这个 / Why this exists

我在一家大厂运营岗实习。日常里有几类活儿反复出现，又零散又费时间：

- 老板临时点名一个对标网站，会前要快速拆出"它的视觉为什么好"，不能只甩几张截图。
- 要把数据 / 案例 / 复盘做成能直接发出去的 HTML，还得好看、风格统一。
- 想让新页面"贴近某个品牌的设计语言"，但手上只有一个网址，没有设计规范。
- 评审时常出现"A 的布局好、B 的配色好"，老板还想"多看几个版本再挑"。

需求多变是常态。与其每次从零手搓，不如把这套动作沉淀成一个工具，一次解决。这个项目就是这么来的——目标是**实用**。

I'm an operations intern at a big-tech company. A few tasks kept recurring and eating time: fast, defensible reads of reference pages before reviews; lots of send-ready HTML reports/cases; aligning new work to a brand's design language from just a URL; and producing several fused directions for a manager to pick from. So I packaged the repeated steps into one tool.

---

## 怎么用 / How to use

### 第一步：让你的 AI 装上它
把下面这段话粘给你的 agent（Claude Code / Codex / OpenClaw / Hermes 等）：

```
帮我安装这个 skill：https://github.com/Saint1010-arch/designforge-skill
然后按照skill的工作流开始自我介绍和环境配置。
```

### 第二步：用大白话说你要做什么
装好后随便说一句「用 designforge」，它会先做环境检查 + 自我介绍，然后**问你想做什么**。输入可以是**一个网址，也可以是一个 HTML 文件**（链接 / 上传 / 粘贴都行），四种用法对两种输入通用：

- **读懂设计** → 「读一下 klingai.com 的设计，给我报告。」
- **做同款页面** → 「照这个风格做个同款页面，标题换成我的，主色改青色。」
- **按权重融合** → 「把 A 和 B 融合，A 占 70%，先给融合报告。」
- **处理 HTML 文件** → 「把我这份 HTML 报告升级成更专业的展示页。」

它会**一边做一边主动问下一步**：做完报告问你要不要同款提示词、做完页面问你要不要直接预览/部署成线上链接，而不是丢给你一串命令行让你自己敲。

### 它怎么干（为什么像）
```
看页面    用真实无头浏览器打开网址 / HTML，滚到底，截桌面(1440)和移动(390)全页图
抽取      读真实 computed 值：配色、字体、栅格列数、间距、各区块布局、资源
出报告    结构化设计报告 + 评分 + 可复用要点；并给同款提示词
分块建    把页面拆成区块，逐块构建（默认 Next.js 工程），不是一把梭一个文件
对图改    渲染自己的产物→截图→和原图比→逐块修差距（默认 2 轮）
交付      主动给你「点开即看」的预览，或帮你部署拿到线上链接
```


## 仓库结构 / Layout
```
SKILL.md            技能入口（4 类产物、4 种模式、6 条原则、工作流）
references/         需要时加载的细则（抽取 / 提示词 / 融合 / HTML / 验收）
scenarios/          5 条真实工作打法（竞品 demo / HTML 报告 / 品牌对齐 / 融合 / 评审）
```

---

## 它能给你什么 / What you get
1. **设计报告** — 结构化拆解（配色 / 字体 / 布局 / 动效）+ 评分 + 可复用要点。
2. **同款提示词** — 把视觉语言编码成一段可贴进任意模型的提示词，最可复用。
3. **同款页面** — 真正生成一个同款风格的原创页面，并做截图自我迭代。
4. **按权重融合** — 多个参考按比重揉成一套新的、协调的视觉。
5. **HTML 模式** — 对链接或上传的 HTML 做分析 / 重做 / 升级，支持多文件对比与融合。

## 技术要点 / Technical notes
- **真实浏览器抽取**：无头浏览器跑全页滚动、抓真实 computed 值（hex / px / 字体名 / 栅格列数 / 间距）和资源，而不是猜。
- **报告优先**：先出报告再生成，避免"做完才发现方向不对"的返工。
- **自我迭代**：生成后和原图比对、修差距，默认 2 轮。
- **自包含产物**：生成的 React 只依赖 React（图标用内联 SVG/emoji），第三方依赖会自动写进工程。

## 诚实的边界 / Honest limitations
- 不追求、也做不到 1:1 像素级还原；它给的是**同款风格**和**可复用提示词**。
- 复杂动效、受登录 / 地域 / 反爬限制的页面，抽取会打折。
- 生成质量随所用模型变化。

---

设计语言相关产物均为**风格参考**，请勿用于复制他人品牌、商标或受版权保护的内容。
DesignForge outputs are **style references** — not for reproducing anyone's brand, trademarks, or copyrighted content.
