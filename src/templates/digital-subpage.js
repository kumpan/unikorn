import React, { Component } from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import SEO from "../components/seo"
import Layout from "../components/layout.js"
import Hero from "../components/hero.js"
import Container from "../components/container.js"
import BlogList from "../components/blog/blog-list.js"
import { closestByClass } from "../global-functions.js"

class MarketingTemplate extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      showVideo: false,
      showContactPopup: false
    }

    this.handleVideo = this.handleVideo.bind(this)
  }

  handleVideo = (e) => {
    e.preventDefault()
    const clickedEl = closestByClass(e.target, "video-btn")
    if (clickedEl) {
      clickedEl.blur()
    }

    if (this.state.showVideo === true) {
      this.setState({
        showVideo: false
      })
    } else {
      this.setState({
        showVideo: true
      })
    }
  }

  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const allPosts = this.props.data.relatedPosts.edges

    const { shorttitle, title, description, canonical, hero, posts_category, latest_posts_text } = this.props.data.currentPost.frontmatter

    const relatedPosts = allPosts.filter(
      relatedPost => relatedPost.node.frontmatter.category === posts_category
    )

    if (relatedPosts.length > 3) {
      relatedPosts.length = 3
    }
    
    return (
      <Layout location={this.props.location} title={siteTitle} show_contact_info>
        <SEO
          title={title}
          description={description}
          canonical={canonical}
        />
        <Hero 
          shorttitle={shorttitle}
          heading={hero.heading} 
          text={hero.preamble}
          img={hero.featured_image.src}
          button={hero.button}
          buttonlink={hero.buttonlink}
          alt={hero.featured_image.alt}
          parentPageTitle="Digital Strategies"
          parentPageLink="/digital-strategies"
          lowerImg
        />
        <div className="bg-color-section-desktop">
          <div className="overlay-container">
            <Container>
              <div className="content-container-text">
                <MDXRenderer>{this.props.data.currentPost.body}</MDXRenderer>
              </div>
              {relatedPosts.length > 0 &&
                <div className="content-container-posts">
                  <h2>{latest_posts_text}</h2>
                  <BlogList posts={relatedPosts} />
                </div>
              }
            </Container>
          </div>
        </div>
      </Layout>
    )
  }
}

export default MarketingTemplate

export const pageQuery = graphql`
  query DigitalSubpagesBySlug($slug: String!) {
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
        posts_category
        hero {
          heading
          preamble
          button
          buttonlink
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
        latest_posts_text
      }
    }
    relatedPosts: allMdx(
      filter: {
        fileAbsolutePath: { regex: "/(/blog/|/video/)/" }
      }) {
        edges {
          node {
            id
            frontmatter {
              path
              title
              date(formatString: "DD/MM/YY")
              category
              author
              video_url
              type
              featured_image {
                src {
                  childImageSharp {
                    fluid(maxWidth: 560) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
                alt
              }
            }
          }
        }
    }
  }
`