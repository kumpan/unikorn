import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Hero from "../components/hero.js"
import Footer from "../components/footer.js"
import Layout from "../components/layout.js"

const Startpage = () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        allMdx(filter: { fileAbsolutePath: { regex: "/(/startpage)/" } }) {
          edges {
            node {
              frontmatter {
                hero {
                  heading
                  text
                  image {
                    childImageSharp {
                      fluid(maxWidth: 560) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                  button
                  buttonlink
                }
              }
            }
          }
        }
      }
    `
  )
  const pageData = data.allMdx.edges[0].node.frontmatter
  return (
    <Layout location="/">
      <Hero 
        heading={pageData.hero.heading} 
        text={pageData.hero.text}
        img={pageData.hero.image}
        button={pageData.hero.button}
      />
    </Layout>
  )
}

export default Startpage