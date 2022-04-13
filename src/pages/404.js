import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Hero from "../components/hero.js"
import SEO from "../components/seo"
import Layout from "../components/layout.js"

const FouroFour = () => {
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
            fileAbsolutePath: { regex: "/(/fourofour)/" }
            frontmatter: { language: { eq: "en" } }
          }
        ) {
          edges {
            node {
              body
              frontmatter {
                shorttitle
                title
                description
                canonical
                og_image {
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
    <Layout location="/404" show_contact_info>
      <SEO
        title={pageData.title}
        description={pageData.description}
        canonical={pageData.canonical}
        image={pageData.og_image.src}
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

export default FouroFour