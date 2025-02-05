---
title: 'Turn On Show All Files in MacOS Finder'
pubDate: 02-04-2025
tags: ['note', 'macos', 'terminal']
---

Here's a command that will permanently show all files in Finder on MacOS.

```bash
defaults write com.apple.Finder AppleShowAllFiles true && killall Finder
```