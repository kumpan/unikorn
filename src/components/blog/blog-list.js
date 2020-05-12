import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import BlogPost from './blog-post.js'

class BlogList extends React.Component {
  render() {
    const posts = this.props.posts
    return (
      <div className="blog-list">
        {posts.length > 0 ? (
          posts.map(({ node }) => {
            return (
              <BlogPost post={node.frontmatter} />
            )
          })
        ) : (
          <p>
            Just nu finns det inga inlägg
          </p>
        )
      }
      </div>
    )
  }
}

export default BlogList