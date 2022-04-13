import React, { Component } from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link } from "gatsby"
import Img from "gatsby-image"
import PlayCircleIcon from "../../content/assets/icons/play.svg"

import SEO from "../components/seo"
import Layout from "../components/layout"
import LayoutSv from "../components/layout-sv.js"
import BlogList from "../components/blog/blog-list.js"
import BlogDate from "../components/blog/blog-date.js"
import { truncateText } from "../global-functions.js"
import VideoPopup from "../components/video/videopopup.js"
import ArrowButton from "../components/buttons/arrow-btn.js"
import { closestByClass } from "../global-functions.js"

import Styles from "./blog-post-single.module.css"

class BlogTemplate extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      showVideo: false,
      activeClass: ""
    }

    this.handleVideo = this.handleVideo.bind(this)
  }
  
  componentDidMount() {
    this.setState({
      activeClass: Styles.animate_hero
    })
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
    const post = this.props.data.currentPost
    const siteTitle = this.props.data.site.siteMetadata.title
    const allPosts = this.props.data.relatedPosts.edges
    const allPostsSwe = this.props.data.relatedPostsSwe.edges

    const currentCategory = post.frontmatter.category
    const currentId = post.id
    const { title, description, canonical, og_image, author, author_page, date, featured_image, video_url, preamble, popup_btn, language } = this.props.data.currentPost.frontmatter

    let relatedPosts

    if (language === "en") {
      relatedPosts = allPosts.filter(
        relatedPost => relatedPost.node.frontmatter.category.includes(currentCategory) && relatedPost.node.id !== currentId
      )
    } else {
      relatedPosts = allPostsSwe.filter(
        relatedPost => relatedPost.node.frontmatter.category.includes(currentCategory) && relatedPost.node.id !== currentId
      )
    }

    if(relatedPosts.length > 3) {
      relatedPosts.length = 3
    }

    const schema = [
    { "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonical
      },
      "headline": title,
      "image": featured_image.src.childImageSharp.fluid.src,
      "author": {
        "@type": "Person",
        "name": author
      },
      "datePublished": date
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@id": this.props.data.site.siteMetadata.siteUrl + 'blog',
            "name": "Blog"
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item":
          {
            "@id": this.props.location.href,
            "name": title
          }
        }
      ]
    }
  ]

    if(video_url) {
      const target = {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": title,
        "description": description,
        "thumbnailUrl": featured_image.src.childImageSharp.fluid.src,
        "embedUrl": video_url,
      }
      schema.push(target)
    }

    const Subpage = (props) => {
    return (
      <>
        <SEO
          title={title}
          description={description}
          canonical={canonical}
          video={video_url}
          schemaMarkup={schema}
          image={og_image.src}
        />
        {this.state.showVideo && video_url &&
          <VideoPopup url={video_url} title={title} handleVideo={this.handleVideo}/>
        }

        <div className={Styles.single_hero + " " + this.state.activeClass}>
          <div className={Styles.single_hero_inner}>
            <div className={"breadcrumbs " + Styles.breadcrumbs}>
              <span><Link to={props.link}>{props.title}</Link></span>
              <span> / {truncateText(title, 10)}</span>
            </div>
            <h1>{title}</h1>
            <p>{preamble}</p>
            <div className={Styles.single_author}><Link to={author_page}>{author}</Link> - <BlogDate date={date} /></div>
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
                <div className="video-btn-wrapper" onClick={this.handleVideo} onKeyDown={this.handleVideo} role="button" tabIndex="0" aria-label="play">
                  <div className="video-btn">
                    <PlayCircleIcon />
                  </div>
                </div>
              </div>
            }

            <div className={Styles.single_content_body}>
              <MDXRenderer>{post.body}</MDXRenderer>

            </div>

            {popup_btn &&
              <Link to={props.contactLink}>
                <div className={Styles.cta_link} role="button" tabIndex="0">
                  <ArrowButton text="Get in touch now" />
                </div>
              </Link>
            }
          </div>
        </div>

        {relatedPosts.length > 0 &&
          <div className={Styles.single_related_wrapper}>
            <div className={Styles.single_related_wrapper_inner}>
              <h2>Read another post about {currentCategory}</h2>
              <BlogList language={language} posts={relatedPosts} />
            </div>
        </div>
        }
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
            <Subpage
              title={"Blog"}
              link={"/blog/"}
              contactLink={"/contact/"}
            />
          </Layout>
        ) : (
          <LayoutSv
            location={this.props.location}
            title={siteTitle}
            show_contact_info
          >
            <Subpage
              title={"Blogg"}
              link={"/sv/blogg/"}
              contactLink={"/sv/kontakt/"}
            />
          </LayoutSv>
        )}
      </>
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
        date(formatString: "DD/MM/YY")
        author
        author_page
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
        frontmatter: { language: { eq: "en" } }
      }
    ) {
      edges {
        node {
          id
          frontmatter {
            path
            title
            date(formatString: "DD/MM/YY")
            category
            author
            author_page
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
    relatedPostsSwe: allMdx(
      filter: {
        fileAbsolutePath: { regex: "/(/blog/|/video/)/" }
        frontmatter: { language: { eq: "sv" } }
      }
    ) {
      edges {
        node {
          id
          frontmatter {
            path
            title
            date(formatString: "DD/MM/YY")
            category
            author
            author_page
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