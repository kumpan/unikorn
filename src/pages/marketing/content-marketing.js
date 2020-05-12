import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Nav from "../../components/nav.js"

const ContentMarketing = () => {
  return (
  <div>
    <Nav location="/marketing/content-marketing" />
    <h1>Content Marketing</h1>
  </div>
  )
}

export default ContentMarketing