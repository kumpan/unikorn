import React, { Component }  from "react"
import Img from "gatsby-image"

import SecondaryButton from "../buttons/secondary.js"

import Styles from "./subpages-post.module.css"

class SubpagesPost extends Component {
  render() {
    const { shorttitle, shortdesc, icon, alt, path } = this.props.post
    const subpagesLink = path

    const subpagesIcon = (icon.src.extension === "svg") ? (
      <div className={Styles.subpages_icon}>
        <object type="image/svg+xml" data={icon.src.publicURL} aria-labelledby={alt}></object>
      </div>
    ) : (
      <div className={Styles.subpages_icon}>
        <Img 
          fluid={icon.src.childImageSharp.fluid}
          alt={alt}
        />
      </div>
    )

    return (
      <div className={Styles.subpages_post_wrapper}>
        <div className={Styles.subpages_post}>
          {subpagesIcon}
          <h3>{shorttitle}</h3>
          <p>{shortdesc}</p>
          <SecondaryButton link={subpagesLink} text="Read more" arrow/>
        </div>
      </div>
    )
  }
}

export default SubpagesPost