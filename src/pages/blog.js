import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Nav from "../components/nav.js"

const Blog = () => {
  return (
  <div>
    <Nav location="/blog" />
    <h1>Blog</h1>
  </div>
  )
}

export default Blog