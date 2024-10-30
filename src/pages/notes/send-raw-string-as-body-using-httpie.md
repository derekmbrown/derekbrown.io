---
layout: '../../layouts/Note.astro'
title: 'Send Raw String As Body Using HTTPie'
pubDate: 10-29-2024
tags: ['note', 'terminal', httpie]
---

Found this cool feature about [HTTPie](https://httpie.io/), `echo` a string and pipe it to HTTPie to send it as the body of a POST request.

```bash
echo '{"name":"Derek"}' | http POST https://example.com
```