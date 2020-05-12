import React from "react"
import { useStaticQuery, graphql } from "gatsby"

class BlogPost extends React.Component {
  render() {
    const post = this.props.post
    const dateYear = post.date.slice(2, 4)
    const dateMonth = post.date.slice(5, 7)
    const datee = post.date.slice(8, 10)

    return (
      <div className="blog-post">
        <span className="blog-cat">{post.category}</span>
        <h2 className="blog-title">{post.title}</h2>
        <div className="blog-info">
          <span className="blog-author">{post.author}</span>
          <span className="blog-date">{datee}/{dateMonth}/{dateYear}</span>
        </div>
      </div>
    )
  }
}

export default BlogPost