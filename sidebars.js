module.exports = {
  docs: [
    {
      type: 'doc',
      id: 'notes', // document ID
      label: '简介', // sidebar label
    },
    {
      type: 'category',
      label: 'Mysql',
      items: [
        'mysql/master-slave',
        'mysql/mysql-backup',
        'mysql/mysql-migratedata'
      ],
    },
    {
      type: 'category',
      label: 'Gitlab',
      items: [
        'gitlab/gitlab-ResetPassword',
      ],
    },
  ]
}
