import React, { Component } from "react"

class BlogDate extends Component {
  render() {
    const date = this.props.date
    const dateYear = date.slice(2, 4)
    const dateMonth = date.slice(5, 7)
    const dateDay = date.slice(8, 10)

    return (
      <span className="blog-date">{dateDay}/{dateMonth}/{dateYear}</span>
    )
  }
}

export default BlogDate