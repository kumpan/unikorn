import React from "react"

import Layout from "../components/layout.js"
import ContactInfo from "../components/contact/contactinfo.js"

const About = () => {
  return (
    <Layout location="/about">
      <h1>About</h1>
      <ContactInfo />
    </Layout>
  )
}

export default About