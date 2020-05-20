import React, { Component } from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import BlogList from "../components/blog/blog-list.js"
import BlogDate from "../components/blog/blog-date.js"
import { truncateText } from '../global-functions.js'
import VideoPopup from "../components/video/videopopup.js"
import ContactPopup from "../components/contact/contactpopup.js"
import ArrowButton from "../components/buttons/arrow-btn.js"

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
        <div>
          <div className="breadcrumbs">
            <Link to="/blog">Blog</Link>
            <span> / {truncateText(title, 10)}</span>
          </div>
          <h1>{title}</h1>
          <p>{preamble}</p>
          <div>{author} - <BlogDate date={date} /></div>
        </div>
        <div>
          {video_url &&
            <div>
              <Img 
                fluid={featured_image.src.childImageSharp.fluid}
                alt={featured_image.alt}
              />
              <div className="video-btn" onClick={this.handleVideo} onKeyDown={this.handleVideo} role="button" tabIndex="0">Play</div>
            </div>
          }

          <MDXRenderer>{post.body}</MDXRenderer>
          {popup_btn &&
            <ArrowButton text="Get in touch now" showPopup={this.showContactPopup}/>
          }
        </div>
        {relatedPosts.length > 0 &&
          <div>
            <div>Read another post about {currentCategory}</div>
            <BlogList posts={relatedPosts} />
          </div>
        }

        {this.state.showVideo && video_url &&
          <VideoPopup url={video_url} title={title} handleVideo={this.handleVideo}/>
        }

        {this.state.showContactPopup &&
          <ContactPopup />
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