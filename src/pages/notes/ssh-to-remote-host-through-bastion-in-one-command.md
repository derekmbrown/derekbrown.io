---
layout: '../../layouts/Note.astro'
title: 'SSH To Remote Host Through Bastion In One Command'
pubDate: 04-27-2024
tags: ['ssh', 'note']
---

Neat command I found to SSH into a remote host through a bastion in one command. This is possible using ProxyJump or the `-J` flag.

```bash
ssh -J <bastion> <remote-host>
```

If the hosts differ between users and ports, you can specify them like this.

```bash
ssh -J user@<bastion:port> <user@remote-host:port>
```