const path = require('path');

module.exports = {
  siteMetadata: {
    title: "ZYC's Blog",
    description: '郑洋葱的博客',
    author: 'maskzh',
    siteUrl: 'https://zyc.life',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-maskzh',
      options: {
        contentPath: path.join(__dirname, './articles/'),
      },
    },
  ],
};
