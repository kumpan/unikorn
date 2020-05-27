import React, { Component }  from "react"
import { Link } from "gatsby"

import Styles from "./primary.module.css"

class PrimaryButton extends Component {
  render() {
    const { text, link } = this.props

    return (
      <div className={Styles.primary_btn}>
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