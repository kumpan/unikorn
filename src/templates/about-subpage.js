import React, { Component } from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Hero from "../components/hero.js"
import SEO from "../components/seo"
import Layout from "../components/layout.js"
import LayoutSv from "../components/layout-sv.js"
import Container from "../components/container.js"

class AboutTemplate extends Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const pageData = this.props.data.currentPost.frontmatter
    const body = this.props.data.currentPost.body
    const language = pageData.language

    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@id": this.props.data.site.siteMetadata.siteUrl + 'about',
            "name": "About"
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item":
          {
            "@id": this.props.location.href,
            "name": pageData.title
          }
        }
      ]
    }

    const Subpage = () => {
      return (
        <>
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
        </>
      )
    }

    return (
      <>
        {language === "en" ? (
          <Layout
            location={this.props.location}
            title={siteTitle}
            show_contact_info
          >
            <Subpage />
          </Layout>
        ) : (
          <LayoutSv
            location={this.props.location}
            title={siteTitle}
            show_contact_info
          >
            <Subpage />
          </LayoutSv>
        )}
      </>
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
        siteUrl
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