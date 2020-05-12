import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import BlogList from "../components/blog/blog-list.js"

const BlogPosts = () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        allMdx(
          filter: { fileAbsolutePath: { regex: "/(/blog/|\/video\/)/" } }
          sort: { fields: [frontmatter___date], order: DESC }
        )
         {
          edges {
            node {
              frontmatter {
                title
                date
                category
                author
              }
            }
          }
        }
      }
    `
  )
  const posts = data.allMdx.edges
  return (
  <div>
    <BlogList posts={posts} />
  </div>
  )
}

export default BlogPosts