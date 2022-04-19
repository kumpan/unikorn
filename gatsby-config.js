module.exports = {
  siteMetadata: {
    title: `Unikorn`,
    author: `Unikorn`,
    description: `Grow your digital business and presence online`,
    siteUrl: `https://www.unikorn.se/`,
  },
  plugins: [
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-mdx`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-force-trailing-slashes`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/startpage`,
        name: `startpage`,
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: `${__dirname}/content/assets`,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/web-page`,
        name: `web-page`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/web`,
        name: `web`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/web-body`,
        name: `web-body`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/about-page`,
        name: `about-page`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/about`,
        name: `about`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog-page`,
        name: `blog-page`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/footer`,
        name: `footer`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/contact-info`,
        name: `contact-info`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/unikorns-page`,
        name: `unikorns-page`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/unikorns`,
        name: `unikorns`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/unikorns-body`,
        name: `unikorns-body`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/marketing-page`,
        name: `marketing-page`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/marketing`,
        name: `marketing`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/marketing-body`,
        name: `marketing-body`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/digital-page`,
        name: `digital-page`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/digital`,
        name: `digital`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/digital-body`,
        name: `digital-body`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/video`,
        name: `video`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/contact-modal`,
        name: `contact-modal`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/fourofour`,
        name: `fourofour`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/thanks`,
        name: `thanks`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/policy`,
        name: `policy`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/cookie`,
        name: `cookie`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              linkImagesToOriginal: false,
              maxWidth: 864,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: "https://www.unikorn.se",
        sitemap: "https://www.unikorn.se/sitemap.xml",
        policy: [{ userAgent: "*", disallow: "/admin", allow: "/" }],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage {
            edges {
              node {
                path
                context {
                  lastmod
                  slug
                  language
                  original
                }
              }
            }
          }
          allMarkdownRemark {
            edges {
              node {
                frontmatter {
                  shorttitle
                  language
                  original
                  path
                }
              }
            }
          }
        }
      `,
        serialize: ({ site, allSitePage, allMarkdownRemark }) => {
          return allSitePage.edges.map(({ node }) => {
            let lastmod = node.context.lastmod
            const language = node.context.language
            const original = node.context.original

            if (lastmod !== null) {
              lastmod = lastmod.split("T")[0]
            }

            //Alla svenska subpages
            if(language === 'sv') {
              return {
                url: site.siteMetadata.siteUrl + node.path,
                lastmodISO: lastmod,
                links: [
                  { lang: 'en', url: site.siteMetadata.siteUrl + original },
                  // The default in case page for user's language is not localized.
                  { lang: 'x-default', url: site.siteMetadata.siteUrl + original }
                ]
              }
            }

            //Alla engelska subpages
            if(language === 'en') {
              const swedish = allSitePage.edges.filter(
                el => el.node.context.original === node.path
              )

              if(swedish.length > 0) {
                return {
                  url: site.siteMetadata.siteUrl + node.path,
                    lastmodISO: lastmod,
                    links: [
                      { lang: 'sv', url: site.siteMetadata.siteUrl + swedish[0].node.path },
                      // The default in case page for user's language is not localized.
                      { lang: 'x-default', url: site.siteMetadata.siteUrl + node.path }
                    ]
                }
              }
            }


            if(language === null) {
              const match = allMarkdownRemark.edges.filter(
                el => el.node.frontmatter.path === node.path
              )

              if(match.length > 0) {
                const lang = match[0].node.frontmatter.language

                if(lang == 'sv') {
                  return {
                    url: site.siteMetadata.siteUrl + node.path,
                    lastmodISO: lastmod,
                    links: [
                      { lang: 'en', url: site.siteMetadata.siteUrl + match[0].node.frontmatter.original },
                      // The default in case page for user's language is not localized.
                      { lang: 'x-default', url: site.siteMetadata.siteUrl + match[0].node.frontmatter.original }
                    ]
                  }
                }

                if(lang == 'en') {
                  const swedish = allMarkdownRemark.edges.filter(
                    el => el.node.frontmatter.original === node.path
                  )
    
                  if(swedish.length > 0) {
                    return {
                      url: site.siteMetadata.siteUrl + node.path,
                        lastmodISO: lastmod,
                        links: [
                          { lang: 'sv', url: site.siteMetadata.siteUrl + swedish[0].node.frontmatter.path },
                          // The default in case page for user's language is not localized.
                          { lang: 'x-default', url: site.siteMetadata.siteUrl + node.path }
                        ]
                    }
                  }


                }
              }
            }

            return {
              url: site.siteMetadata.siteUrl + node.path,
              lastmodISO: lastmod,
            }
          })
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: "GTM-N8972BK",
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Unikorn`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#f15c68`,
        display: `minimal-ui`,
        icon: `content/assets/favicon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    // {
    //   resolve: `gatsby-plugin-typography`,
    //   options: {
    //     pathToConfigModule: `src/utils/typography`,
    //   },
    // },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
