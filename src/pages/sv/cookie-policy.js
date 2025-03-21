import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Hero from "../../components/hero.js"
import SEO from "../../components/seo"
import Layout from "../../components/layout-sv.js"
import Container from "../../components/container.js"

const Cookie = () => {
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
            fileAbsolutePath: { regex: "/(/cookie)/" }
            frontmatter: { language: { eq: "sv" } }
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
    <Layout location="/sv/cookie-policy" show_contact_info>
      <SEO
        title={pageData.title}
        description={pageData.description}
        canonical={pageData.canonical}
        image={pageData.og_image.src}
        language={'sv'}
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
      <div className="bg-color-section-desktop">
        <div className="overlay-container">
          <Container>
            <div className="content-container-text">
              <MDXRenderer>{data.allMdx.edges[0].node.body}</MDXRenderer>
            </div>
          </Container>
        </div>
      </div>
    </Layout>
  )
}

export default Cookie
