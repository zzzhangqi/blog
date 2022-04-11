---
title: 使用MysqlDump迁移MySQL数据
description: 使用MysqlDump迁移MySQL数据
keywords:
  - Mysqldump迁移数据
---

使用mysqldump工具的优点是简单易用、容易上手，缺点是停机时间较长，因此它适用于数据量不大，或者允许停机的时间较长的情况。

:::caution
**lower_case_table_names**参数设置为0后，务必不要再次设置为1，否则可能导致`ERROR 1146 (42S02): Table doesn't exist`错误，对业务造成严重影响。
:::

## 操作步骤

### 使用mysqldump导出自建数据库的数据、存储过程、触发器和函数

:::caution

导出期间请勿进行数据更新，耐心等待导出完成。

:::

在Linux命令行下导出自建数据库的数据，命令如下：

```shell
mysqldump -h 127.0.0.1 -u root -p \
--opt --default-character-set=utf8 --hex-blob <自建数据库名> \
--skip-triggers --skip-lock-tables > /tmp/<自建数据库名>.sql
```

在Linux命令行下导出存储过程、触发器和函数，命令如下：

```shell
mysqldump -h 127.0.0.1 -u root -p \
--opt --default-character-set=utf8 --hex-blob <自建数据库名> \
-R | sed -e 's/DEFINER[ ]*=[ ]*[^*]*\*/\*/' > \
/tmp/<自建数据库名>Trigger.sql
```

:::caution

若数据库中没有使用存储过程、触发器和函数，可跳过此步骤。

:::

### 使用mysqldump导入自建数据库的数据、存储过程、触发器和函数

将导出的文件导入到目标RDS中，命令如下：

```shell
mysql -h {连接地址} -P {端口} -u {账号} -p {数据库名称} < /tmp/{自建数据库名}.sql
mysql -h {连接地址} -P {端口} -u {账号} -p {数据库名称} < /tmp/{自建数据库名}Trigger.sql
```

## 常见问题

- Q：

  ```
  OPERATION need to be executed set by ADMIN
  ```

  报错怎么解决？

  A：可能是SQL脚本里面包括视图，触发器，存储过程等对象的definer问题，或者含有set global类SQL导致。详情请参见[RDS MySQL出现“OPERATION need to be executed set by ADMIN”报错](https://help.aliyun.com/document_detail/41701.htm)。

- Q：

  ```
  Access denied; you need (at least one of) the SUPER privilege(s) for this operation
  ```

  报错怎么解决？

  SQL脚本里面包括SUPER权限的语句，将相关语句删除再执行。
