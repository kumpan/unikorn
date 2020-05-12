import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout.js"

const Blog = () => {
  return (
    <Layout location="/blog">
      <h1>Blog</h1>
    </Layout>
  )
}

export default Blog