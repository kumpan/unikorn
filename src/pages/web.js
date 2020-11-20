import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import SEO from "../components/seo"
import Layout from "../components/layout.js"
import Hero from "../components/hero.js"
import SubpagesList from "../components/subpages/subpages-list.js"

import { MDXRenderer } from "gatsby-plugin-mdx"

import Container from "../components/container.js"

import Styles from "./subpages.module.css"

const WebPage = () => {
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
            fileAbsolutePath: { regex: "/(/web-page/)/" }
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
          filter: { fileAbsolutePath: { regex: "/(/web/)/" } }
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

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageData.title,
    "description": pageData.description,
    "url": pageData.canonical
  }

  console.log('hallå')

  return (
    <Layout location="/web" show_contact_info>
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
        button={pageData.hero.button}
        buttonlink={pageData.hero.buttonlink}
      />

      <div className="bg-color-section-desktop">
        <div className="overlay-container">
          <Container fullWidth={true}>
            <MDXRenderer>{data.pageData.edges[0].node.body}</MDXRenderer>
          </Container>
        </div>
      </div>

      <div className={Styles.subpages_list_section + " bg-color-section-desktop"}>
        <div className="overlay-container container">
          <SubpagesList posts={posts} parentPage="/web" />
        </div>
      </div>
    </Layout>
  )
}

export default WebPage