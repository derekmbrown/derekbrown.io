---
title: 'Custom Shortcuts In VS Code'
pubDate: 11-20-2024
tags: ['note', 'vscode']
---

A list of my custom shortcuts in VS Code I use everyday.

```json
[
  {
    "key": "shift+cmd+a",
    "command": "extension.multiCommand.execute",
    "args": {
      "sequence": [
        "workbench.scm.focus",
        "list.focusFirst",
        "list.select"
      ]
    },
    "when": "editorTextFocus"
  },
  {
    "key": "ctrl+tab",
    "command": "workbench.action.nextEditor"
  },
  {
    "key": "ctrl+shift+tab",
    "command": "workbench.action.previousEditor"
  },
]
```