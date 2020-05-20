import React, { Component } from "react"

import MarketingPost from './marketing-post.js'

class MarketingList extends Component {
  render() {
    const posts = this.props.posts
    
    return (
      <div className="marketing-list">
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