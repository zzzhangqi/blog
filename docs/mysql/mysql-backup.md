---
title: Mysql备份迁移
keywords:
  - Mysql
  - 数据库备份
---

## 1. 配置备份计划

### 1.1 安装并配置计划任务

```shell
crontab -e
0 3 * * * /var/lib/mysql-backup/mysql-backup.sh

#创建备份目录
mkdir -p /var/lib/mysql-backup/

#编写脚本
vim /var/lib/mysql-backup/mysql-backup.sh

#!/bin/bash
DATE=`date +%Y%m%d%H%M`                 #every minute
DB_USER=root                            #database username
DB_PASS="xxx"                     #database password
BACKUP=/var/lib/mysql-backup            #backup path

#backup command

/usr/bin/mysqldump -u$DB_USER -p$DB_PASS -h127.0.0.1 --all-databases |gzip > ${BACKUP}\/rainbond_${DATE}.sql.gz

#just backup the latest 30 days 

find ${BACKUP} -name "rainbond_*.sql.gz" -type f -mtime +30 -exec rm {} \; > /dev/null 2>&1

#赋予执行权限
chmod +x /var/lib/mysql-backup/mysql-backup.sh
```


