import React, { Component }  from "react"
import { Link } from "gatsby"

class PrimaryButton extends Component {
  render() {
    const { text, link } = this.props

    return (
      <div>
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

export default PrimaryButton