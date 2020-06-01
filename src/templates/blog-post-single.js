import React, { Component } from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { PlayCircleIcon } from '@icons/material'

import Layout from "../components/layout"
import BlogList from "../components/blog/blog-list.js"
import BlogDate from "../components/blog/blog-date.js"
import { truncateText } from '../global-functions.js'
import VideoPopup from "../components/video/videopopup.js"
import ContactPopup from "../components/contact/contactpopup.js"
import ArrowButton from "../components/buttons/arrow-btn.js"
import Container from "../components/container.js"

import Styles from "./blog-post-single.module.css"

class BlogTemplate extends Component {
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

  showContactPopup = (e) => {
    e.preventDefault()
    this.setState({
      showContactPopup: true
    })
  }

  render() {
    const post = this.props.data.currentPost
    const siteTitle = this.props.data.site.siteMetadata.title
    const allPosts = this.props.data.relatedPosts.edges

    const currentCategory = post.frontmatter.category
    const currentId = post.id
    const { title, author, date, featured_image, video_url, preamble, popup_btn } = this.props.data.currentPost.frontmatter

    const relatedPosts = allPosts.filter(
      relatedPost => relatedPost.node.frontmatter.category === currentCategory && relatedPost.node.id !== currentId
    )

    if(relatedPosts.length > 3) {
      relatedPosts.length = 3
    }
    
    return (
      <Layout location={this.props.location} title={siteTitle}>

        {this.state.showVideo && video_url &&
          <VideoPopup url={video_url} title={title} handleVideo={this.handleVideo}/>
        }

        {this.state.showContactPopup &&
          <ContactPopup />
        }

        <div className={Styles.single_hero}>
          <div className={Styles.single_hero_inner}>
            <div className="breadcrumbs">
              <span><Link to="/blog">Blog</Link></span>
              <span> / {truncateText(title, 10)}</span>
            </div>
            <h1>{title}</h1>
            <p>{preamble}</p>
            <div className={Styles.single_author}>{author} - <BlogDate date={date} /></div>
          </div>
        </div>

        <div className={Styles.single_content_wrapper}>
          <div className={Styles.single_content_wrapper_inner}>
            {video_url &&
              <div className={Styles.single_content_video}>
                <Img 
                  fluid={{ ...featured_image.src.childImageSharp.fluid, aspectRatio: 2.125}}
                  alt={featured_image.alt}
                />
                <div className="video-btn" onClick={this.handleVideo} onKeyDown={this.handleVideo} role="button" tabIndex="0"><PlayCircleIcon /></div>
              </div>
            }

            <div className={Styles.single_content_body}>
              <MDXRenderer>{post.body}</MDXRenderer>

            </div>

            {popup_btn &&
              <div className={Styles.cta_link}>
                <ArrowButton text="Get in touch now" showPopup={this.showContactPopup}/>
              </div>
            }
          </div>
        </div>

        {relatedPosts.length > 0 &&
          <Container>
            <h2>Read another post about {currentCategory}</h2>
            <BlogList posts={relatedPosts} />
          </Container>
        }
      </Layout>
    )
  }
}

export default BlogTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
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
        title
        date(formatString: "DD/MM/YY")
        author
        video_url
        preamble
        popup_btn
        category
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