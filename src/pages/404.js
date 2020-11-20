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
        allMdx(filter: { fileAbsolutePath: { regex: "/(/fourofour)/" } }) {
          edges {
            node {
              body
              frontmatter {
                shorttitle
                title
                description
                canonical
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

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageData.title,
    "description": pageData.description,
    "url": pageData.canonical
  }

  return (
    <Layout location="/404" show_contact_info>
      <SEO
        title={pageData.title}
        description={pageData.description}
        canonical={pageData.canonical}
        shorttitle={pageData.shorttitle}
        schemaMarkup={schema}
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