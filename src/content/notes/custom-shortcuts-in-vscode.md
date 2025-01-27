---
title: 'Custom Shortcuts In VSCode'
pubDate: 11-20-2024
tags: ['note', 'vscode']
---

A running list of my custom shortcuts I use everyday. 

To access this json file, open the Command Palette (`CMD+SHIFT+P`) and search for "Open Keyboard Shortcuts". A `keybindings.json` file should open.

```json:keybindings.json
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