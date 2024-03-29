---
layout: '../../layouts/Note.astro'
title: 'Delete All Git History'
pubDate: 03-29-2024
tags: ['git', 'note']
---

I recently had to delete all the git history in a repository but keep all the files. Here's one way to do it. 

```bash
# 1. Create new (orphan) branch
git checkout --orphan new_branch

# 2. Add all files to (orphan) branch
git add -A

# 3. Commit all files
git commit -am "type a commit message"

# 4. Delete local (default) branch
git branch -D main

# 5. Rename (orphan) branch to (default) branch
git branch -m main

# 6. Push up new (default) branch
git push -f origin main
```