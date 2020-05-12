import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Nav from "../components/nav.js"

const Approach = () => {
  return (
  <div>
    <Nav location="/our-approach" />
    <h1>Our Approach</h1>
  </div>
  )
}

export default Approach