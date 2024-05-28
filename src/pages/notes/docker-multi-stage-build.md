---
layout: '../../layouts/Note.astro'
title: 'Docker Multi-Stage Build'
pubDate: 02-24-2024
tags: ['note', 'docker', 'snippet']
---

Here's an example how to setup a multi-stage build in Docker.

```docker
# 1. Build Composer stage with 'builder' alias
FROM composer AS builder

# 2. Copy composer files
COPY composer.json /app
COPY composer.lock /app

# 3. Install PHP dependencies
RUN composer install

# 4. Build PHP/Apache stage
FROM php:8.0-apache

# 5. Copy index.php
COPY index.php /var/www/html

# 6. Copy PHP dependencies from Composer stage to PHP/Apache stage
COPY --from=builder /app/vendor /var/www/html/vendor

# 7. Start Apache service
CMD ["/usr/sbin/apachectl", "-D", "FOREGROUND"]
```