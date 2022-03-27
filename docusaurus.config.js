// @ts-check
const path = require('path')
const beian = '闽ICP备2020017848号-2'
const friendLinks = [
  {
    label: '峰华前端工程师',
    to: 'https://zxuqian.cn/',
  },
]
/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'SmallQ',
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
    //   content: `代码能重写，人不能重来`,
    // },
    metadata: [{ name: 'keywords', content: 'blog, javascript, typescript, python ,node, react, vue, web, 前端, 后端, 愧怍' }],
    hideableSidebar: true,
    navbar: {
      title: 'SmallQ',
      logo: {
        alt: 'SmallQ',
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
          label: '归档',
          to: 'archive',
          position: 'right',
        },
        {
          label: '学习',
          position: 'right',
          items: [
            {
              label: '技术笔记',
              to: 'docs/skill/',
            },
          ],
        },
      ],
    },
    algolia: {
      apiKey: '87223cb5a5ff37c4dbbb616812c65a59',
      appId: '2NBW5YNFON',
      indexName: 'kuizuo',
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '学习',
          items: [
            {
              label: '技术博客',
              to: '/#homepage_blogs',
            },
            {
              label: '技术笔记',
              to: 'docs/skill',
            },
            {
              label: '实战项目',
              to: 'project',
            },
          ],
        },
        {
          title: '社交媒体',
          items: [
            {
              label: '首页',
              to: '/',
            },
            {
              label: '关于我',
              to: '/about',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/kuizuo',
            },
            {
              label: '掘金',
              href: 'https://juejin.cn/user/1565318510545901',
            },
          ],
        },
        {
          title: '友情链接',
          items: friendLinks,
        },
      ],
      copyright: `<p>Copyright © ${new Date().getFullYear()} 愧怍 Built with Docusaurus.</p><p><a href="http://beian.miit.gov.cn/" >${beian}</a>`,
      //</p><a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/"><img alt="Creative Commons License" style="border-width:0" src="/img/creative-commons-license-icon.png" /></a><br />本站所有内容遵循 <a rel="license" href="https://creativecommons.org/licenses/by-nc/4.0/deed.zh-Hans" >CC BY-NC 4.0 协议</a>，转载须注明署名和出处，且不可用于商业用途。若与其他同步平台协议冲突，以本网站为准。
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
          // editUrl: "https://github.com/kuizuo/kuizuo.cn/tree/master",
          // remarkPlugins: [require("remark-math")],
          // rehypePlugins: [require("rehype-katex")],
          // showLastUpdateAuthor: true,
          // showLastUpdateTime: true,
        },
        blog: {
          path: 'blog',
          routeBasePath: '/',
          blogSidebarTitle: '近期文章',
          blogSidebarCount: 5,
          postsPerPage: 10,
          // remarkPlugins: [require("remark-math")],
          // rehypePlugins: [require("rehype-katex")],
          feedOptions: {
            type: 'all',
            title: '愧怍',
            copyright: `Copyright © ${new Date().getFullYear()} 愧怍 Built with Docusaurus.<p><a href="http://beian.miit.gov.cn/" class="footer_lin">${beian}</a></p>`,
          },
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
