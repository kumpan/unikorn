import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

import Nav from "./nav.js"
import PrimaryButton from "./buttons/primary.js"

class Hero extends React.Component {
  render() {
    const { heading, text, img, button, buttonlink } = this.props
    return (
      <header>
        <Nav />
        <div>
          <h1>{heading}</h1>
          <p>{text}</p>
          <Img 
            fluid={img.childImageSharp.fluid}
            alt="Hero illustration"
          />
          <PrimaryButton text={button} link={buttonlink} />
        </div>
      </header>
    )
  }
}

export default Hero