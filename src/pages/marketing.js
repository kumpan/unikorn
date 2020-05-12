import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout.js"

const Marketing = () => {
  return (
    <Layout location="/marketing">
      <h1>Marketing</h1>
    </Layout>
  )
}

export default Marketing