import React, { Component } from "react"

import BlogPost from './blog-post.js'

import Styles from "./blog-list.module.css"

class BlogList extends Component {
  render() {
    const posts = this.props.posts

    return (
      <div className={Styles.blog_list + ' ' + (this.props.keepMobileStyling ? Styles.blog_wrapper_mobile_style : '')}>
        {posts.length > 0 ? (
          posts.map(({ node }, index) => {
            return (
              <BlogPost key={index} post={node.frontmatter} toArticleText={this.props.toArticleText} keepMobileStyling={this.props.keepMobileStyling} large={this.props.large} />
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