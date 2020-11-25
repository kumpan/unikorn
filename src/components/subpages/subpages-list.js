import React, { Component } from "react"

import SubpagesPost from "./subpages-post.js"

import Styles from "./subpages-list.module.css"

class SubpagesList extends Component {
  render() {
    const posts = this.props.posts
    const pathlink = this.props.pathLink
    
    return (
      <div className={Styles.subpages_list}>
        {posts.length > 0 ? (
          posts.map(({ node }, index) => {
            return (
              <SubpagesPost key={index} post={node.frontmatter} parentPage={this.props.parentPage} pathLink={pathlink} />
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

export default SubpagesList