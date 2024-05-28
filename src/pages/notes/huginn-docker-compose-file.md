---
layout: '../../layouts/Note.astro'
title: 'Huginn Docker Compose File'
pubDate: 05-15-2024
tags: ['note', 'docker', 'huginn']
---

Here's a Docker Compose file I'm using to setup a [Huginn](https://github.com/huginn/huginn) service to monitor some news feeds.

```yml
services:
  # Url: http://localhost:3000
  # Username: admin
  # Password: password
  web_service:
    container_name: web
    image: ghcr.io/huginn/huginn
    platform: linux/amd64
    environment:
    - CONTAINER_NAME=web
    - IMPORT_DEFAULT_SCENARIO_FOR_ALL_USERS=false
    - DATABASE_HOST=db_service
    - DATABASE_PORT=3306
    - DATABASE_USERNAME=root
    - DATABASE_PASSWORD=password
    - DATABASE_NAME=huginn
    - DATABASE_ENCODING=utf8mb4
    ports:
      - 3000:3000
    networks:
      - huginn_network
    depends_on:
      - db_service

  # Host: localhost
  # Username: admin
  # Password: password
  # Port: 3001
  db_service:
    container_name: db
    image: mysql:8.0
    platform: linux/amd64
    environment:
      - CONTAINER_NAME=db
      - MYSQL_ROOT_PASSWORD=password
    ports:
      - 3001:3306
    volumes:
      - huginn_data:/var/lib/mysql
    networks:
      - huginn_network

volumes:
  huginn_data:

networks:
  huginn_network:
```