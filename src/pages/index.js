import React, { Component } from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { PlayCircleIcon } from '@icons/material'

import Hero from "../components/hero.js"
import SEO from "../components/seo"
import Layout from "../components/layout.js"
import Section from "../components/section.js"
import TabsComponent from "../components/tabs.js"
import BlogList from "../components/blog/blog-list.js"
import SecondaryButton from "../components/buttons/secondary.js"
import VideoPopup from "../components/video/videopopup.js"
import FaqList from "../components/faq/faq-list.js"
import { closestByClass } from '../global-functions.js'

import Styles from "./index.module.css"

class Startpage extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      showVideo: false
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
    const pageData = this.props.data.pageData.edges[0].node.frontmatter
    const posts = this.props.data.posts.edges

    return (
      <Layout location="/" show_contact_info>
        <SEO
          title={pageData.title}
          description={pageData.description}
          canonical={pageData.canonical}
        />
        <Hero 
          heading={pageData.hero.heading} 
          text={pageData.hero.text}
          img={pageData.hero.featured_image.src}
          button={pageData.hero.button}
          buttonlink={pageData.hero.buttonlink}
          startpage
        />

        <Section class={Styles.tabs_section + " light-text reverse-color center-desktop"}>
          <span className="pre-heading">{pageData.tabs_section.tabs_heading}</span>
          <TabsComponent tabs={pageData.tabs_section.tab_fields} />
        </Section>

        <Section class="blog-section">
          <div className="container">
            <span className="pre-heading">{pageData.blog_section.pre_heading}</span>
            <h2>{pageData.blog_section.heading}</h2>
            <BlogList posts={posts} keepMobileStyling />
            <div className={Styles.align_right}>
              <SecondaryButton text={pageData.blog_section.button} link={pageData.blog_section.buttonlink} arrow />
            </div>
          </div>
        </Section>
        
        <Section class="video-section bg-color-section light-text">
          <div className="container">
            <span className="pre-heading">{pageData.video_section.pre_heading}</span>
            <h2>{pageData.video_section.heading}</h2>
            {pageData.video_section.video_url &&
              <div className={Styles.video_img_wrapper}>
                <Img 
                  fluid={{ ...pageData.video_section.video_image.src.childImageSharp.fluid, aspectRatio: 2.125}}
                  alt={pageData.video_section.video_image.alt}
                />
                <div className="video-btn" onClick={this.handleVideo} onKeyDown={this.handleVideo} role="button" tabIndex="0"><PlayCircleIcon /></div>
              </div>
            }
            <div className={Styles.align_right + ' ' + Styles.extra_space_above}>
              <SecondaryButton text={pageData.video_section.button} link={pageData.video_section.buttonlink} arrow />
            </div>
          </div>
        </Section>

        <Section class={Styles.faq_section}>
          <div className="container">
            <span className="pre-heading">{pageData.faq_section.pre_heading}</span>
            <h2>{pageData.faq_section.heading}</h2>
            <FaqList faqs={pageData.faq_section.faqs} faq_text={pageData.faq_section.load_more_faq_text} />
          </div>
          <div className={Styles.hide_mobile + ' ' + Styles.faq_bg_img}>
            {pageData.faq_section.featured_image.src.childImageSharp.fluid &&
              <Img 
                fluid={pageData.faq_section.featured_image.src.childImageSharp.fluid}
                alt={pageData.faq_section.featured_image.alt}
              />
            }
          </div>
        </Section>

        <Section class={Styles.reference_section + " light-text center-desktop"}>
          <span className="pre-heading">{pageData.references_section.references_tabs_heading}</span>
          <TabsComponent tabs={pageData.references_section.reference_tab_fields} />
        </Section>

        {this.state.showVideo && pageData.video_section.video_url &&
          <VideoPopup url={pageData.video_section.video_url} title={pageData.video_section.heading} handleVideo={this.handleVideo}/>
        }
      </Layout>
    )
  }
}

export default Startpage

export const data = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    pageData: allMdx(filter: { fileAbsolutePath: { regex: "/(/startpage)/" } }) {
      edges {
        node {
          frontmatter {
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
            tabs_section {
              tabs_heading
              tab_fields {
                tab_title
                heading
                text
                buttontext
                buttontext_mobile
                buttonlink
              }
            }
            blog_section {
              pre_heading
              heading
              button
              buttonlink
            }
            video_section {
              pre_heading
              heading
              video_url
              button
              buttonlink
              video_image {
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
            references_section {
              references_tabs_heading
              reference_tab_fields {
                tab_title
                heading
                text
                person
              }
            }
            faq_section {
              pre_heading
              heading
              load_more_faq_text
              faqs {
                question
                answer
              }
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
    posts: allMdx(
      filter: { fileAbsolutePath: { regex: "/(/blog/|/video/)/" } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
    ) {
      edges {
        node {
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