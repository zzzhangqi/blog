---
title: Mysql定时备份
description:  Mysql 定时备份数据
keywords:
  - Mysql定时备份
  - 数据库定时备份
---

## 1.配置备份计划

### 1.1 创建备份目录

```shell
mkdir -p /var/lib/mysql-backup/
```

### 1.2 编写脚本

```shell
vim /var/lib/mysql-backup/mysql-backup.sh

#!/bin/bash
DATE=`date +%Y%m%d%H%M`                 #every minute
DB_USER=root                            #database username
DB_PASS="xxx"                           #database password
DB_HOST="xxx"                           #database host
DB_PORT=3306                            #database port
BACKUP=/var/lib/mysql-backup            #backup path

#backup command

/usr/bin/mysqldump -u$DB_USER -p$DB_PASS -h$DB_HOST -P$DB_PORT \
--opt --default-character-set=utf8 --hex-blob \
--all-databases \
--skip-triggers --skip-lock-tables |gzip > ${BACKUP}\/test_${DATE}.sql.gz

#just backup the latest 30 days 

find ${BACKUP} -name "test_*.sql.gz" -type f -mtime +30 -exec rm {} \; > /dev/null 2>&1
```

### 1.3 赋予执行权限
```shell
chmod +x /var/lib/mysql-backup/mysql-backup.sh
```

### 1.3 配置计划任务

```shell
crontab -e
0 */1 * * * /var/lib/mysql-backup/mysql-backup.sh
```
