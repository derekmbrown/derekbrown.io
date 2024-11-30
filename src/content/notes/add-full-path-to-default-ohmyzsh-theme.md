---
title: 'Add Full Path To Default Oh My Zsh Theme'
pubDate: 04-17-2024
tags: ['note', 'terminal', 'ohmyzsh']
---

I currently use the default Oh My Zsh theme for my terminal. It's configured by default to only display the current directory. I wanted to instead show the full path. Here's how to change that using vim.

```bash
# 1. Open the themes settings file
vim ~/.oh-my-zsh/themes/robbyrussell.zsh-theme

# 2. Replace %c% with %~%
:s/%c%/%\~%

# 3. Save and quit
:wq
```