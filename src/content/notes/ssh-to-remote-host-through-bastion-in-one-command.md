---
title: 'SSH To Remote Host Through Bastion In One Command'
pubDate: 04-27-2024
tags: ['note', 'ssh']
---

Neat command I found to SSH into a remote host through a bastion in one command. This is possible using ProxyJump or the `-J` flag.

```bash
ssh -J <bastion-ip> <remote-ip>
```

If the hosts differ between users and ports, you can specify them like this.

```bash
ssh -J user@<bastion-ip:port> user@<remote-ip:port>
```