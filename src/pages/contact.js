import React from "react"
import SEO from "../components/seo"
import Layout from "../components/layout.js"
import ContactPopup from "../components/contact/contactpopup.js"
import { useStaticQuery, graphql } from "gatsby"


const Contact = () => {

  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        allMdx(filter: { fileAbsolutePath: { regex: "/(/contact)/" } }) {
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

  //todo: fix those
  const contactPage = true;

  return (
    <Layout location="/contact" type={contactPage} hideFooter={true}>
        <SEO
          title={pageData.title}
          description={pageData.description}
          canonical={pageData.canonical}
        />
        <div>
          <ContactPopup type={contactPage}/>
        </div>
    </Layout>
  )
}

export default Contact