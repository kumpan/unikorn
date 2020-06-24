import React, { Component } from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Hero from "../components/hero.js"
import SEO from "../components/seo"
import Layout from "../components/layout.js"
import Container from "../components/container.js"

class AboutTemplate extends Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const pageData = this.props.data.currentPost.frontmatter
    const body = this.props.data.currentPost.body

    return (
      <Layout location={this.props.location} title={siteTitle} show_contact_info>
        <SEO
          title={pageData.title}
          description={pageData.description}
          canonical={pageData.canonical}
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
                <MDXRenderer>{body}</MDXRenderer>
              </div>
            </Container>
          </div>
        </div>
      </Layout>
    )
  }
}

export default AboutTemplate

export const pageQuery = graphql`
  query AboutPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    currentPost: mdx(fields: { slug: { eq: $slug } }) {
      id
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
`