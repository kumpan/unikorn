import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Nav from "../components/nav.js"

const Marketing = () => {
  return (
  <div>
    <Nav location="/marketing" />
    <h1>Marketing</h1>
  </div>
  )
}

export default Marketing