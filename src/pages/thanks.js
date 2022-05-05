import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Hero from "../components/hero.js"
import SEO from "../components/seo"
import Layout from "../components/layout.js"

const Thanks = () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        allMdx(
          filter: {
            fileAbsolutePath: { regex: "/(/thanks)/" }
            frontmatter: { language: { eq: "en" } }
          }
        ) {
          edges {
            node {
              body
              frontmatter {
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
    <Layout location="/thanks" show_contact_info>
      <SEO
        title={data.site.siteMetadata.title}
        noindex
        language={'en'}
      />
      <Hero 
        shorttitle={pageData.shorttitle}
        heading={pageData.hero.heading} 
        text={pageData.hero.text}
        img={pageData.hero.featured_image.src}
        button={pageData.hero.button}
        buttonlink={pageData.hero.buttonlink}
        alt={pageData.hero.featured_image.alt}
      />
    </Layout>
  )
}

export default Thanks