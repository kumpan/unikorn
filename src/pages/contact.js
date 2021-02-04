import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import SEO from "../components/seo"
import Layout from "../components/layout.js"

import ContactPopup from '../components/contact/contactpopup.js'

const Contactpage = () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        allMdx(filter: { fileAbsolutePath: { regex: "/(/contact-modal)/" } }) {
          edges {
            node {
              frontmatter {
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
              }
            }
          }
        }
      }
    `
  )

  const pageData = data.allMdx.edges[0].node.frontmatter

  return (
    <Layout location="/contact" show_contact_info>
      <SEO
        title={pageData.title}
        description={pageData.description}
        canonical={pageData.canonical}
        image={pageData.og_image.src}
      />
      <ContactPopup></ContactPopup>
    </Layout>
  )
}

export default Contactpage