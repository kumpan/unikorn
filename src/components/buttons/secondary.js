import React, { Component }  from "react"
import { Link } from "gatsby"

import Styles from "./secondary.module.css"

class SecondaryButton extends Component {
  render() {
    const { text, mobileBtn, link } = this.props

    return (
      <div className={Styles.secondary_btn + " secondary-btn"}>
        {link && !link.includes("mailto" || "call") ? (
          <Link to={link}>
            <span className={Styles.large_btn_text}>{text}</span>
            {mobileBtn &&
              <span className={Styles.small_btn_text}>{mobileBtn}</span>
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