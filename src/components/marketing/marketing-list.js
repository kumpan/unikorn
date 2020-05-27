import React, { Component } from "react"

import MarketingPost from './marketing-post.js'

import Styles from "./marketing-list.module.css"

class MarketingList extends Component {
  render() {
    const posts = this.props.posts
    
    return (
      <div className={Styles.marketing_list}>
        {posts.length > 0 ? (
          posts.map(({ node }, index) => {
            return (
              <MarketingPost key={index} post={node.frontmatter} />
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

export default MarketingList