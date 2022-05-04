import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import SEO from "../../components/seo"
import Layout from "../../components/layout-sv.js"
import Hero from "../../components/hero.js"
import SubpagesList from "../../components/subpages/subpages-list.js"

import Container from "../../components/container.js"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Styles from "../subpages.module.css"

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
            fileAbsolutePath: { regex: "/(/seo-page/)/" }
            frontmatter: {language: {eq: "sv"}}
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

        bodyData: allMdx(
          filter: { 
            fileAbsolutePath: { regex: "/(/seo-body/)/" }
            frontmatter: {language: {eq: "sv"}}
          }
          sort: { fields: [frontmatter___order] order: ASC }
        ) {
          edges {
            node {
              body
            }
          }
        }

        posts: allMdx(
          filter: { 
            fileAbsolutePath: { regex: "/(/seo/)/" }
            frontmatter: {language: {eq: "sv"}}
          }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              frontmatter {
                path
                shorttitle
                shortdesc
                menu_position
                language
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
  const pageBody = data.bodyData.edges

  function sortItems( a, b ) {
    if ( a.node.frontmatter.menu_position < b.node.frontmatter.menu_position ){
      return -1;
    }
    if ( a.node.frontmatter.menu_position > b.node.frontmatter.menu_position ){
      return 1;
    }
    return 0;
  }
    
  posts.sort( sortItems );

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageData.title,
    "description": pageData.description,
    "url": pageData.canonical
  }

  return (
    <Layout location="/sv/seo" show_contact_info>
      <SEO
        title={pageData.title}
        description={pageData.description}
        canonical={pageData.canonical}
        schemaMarkup={schema}
        image={pageData.og_image.src}
        language={'sv'}
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
            <MDXRenderer>{pageBody[0].node.body}</MDXRenderer>
          </Container>
        </div>
      </div>
      <div className={Styles.subpages_list_section + " bg-color-section-desktop"}>
        <div className="overlay-container container">
          <SubpagesList posts={posts} parentPage="/sv/seo" />
        </div>
      </div>
      {pageBody[1] && (
        <div className="bg-color-section-desktop">
          <div className="overlay-container">
            <Container>
              <MDXRenderer>{pageBody[1].node.body}</MDXRenderer>
            </Container>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default MarketingPage