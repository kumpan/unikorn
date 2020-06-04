import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import BlogPost from "./blog-post.js"

import Styles from "./blog-list.module.css"

const BlogList = (props) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        pageData: allMdx(filter: { fileAbsolutePath: { regex: "/(/blog-page/)/" }}) {
          edges {
            node {
              frontmatter {
                to_article_text
              }
            }
          }
        }
      }
    `
  )

  const blogPageData = data.pageData.edges[0].node.frontmatter
  const posts = props.posts

  return (
    <div className={Styles.blog_list + " " + (props.keepMobileStyling ? Styles.blog_wrapper_mobile_style : "")}>
      {posts.length > 0 ? (
        posts.map(({ node }, index) => {
          return (
            <BlogPost key={index} post={node.frontmatter} toArticleText={blogPageData.to_article_text} keepMobileStyling={props.keepMobileStyling} large={props.large} />
          )
        })
      ) : (
        <div className={Styles.no_posts}>
          <p>There are no posts published yet, come back soon and check again</p>
        </div>
        )
      }
    </div>
  )
}

export default BlogList