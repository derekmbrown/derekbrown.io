---
title: 'Turn On Show All Files in Finder on Mac'
pubDate: 02-04-2025
tags: ['note', 'macos', 'terminal']
---

Here's a command that will turn on show all files in Finder on Mac.

```bash
defaults write com.apple.Finder AppleShowAllFiles true && killall Finder
```