import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const FouroFour = () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        allMdx(filter: { fileAbsolutePath: { regex: "/(/about)/" } }) {
          edges {
            node {
              body
              frontmatter {
                shorttitle
                hero {
                  heading
                  text
                  featured_image {
                    src {
                      childImageSharp {
                        fluid(maxWidth: 560) {
                          ...GatsbyImageSharpFluid
                        }
                      }
                      extension
                      publicURL
                    }
                    alt
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
      HELLO 404
    </div>
  )
}

export default FouroFour