import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Nav from "../../components/nav.js"

const SEO = () => {
  return (
  <div>
    <Nav location="/marketing/seo" />
    <h1>SEO</h1>
  </div>
  )
}

export default SEO