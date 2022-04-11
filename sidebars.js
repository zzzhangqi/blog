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
      link: {
        type: 'doc',
        id: 'mysql/index'
      },
      items: [
        'mysql/master-slave',
        'mysql/mysql-backup',
        'mysql/mysql-migratedata'
      ],
    },
    {
      type: 'category',
      label: 'Gitlab',
      link: {
        type: 'doc',
        id: 'gitlab/index'
      },
      items: [
        'gitlab/gitlab-ResetPassword',
      ],
    },
    {
      type: 'category',
      label: 'Linux',
      link: {
        type: 'doc',
        id: 'linux/index'
      },
      items: [
        'linux/install-nfs',
      ],
    },
  ]
}
