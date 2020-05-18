import React, { Component }  from "react"
import Img from "gatsby-image"

import PrimaryButton from "./buttons/primary.js"

class Hero extends Component {
  render() {
    const { heading, text, img, alt, button, buttonlink, shorttitle } = this.props

    const image = (img.extension === 'svg') ? (
      <div className="hero-section-image">
        <object type="image/svg+xml" data={img.publicURL} aria-labelledby={alt}></object>
      </div>
    ) : (
      <div className="hero-section-image">
        <Img 
          fluid={img.childImageSharp.fluid}
          alt={alt}
        />
      </div>
    )

    return (
      <div className="hero-section">
        <div className="hero-section-text">
          {shorttitle &&
            <div className="breadcrumbs">
              <span>{shorttitle}</span>
            </div>
          }
          <h1>{heading}</h1>
          <p>{text}</p>

          {button &&
            <PrimaryButton text={button} link={buttonlink} />
          }
        </div>

        {image}

      </div>
    )
  }
}

export default Hero