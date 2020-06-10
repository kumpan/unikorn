import React, { Component }  from "react"
import { Link } from "gatsby"
import ArrowRightIcon from "../../../content/assets/icons/arrow-forward.svg"

import Styles from "./arrow-btn.module.css"

class ArrowButton extends Component {
  render() {
    const { text, link, showPopup } = this.props

    return (
      <div className={Styles.arrow_btn} role="button" tabIndex="0" onClick={showPopup} onKeyDown={showPopup}>
        {link && !link.includes("mailto" || "call") ? (
          <Link to={link}>
            {text}<ArrowRightIcon />
          </Link>
        ) : link && link.includes("mailto" || "call") ? (
          <a href={link}>
            {text}<ArrowRightIcon />
          </a>
        ) : (
          <div>
            {text}<ArrowRightIcon />
          </div>
        )}
      </div>
    )
  }
}

export default ArrowButton