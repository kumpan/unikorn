import React, { Component }  from "react"
import { Link } from "gatsby"

class IconBtn extends Component {
  render() {
    const { text, link, filterPosts, icon } = this.props

    let iconFile = icon
    
    try {
      iconFile = require('../../../content/assets/icons/' + icon)
    }
    catch(err){
      iconFile = null
    }

    return (
      <div className="icon-btn" role="button" tabIndex="0" onClick={filterPosts} onKeyDown={filterPosts}>
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
            <img src={iconFile} />
          }
            {text}
          </div>
        )}
      </div>
    )
  }
}

export default IconBtn