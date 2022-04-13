const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPost = path.resolve(`./src/templates/blog-post-single.js`)
  const marketingPost = path.resolve(`./src/templates/marketing-subpage.js`)
  const unikornsPost = path.resolve(`./src/templates/unikorns-subpage.js`)
  const digitalPost = path.resolve(`./src/templates/digital-subpage.js`)
  const webPost = path.resolve(`./src/templates/web-subpage.js`)
  const aboutPost = path.resolve(`./src/templates/about-subpage.js`)
  const { slugify } = require(`./src/global-functions.js`)

  return graphql(
    `
      {
        blogPosts: allMdx(
          filter: {
            fileAbsolutePath: { regex: "/(/blog/|/video/)/" }
            frontmatter: { language: { eq: "en" } }
          }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                path
              }
              parent {
                ... on File {
                  mtime
                }
              }
            }
          }
        }
        blogPostsSwe: allMdx(
          filter: {
            fileAbsolutePath: { regex: "/(/blog/|/video/)/" }
            frontmatter: { language: { eq: "sv" } }
          }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                path
              }
              parent {
                ... on File {
                  mtime
                }
              }
            }
          }
        }
        aboutPosts: allMdx(
          filter: {
            fileAbsolutePath: { regex: "/(/about/)/" }
            frontmatter: { language: { eq: "en" } }
          }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                shorttitle
                path
              }
              parent {
                ... on File {
                  mtime
                }
              }
            }
          }
        }
        aboutPostsSwe: allMdx(
          filter: {
            fileAbsolutePath: { regex: "/(/about/)/" }
            frontmatter: { language: { eq: "sv" } }
          }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                shorttitle
                path
              }
              parent {
                ... on File {
                  mtime
                }
              }
            }
          }
        }
        webPosts: allMdx(
          filter: {
            fileAbsolutePath: { regex: "/(/web/)/" }
            frontmatter: { language: { eq: "en" } }
          }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                shorttitle
                path
              }
              parent {
                ... on File {
                  mtime
                }
              }
            }
          }
        }
        webPostsSwe: allMdx(
          filter: {
            fileAbsolutePath: { regex: "/(/web/)/" }
            frontmatter: { language: { eq: "sv" } }
          }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                shorttitle
                path
              }
              parent {
                ... on File {
                  mtime
                }
              }
            }
          }
        }
        marketingPosts: allMdx(
          filter: {
            fileAbsolutePath: { regex: "/(/marketing/)/" }
            frontmatter: { language: { eq: "en" } }
          }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                shorttitle
                path
              }
              parent {
                ... on File {
                  mtime
                }
              }
            }
          }
        }
        marketingPostsSwe: allMdx(
          filter: {
            fileAbsolutePath: { regex: "/(/marketing/)/" }
            frontmatter: { language: { eq: "sv" } }
          }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                shorttitle
                path
              }
              parent {
                ... on File {
                  mtime
                }
              }
            }
          }
        }
        unikornsPosts: allMdx(
          filter: {
            fileAbsolutePath: { regex: "/(/unikorns/)/" }
            frontmatter: { language: { eq: "en" } }
          }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                shorttitle
                path
              }
              parent {
                ... on File {
                  mtime
                }
              }
            }
          }
        }
        unikornsPostsSwe: allMdx(
          filter: {
            fileAbsolutePath: { regex: "/(/unikorns/)/" }
            frontmatter: { language: { eq: "sv" } }
          }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                shorttitle
                path
              }
              parent {
                ... on File {
                  mtime
                }
              }
            }
          }
        }
        digitalPosts: allMdx(
          filter: {
            fileAbsolutePath: { regex: "/(/digital/)/" }
            frontmatter: { language: { eq: "en" } }
          }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                shorttitle
                path
              }
              parent {
                ... on File {
                  mtime
                }
              }
            }
          }
        }
        digitalPostsSwe: allMdx(
          filter: {
            fileAbsolutePath: { regex: "/(/digital/)/" }
            frontmatter: { language: { eq: "sv" } }
          }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                shorttitle
                path
              }
              parent {
                ... on File {
                  mtime
                }
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const blogPosts = result.data.blogPosts.edges
    const blogPostsSwe = result.data.blogPostsSwe.edges
    const aboutPosts = result.data.aboutPosts.edges
    const aboutPostsSwe = result.data.aboutPostsSwe.edges
    const webPosts = result.data.webPosts.edges
    const webPostsSwe = result.data.webPostsSwe.edges
    const marketingPosts = result.data.marketingPosts.edges
    const marketingPostsSwe = result.data.marketingPostsSwe.edges
    const unikornsPosts = result.data.unikornsPosts.edges
    const unikornsPostsSwe = result.data.unikornsPostsSwe.edges
    const digitalPosts = result.data.digitalPosts.edges
    const digitalPostsSwe = result.data.digitalPostsSwe.edges

    // Create blog posts pages.
    blogPosts.forEach((post, index) => {
      createPage({
        path: `blog/${slugify(post.node.frontmatter.path)}`,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          lastmod: post.node.parent.mtime
        },
      })
    })

    blogPostsSwe.forEach((post, index) => {
      createPage({
        path: `sv/blogg/${slugify(post.node.frontmatter.path)}`,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          lastmod: post.node.parent.mtime,
        },
      })
    })

    // Create about pages.
    aboutPosts.forEach((post, index) => {
      createPage({
        path: `about/${slugify(post.node.frontmatter.path)}`,
        component: aboutPost,
        context: {
          slug: post.node.fields.slug,
          lastmod: post.node.parent.mtime
        },
      })
    })

    // Create about pages.
    aboutPostsSwe.forEach((post, index) => {
      createPage({
        path: `sv/om-oss/${slugify(post.node.frontmatter.path)}`,
        component: aboutPost,
        context: {
          slug: post.node.fields.slug,
          lastmod: post.node.parent.mtime,
        },
      })
    })

    // Create web pages.
    webPosts.forEach((post, index) => {
      createPage({
        path: `web/${slugify(post.node.frontmatter.path)}`,
        component: webPost,
        context: {
          slug: post.node.fields.slug,
          lastmod: post.node.parent.mtime
        },
      })
    })
    
    // Create web pages.
    webPostsSwe.forEach((post, index) => {
      createPage({
        path: `sv/webb/${slugify(post.node.frontmatter.path)}`,
        component: webPost,
        context: {
          slug: post.node.fields.slug,
          lastmod: post.node.parent.mtime,
        },
      })
    })

    // Create marketing pages.
    marketingPosts.forEach((post, index) => {
      createPage({
        path: `marketing/${slugify(post.node.frontmatter.path)}`,
        component: marketingPost,
        context: {
          slug: post.node.fields.slug,
          lastmod: post.node.parent.mtime
        },
      })
    })

    // Create marketing pages.
    marketingPostsSwe.forEach((post, index) => {
      createPage({
        path: `sv/marknadsforing/${slugify(post.node.frontmatter.path)}`,
        component: marketingPost,
        context: {
          slug: post.node.fields.slug,
          lastmod: post.node.parent.mtime,
        },
      })
    })

    // Create Unikorn pages.
    unikornsPosts.forEach((post, index) => {
      createPage({
        path: `unikorns/${post.node.frontmatter.path}`,
        component: unikornsPost,
        context: {
          slug: post.node.fields.slug,
          lastmod: post.node.parent.mtime
        },
      })
    })

    // Create Unikorn pages.
    unikornsPostsSwe.forEach((post, index) => {
      createPage({
        path: `sv/unikorns/${post.node.frontmatter.path}`,
        component: unikornsPost,
        context: {
          slug: post.node.fields.slug,
          lastmod: post.node.parent.mtime,
        },
      })
    })

    // Create digital pages.
    digitalPosts.forEach((post, index) => {
      createPage({
        path: `digital-strategies/${slugify(post.node.frontmatter.path)}`,
        component: digitalPost,
        context: {
          slug: post.node.fields.slug,
          lastmod: post.node.parent.mtime
        },
      })
    })

    // Create digital pages.
    digitalPostsSwe.forEach((post, index) => {
      createPage({
        path: `sv/digitala-strategier/${slugify(
          post.node.frontmatter.path
        )}`,
        component: digitalPost,
        context: {
          slug: post.node.fields.slug,
          lastmod: post.node.parent.mtime
        },
      })
    })

    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}