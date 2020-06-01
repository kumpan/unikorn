const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const blogPost = path.resolve(`./src/templates/blog-post-single.js`)
  const marketingPost = path.resolve(`./src/templates/marketing-post-single.js`)
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
              frontmatter {
                title
                path
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
              frontmatter {
                shorttitle
                path
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
    const marketingPosts = result.data.marketingPosts.edges
    
    // Create blog posts pages.
    blogPosts.forEach((post, index) => {
      createPage({
        path: `blog/${slugify(post.node.frontmatter.path)}`,
        component: blogPost,
        context: {
          slug: post.node.frontmatter.path,
        },
      })
    })

    marketingPosts.forEach((post, index) => {
      createPage({
        path: `marketing/${slugify(post.node.frontmatter.shorttitle)}`,
        component: marketingPost,
        context: {
          slug: post.node.frontmatter.path,
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