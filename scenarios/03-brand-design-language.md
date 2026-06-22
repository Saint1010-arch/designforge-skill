# 场景 03｜对齐某个品牌的设计语言并产出同款提示词

## 什么时候用 / When to use
要做一个"看起来像我们品牌 / 像某个标杆品牌"的页面，但手上只有一个网址，没有设计规范文档。

You must align new work to a brand's design language, but all you have is a URL — no design system doc.

## 怎么用 / How to use
- **Analyze 模式**对准品牌主页或关键页面。
- 工具抽取真实 token（精确到 hex、px、字体名、栅格列数、间距），归纳成设计语言。
- 重点产出一段**可贴进任意模型的同款提示词**——这是最可复用的产物。

详见 `references/same-style-prompt.md`。

## 可以调什么 / What to tweak
- 提示词颗粒度：是否写死主色、字体、间距、动效。
- 语言/主题：用同语种的新占位文案，不照抄原文案与商标。

## 你会得到 / What you get
- 一份可当"轻量设计规范"用的报告。
- 一段精确的同款提示词，团队里谁都能拿去复用。

> 现实补充：把品牌视觉沉淀成一段提示词，等于给团队一个"对齐器"，比口头描述稳定得多。
