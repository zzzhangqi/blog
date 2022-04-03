---
title: Gitlab重置管理员密码
description: Gitlab重置管理员密码
keywords:
  - Gitlab
  - 重置管理员密码
---



您可以使用 Rake 任务、Rails 控制台重置用户密码。

## 使用 Rake 任务

在 GitLab 13.9 中 [引入](https://gitlab.com/gitlab-org/gitlab/-/merge_requests/52347) Rake，13.9 以前不可用。

使用以下 Rake 任务重置用户密码：

Rake 任务可以将用户名作为参数。例如，使用 username 为用户重置密码 `root`：

- **用于Omnibus安装**

```
sudo gitlab-rake "gitlab:password:reset[root]"
```

- **从源代码安装**

```
bundle exec rake "gitlab:password:reset[root]"
```

## 使用 Rails 控制台

如果您知道用户名、用户 ID 或电子邮件地址，您可以使用 Rails 控制台重置他们的密码：

### 1.打开 Rails 控制台。

**用于Omnibus安装**

```shell
sudo gitlab-rails console
```

**从源代码安装**

```shell
sudo -u git -H bundle exec rails console -e production
```

### 2.修改管理员root密码

1. 指定用户ID，root用户ID为 `1`

```shell
user = User.find(1)
```


2. 重置密码

```shell
user.password = 'root'
user.password_confirmation = 'root'
```

3. 通知用户管理员更改了他们的密码（可选）

```shell
user.send_only_admin_changed_your_password_notification!
```

4. 保存更改

```shell
user.save!
```

5. 退出控制台，完成

```shell
exit
```



参考：

* https://docs.gitlab.com/ee/security/reset_user_password.html

* https://docs.gitlab.com/ee/administration/operations/rails_console.html
