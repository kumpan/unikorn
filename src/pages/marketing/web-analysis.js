import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Nav from "../../components/nav.js"

const WebAnalysis = () => {
  return (
  <div>
    <Nav location="/marketing/web-analysis" />
    <h1>Web Analysis</h1>
  </div>
  )
}

export default WebAnalysis