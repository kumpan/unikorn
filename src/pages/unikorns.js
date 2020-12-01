import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import SEO from "../components/seo"
import Layout from "../components/layout.js"
import Hero from "../components/hero.js"
import SubpagesList from "../components/subpages/subpages-list.js"

import Container from "../components/container.js"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Styles from "./subpages.module.css"

const UnikornsPage = () => {
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
            fileAbsolutePath: { regex: "/(/unikorns-page/)/" }
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
                  button
                  buttonlink
                }
              }
            }
          }
        }
        posts: allMdx(
          filter: { fileAbsolutePath: { regex: "/(/unikorns/)/" } }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              frontmatter {
                shorttitle
                shortdesc
                path
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

  return (
    <Layout location="/unikorns" show_contact_info>
      <SEO
        title={pageData.title}
        description={pageData.description}
        canonical={pageData.canonical}
        schemaMarkup={schema}
        image={pageData.og_image.src}
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
          <Container>
            <MDXRenderer>{data.pageData.edges[0].node.body}</MDXRenderer>
          </Container>
        </div>
      </div>
      <div className={Styles.subpages_list_section + " bg-color-section-desktop"}>
        <div className="overlay-container container">
          <SubpagesList posts={posts} parentPage="/unikorns" pathLink={true} />
        </div>
      </div>
    </Layout>
  )
}

export default UnikornsPage 