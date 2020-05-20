import React, { Component }  from "react"
import { Link } from "gatsby"

class SecondaryButton extends Component {
  render() {
    const { text, mobileBtn, link } = this.props

    return (
      <div className="secondary-btn">
        {link && !link.includes("mailto" || "call") ? (
          <Link to={link}>
            <span className="large-btn-text">{text}</span>
            {mobileBtn &&
              <span className="small-btn-text">{mobileBtn}</span>
            }
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