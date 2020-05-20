import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout.js"
import Hero from "../components/hero.js"
import ContactInfo from "../components/contact/contactinfo.js"
import MarketingList from "../components/marketing/marketing-list.js"

const MarketingPage = () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
        pageData: allMdx(
          filter: {
            fileAbsolutePath: { regex: "/(/marketing-page/)/" }
          }
        ) {
          edges {
            node {
              frontmatter {
                shorttitle
                hero {
                  heading
                  text
                  button
                  buttonlink
                }
              }
            }
          }
        }

        posts: allMdx(
          filter: { fileAbsolutePath: { regex: "/(/marketing/)/" } }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              frontmatter {
                shorttitle
                shortdesc
                icon {
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

  const pageData = data.pageData.edges[0].node.frontmatter
  const posts = data.posts.edges

  return (
    <Layout location="/marketing">
      <Hero 
        shorttitle={pageData.shorttitle}
        heading={pageData.hero.heading} 
        text={pageData.hero.text}
        button={pageData.hero.button}
        buttonlink={pageData.hero.buttonlink}
      />
      <MarketingList posts={posts} />
      <ContactInfo />
    </Layout>
  )
}

export default MarketingPage