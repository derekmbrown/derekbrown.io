---
layout: '../../layouts/Note.astro'
title: 'Shiki Themes For Markdown Syntax Highlighting'
pubDate: 11-10-2024
tags: ['note', 'astro', 'markdown']
---

[Astro](https://astro.build/), the framework I used to build this site, contains built-in support for [Shiki](https://shiki.style/), a syntax highlighter. 

[Here](https://shiki.style/themes) is a list of themes that work out-of-the-box!

I currently used the `github-dark ` theme for all code blocks on this site.

```typescript
// Example 'github-dark' theme
let num = [1, 2, 3]
num.forEach(function (value) {
  console.log(value)
})
```