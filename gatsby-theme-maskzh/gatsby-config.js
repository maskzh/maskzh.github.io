module.exports = (options) => {
  const { contentPath } = options;
  return {
    siteMetadata: {
      title: `Gatsby Maskzh Theme`,
      description: `A Gatsby Theme`,
      author: `maskzh`,
    },
    plugins: [
      `gatsby-transformer-sharp`,
      `gatsby-plugin-react-helmet`,
      `gatsby-plugin-postcss`,
      `gatsby-plugin-sharp`,
      {
        resolve: `gatsby-transformer-remark`,
        options: {
          plugins: [
            {
              resolve: `gatsby-remark-prismjs`,
              options: {
                noInlineHighlight: true,
              },
            },
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 800,
                ignoreFileExtensions: [],
              },
            },
          ],
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: contentPath || `articles`,
          path: contentPath || path.resolve(__dirname + `/articles/`),
        },
      },
      {
        resolve: `gatsby-plugin-react-i18next`,
        options: {
          path: `${__dirname}/locales`,
          languages: [`en`, `zh`],
          redirect: false,
          i18nextOptions: {
            keySeparator: false,
            nsSeparator: false,
          },
        },
      },
      {
        resolve: `gatsby-plugin-manifest`,
        options: {
          name: `gatsby-theme-maskzh`,
          short_name: `maskzh`,
          start_url: `/`,
          background_color: `#663399`,
          theme_color: `#663399`,
          display: `minimal-ui`,
          icon: require.resolve(`./logo.png`), // This path is relative to the root of the site.
        },
      },
      // this (optional) plugin enables Progressive Web App + Offline functionality
      // To learn more, visit: https://gatsby.dev/offline
      // `gatsby-plugin-offline`,
    ],
  };
};
