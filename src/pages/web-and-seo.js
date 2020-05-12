import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Nav from "../components/nav.js"

const WebSEO = () => {
  return (
  <div>
    <Nav location="/web-and-seo" />
    <h1>Web & SEO</h1>
  </div>
  )
}

export default WebSEO