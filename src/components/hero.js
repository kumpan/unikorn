import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import PrimaryButton from "./buttons/primary.js"

class Hero extends React.Component {
  render() {
    const { heading, text, img, button, buttonlink } = this.props
    console.log(buttonlink)
    return (
      <div className="hero-section">
        <h1>{heading}</h1>
        <p>{text}</p>
        <Img 
          fluid={img.childImageSharp.fluid}
          alt="Hero illustration"
        />
        <PrimaryButton text={button} link={buttonlink} />
      </div>
    )
  }
}

export default Hero