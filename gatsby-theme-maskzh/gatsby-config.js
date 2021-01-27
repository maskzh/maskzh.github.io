module.exports = (options) => {
  const { contentPath } = options;
  return {
    siteMetadata: {
      title: `Gatsby Maskzh Theme`,
      description: `A Gatsby Theme by maskzh`,
      author: `maskzh`,
      siteUrl: ``,
    },
    plugins: [
      `gatsby-plugin-dark-mode`,
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
          display: `minimal-ui`,
          icon: require.resolve(`./logo.png`), // This path is relative to the root of the site.
        },
      },
      {
        resolve: `gatsby-plugin-feed`,
        options: {
          query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
          feeds: [
            {
              serialize: ({ query: { site, allMarkdownRemark } }) => {
                return allMarkdownRemark.edges.map((edge) => {
                  return Object.assign({}, edge.node.frontmatter, {
                    description: edge.node.excerpt,
                    date: edge.node.frontmatter.date,
                    url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                    guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                    custom_elements: [{ 'content:encoded': edge.node.html }],
                  });
                });
              },
              query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___created] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        created
                      }
                    }
                  }
                }
              }
            `,
              output: '/rss.xml',
            },
          ],
        },
      },
      // this (optional) plugin enables Progressive Web App + Offline functionality
      // To learn more, visit: https://gatsby.dev/offline
      `gatsby-plugin-offline`,
    ],
  };
};
