import React, { Component }  from "react"
import { Link } from "gatsby"

class BoxButton extends Component {
  render() {
    const { title, text, link } = this.props

      console.log(link)
    return (
      <div>
        {link && !link.includes("mailto" || "tel") ? (
          <Link to={link}>
            <p className="heeej">{title}</p>
            <strong>{text}</strong>
          </Link>
        ) : link && link.includes("mailto" || "tel") ? (
          <a href={link}>
            <p>{link}</p>
            <strong>{text}</strong>
          </a>
        ) : (
          <div>
            <p>{title}</p>
            <strong>{text}</strong>
          </div>
        )}
      </div>
    )
  }
}

export default BoxButton