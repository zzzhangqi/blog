// @ts-check
const path = require('path')
/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Qi Zhang的博客',
  titleDelimiter: '-',
  url: 'https://smallq.cn',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'smallq', // Usually your GitHub org/user name.
  projectName: 'smallq.cn', // Usually your repo name.
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
  themeConfig: {
    // announcementBar: {
    //   id: 'announcementBar-2', // Any value that will identify this message.
    //   content: ``,
    // },
    metadata: [{ name: 'keywords', content: 'Blog, Linux, Shell, Docker, Kubernetes, Prometheus, Rancher, Kubernetnes, 运维, 云原生, Cloud Native' }],
    hideableSidebar: true,
    navbar: {
      title: 'Qi Zhang',
      logo: {
        alt: 'Qi Zhang',
        src: 'img/logo.png',
        srcDark: 'img/logo.png',
      },
      items: [
        {
          label: '标签',
          to: 'tags',
          position: 'right',
        },
        {
          label: '文章',
          to: 'archive',
          position: 'right',
        },
        {
          label: '笔记',
          position: 'right',
          to: 'docs/'
        },
        {
          href: 'https://github.com/zzzhangqi',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository'
        }
      ],
    },
    algolia: {
      apiKey: '87223cb5a5ff37c4dbbb616812c65a59',
      appId: '2NBW5YNFON',
      indexName: 'kuizuo',
    },
    footer: {
      style: 'dark',
      // links: [
      //   {
      //     title: '学习',
      //     items: [
      //       {
      //         label: '技术博客',
      //         to: '/#homepage_blogs',
      //       },
      //     ],
      //   },
      // ],
      copyright: `<p>Copyright © ${new Date().getFullYear()} Qi Zhang Built with Docusaurus.<a href="http://beian.miit.gov.cn/" target="_blank" >京ICP备2020036162号</a> | <a href="https://icp.gov.moe/?keyword=20221221" target="_blank">萌ICP备20221221号</a>`,
    },
    prism: {
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/vsDark'),
      additionalLanguages: ['java', 'php'],
      // defaultLanguage: "javascript",
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    zoomSelector: '.markdown :not(em) > img',
    liveCodeBlock: {
      playgroundPosition: 'top',
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: {
          path: 'blog',
          routeBasePath: '/',
          blogSidebarTitle: '近期文章',
          blogSidebarCount: 5,
          postsPerPage: 10,
          // remarkPlugins: [require("remark-math")],
          // rehypePlugins: [require("rehype-katex")],
        },
        theme: {
          customCss: [require.resolve('./src/css/custom.css')],
        },
        sitemap: {
          changefreq: 'daily',
          priority: 0.5,
        },
        // debug: true,
      }),
    ],
  ],
  themes: ['@docusaurus/theme-live-codeblock'],
  plugins: [
    path.resolve(__dirname, './src/plugin/plugin-baidu-analytics'),
    '@docusaurus/plugin-ideal-image',
    path.resolve(__dirname, './src/plugin/plugin-image-zoom'),
  ],
  onBrokenLinks: 'ignore',
}

module.exports = config
