import React, { Component }  from "react"
import { Link } from "gatsby"

import Styles from "./icon-btn.module.css"

class IconBtn extends Component {
  render() {
    const { text, link, filterPosts, icon } = this.props

    let iconFile = icon
    
    try {
      iconFile = require("./icons/" + icon)
    }
    catch(err){
      iconFile = null
    }

    return (
      <div className={Styles.icon_btn} role="button" tabIndex="0" onClick={filterPosts} onKeyDown={filterPosts}>
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
            {iconFile &&
              <img src={iconFile} alt="icon" />
            }
            {text}
          </div>
        )}
      </div>
    )
  }
}

export default IconBtn