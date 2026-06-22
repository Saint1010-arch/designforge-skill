# 场景 04｜两个方向都不错，按权重融合出新方案

## 什么时候用 / When to use
评审时常出现"A 的布局好、B 的配色好"，或者老板想看"几个方向揉在一起"的样子。与其二选一，不如按比重融合出一个新视觉。

When two references each have something you want, fuse them by weight into one new, coherent look.

## 怎么用 / How to use
- **Fuse 模式**：给两个（或多个）参考。
- 设权重，例如 A 70% / B 30%。
- 工具先给**融合报告**（取了谁的什么、为什么协调），再给融合提示词，最后才按需建页面。

CLI: `designforge fuse https://a.com https://b.com --weight 70`
详见 `references/fusion.md`。

## 可以调什么 / What to tweak
- 权重比例（5–95）。
- 自定义需求：偏向谁的字体 / 谁的动效，换文案等。

## 你会得到 / What you get
- 融合报告 + 融合提示词 + 融合页面（按需）。

> 现实补充：老板想"多看几个版本"时，调权重就能快速产出 2–3 个方向，让他来挑。
