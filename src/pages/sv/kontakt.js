import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import SEO from "../../components/seo"
import Layout from "../../components/layout-sv.js"

import ContactPopup from "../../components/contact/contactpopup.js"

const Contactpage = () => {
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
            fileAbsolutePath: { regex: "/(/contact-modal)/" }
            frontmatter: { language: { eq: "sv" } }
          }
        ) {
          edges {
            node {
              frontmatter {
                title
                description
                canonical
                language
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
                form {
                  form_title
                  name {
                    label
                    placeholder
                  }
                  email {
                    label
                    placeholder
                  }
                  message {
                    label
                    placeholder
                  }
                  subjects {
                    label
                    choices
                  }
                  form_info_text
                  submit_text
                }
                contact_email
                contact_tel
              }
            }
          }
        }
      }
    `
  )

  const pageData = data.allMdx.edges[0].node.frontmatter

  return (
    <Layout location="/sv/kontakt" show_contact_info>
      <SEO
        title={pageData.title}
        description={pageData.description}
        canonical={pageData.canonical}
        image={pageData.og_image.src}
        language={'sv'}
      />
      <ContactPopup data={pageData}></ContactPopup>
    </Layout>
  )
}

export default Contactpage
