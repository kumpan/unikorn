import React, { Component }  from "react"
import { Link } from "gatsby"

class ArrowButton extends Component {
  render() {
    const { text, link, showPopup } = this.props

    return (
      <div role="button" tabIndex="0" onClick={showPopup} onKeyDown={showPopup}>
        {link && !link.includes("mailto" || "call") ? (
          <Link to={link}>
            {text}
          </Link>
        ) : link && link.includes("mailto" || "call") ? (
          <a href={link}>
            {text}
          </a>
        ) : (
          <div>
            {text}
          </div>
        )}
      </div>
    )
  }
}

export default ArrowButton