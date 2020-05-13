import React from "react"
import { useStaticQuery, graphql } from "gatsby"

class BlogPost extends React.Component {
  render() {
    const post = this.props.post
    const dateYear = post.date.slice(2, 4)
    const dateMonth = post.date.slice(5, 7)
    const date = post.date.slice(8, 10)

    return (
      <div className={"blog-post type-" + post.type}>
        <span className={"blog-type type-name-" + post.type}>{post.type}</span>
        <h2 className="blog-title">{post.title}</h2>
        <div className="blog-info">
          <span className="blog-author">{post.author}</span>
          <span className="blog-date">{date}/{dateMonth}/{dateYear}</span>
        </div>
      </div>
    )
  }
}

export default BlogPost