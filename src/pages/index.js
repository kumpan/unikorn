import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Hero from "../components/hero.js"

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
  <div>
    <Hero 
      heading={pageData.hero.heading} 
      text={pageData.hero.text}
      img={pageData.hero.image}
      button={pageData.hero.button}
    />
  </div>
  )
}

export default Startpage