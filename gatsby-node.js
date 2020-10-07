const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPost = path.resolve(`./src/templates/blog-post-single.js`)
  const marketingPost = path.resolve(`./src/templates/marketing-subpage.js`)
  const digitalPost = path.resolve(`./src/templates/digital-subpage.js`)
  const webPost = path.resolve(`./src/templates/web-subpage.js`)
  const aboutPost = path.resolve(`./src/templates/about-subpage.js`)
  const { slugify } = require(`./src/global-functions.js`)

  return graphql(
    `
      {
        blogPosts: allMdx(
          filter: { fileAbsolutePath: { regex: "/(/blog/|/video/)/" } }
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
          filter: { fileAbsolutePath: { regex: "/(/about/)/" } }
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
          filter: { fileAbsolutePath: { regex: "/(/web/)/" } }
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
          filter: { fileAbsolutePath: { regex: "/(/marketing/)/" } }
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
          filter: { fileAbsolutePath: { regex: "/(/digital/)/" } }
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
    const aboutPosts = result.data.aboutPosts.edges
    const webPosts = result.data.webPosts.edges
    const marketingPosts = result.data.marketingPosts.edges
    const digitalPosts = result.data.digitalPosts.edges

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

    // Create about pages.
    aboutPosts.forEach((post, index) => {
      createPage({
        path: `about/${slugify(post.node.frontmatter.shorttitle)}`,
        component: aboutPost,
        context: {
          slug: post.node.fields.slug,
          lastmod: post.node.parent.mtime
        },
      })
    })

    // Create web pages.
    webPosts.forEach((post, index) => {
      createPage({
        path: `web/${slugify(post.node.frontmatter.shorttitle)}`,
        component: webPost,
        context: {
          slug: post.node.fields.slug,
          lastmod: post.node.parent.mtime
        },
      })
    })
    
    // Create marketing pages.
    marketingPosts.forEach((post, index) => {
      createPage({
        path: `marketing/${slugify(post.node.frontmatter.shorttitle)}`,
        component: marketingPost,
        context: {
          slug: post.node.fields.slug,
          lastmod: post.node.parent.mtime
        },
      })
    })

    // Create digital pages.
    digitalPosts.forEach((post, index) => {
      createPage({
        path: `digital-strategies/${slugify(post.node.frontmatter.shorttitle)}`,
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