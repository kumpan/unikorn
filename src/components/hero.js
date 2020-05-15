import React, { Component }  from "react"
import Img from "gatsby-image"

import PrimaryButton from "./buttons/primary.js"

class Hero extends Component {
  render() {
    const { heading, text, img, alt, button, buttonlink, shorttitle } = this.props

    //Handle svg images
    console.log(img)
    return (
      <div className="hero-section">
        {shorttitle &&
          <div className="breadcrumbs">
            <span>{shorttitle}</span>
          </div>
        }
        <h1>{heading}</h1>
        <p>{text}</p>

        {/* <Img 
          fluid={img.childImageSharp.fluid}
          alt={alt}
        /> */}

        {button &&
          <PrimaryButton text={button} link={buttonlink} />
        }

      </div>
    )
  }
}

export default Hero