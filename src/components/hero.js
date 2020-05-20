import React, { Component }  from "react"
import Img from "gatsby-image"
import { Link } from "gatsby"

import PrimaryButton from "./buttons/primary.js"

class Hero extends Component {
  render() {
    const { heading, text, img, alt, button, buttonlink, shorttitle, parentPageLink, parentPageTitle } = this.props

    let heroImage
    if (img && img.extension === 'svg') {
      heroImage = 
      <div className="hero-section-image">
        <object type="image/svg+xml" data={img.publicURL} aria-labelledby={alt}></object>
      </div>
    } else if (img) {
      heroImage = 
      <div className="hero-section-image">
        <Img 
          fluid={img.childImageSharp.fluid}
          alt={alt}
        />
      </div>
    }

    return (
      <div className="hero-section">
        <div className="hero-section-text">
          {((parentPageLink || shorttitle) || (parentPageLink && shorttitle)) &&
            <div className="breadcrumbs">
              {parentPageLink &&
                <span><Link to={"/" + parentPageLink}>{parentPageTitle}</Link> / </span>
              }
              
              {shorttitle &&
                <span>{shorttitle}</span>
              }
            </div>
          }
          <h1>{heading}</h1>
          <p>{text}</p>

          {button &&
            <PrimaryButton text={button} link={buttonlink} />
          }
        </div>
          {heroImage}
      </div>
    )
  }
}

export default Hero