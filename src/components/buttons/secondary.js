import React, { Component }  from "react"
import { Link } from "gatsby"

class SecondaryButton extends Component {
  render() {
    const { text, link } = this.props

    return (
      <div className="secondary-btn">
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

export default SecondaryButton