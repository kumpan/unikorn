import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Nav from "../components/nav.js"

const About = () => {
  return (
  <div>
    <Nav location="/about" />
    <h1>About</h1>
  </div>
  )
}

export default About