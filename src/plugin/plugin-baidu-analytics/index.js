module.exports = function (context, options) {
  return {
    name: "docusaurus-baidu-analytics-plugin",
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: "script",
            innerHTML: `
            var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?7113abdf1998cd1df80e9e79ed10a68d";
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);
            })();
          `,
          },
          {
            tagName: "meta",
            attributes: {
              name: "baidu-site-verification",
              content: "code-rqLUw5reVS",
            },
          },
        ],
      };
    },
  };
};
