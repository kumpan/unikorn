import React, { Component } from "react"

import BlogPost from './blog-post.js'

class BlogList extends Component {
  render() {
    const posts = this.props.posts
    return (
      <div className="blog-list">
        {posts.length > 0 ? (
          posts.map(({ node }, index) => {
            return (
              <BlogPost key={index} post={node.frontmatter} toArticleText={this.props.toArticleText} />
            )
          })
        ) : (
          <p>
            No posts to show
          </p>
          )
        }
      </div>
    )
  }
}

export default BlogList