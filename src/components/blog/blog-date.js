import React, { Component } from "react"

class BlogDate extends Component {
  render() {
    const date = this.props.date
    
    return (
      <span className="blog-date">{date}</span>
    )
  }
}

export default BlogDate