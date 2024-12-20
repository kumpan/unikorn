import React, { Component }  from "react"
import Img from "gatsby-image"
import { Link } from "gatsby"
import PlayCircleIcon from "../../../content/assets/icons/play.svg"
import MovieIcon from "../../../content/assets/icons/movie.svg"
import FileDocumentIcon from "../../../content/assets/icons/file.svg"

import BlogDate from "./blog-date.js"
import VideoPopup from "../video/videopopup.js"
import { slugify, closestByClass } from "../../global-functions.js"


import Styles from "./blog-post.module.css"

class BlogPost extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      showVideo: false
    }
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
    const { type, title, author, date, featured_image, video_url, path } = this.props.post

    let prefix
    if (this.props.language === "sv") {
      prefix = "/sv/blogg/"
    } else {
      prefix = "/blog/"
    }

    let typeIcon
    if (type === "video") {
      typeIcon = <MovieIcon />
    } else {
      typeIcon = <FileDocumentIcon />
    }

    let typeText
    if (type === "blog") {
      if (this.props.language === "sv") {
        typeText = "blogg"
      } else {
        typeText = "blog"
      }
    } else {
      typeText = "video"
    }

    return (
      <div className={Styles.blog_post_wrapper + " blog-post-wrapper " + (this.props.keepMobileStyling ? Styles.blog_post_mobile_style : "") + " type-" + type }>
        <Link to={prefix + slugify(path) + "/"}>
          <div className={Styles.blog_post + " type-" + type + " " + (this.props.large ? Styles.large + " large" : "")}>
            <div className={Styles.blog_post_text_wrapper}>
              <span className={Styles.blog_cat}>
                {typeIcon}
                {typeText}
              </span>
              <h2 className={Styles.blog_title}>{title}</h2>
              <div className={Styles.blog_info}>
                <span className={Styles.blog_author}>{author}</span>
                <BlogDate className={Styles.blog_date} date={date} />
              </div>
            </div>
            <div className={Styles.blog_post_img}>
              <Img 
                fluid={featured_image.src.childImageSharp.fluid}
                alt={featured_image.alt}
              />
            </div>

            {video_url &&
              <div className="video-btn-wrapper" onClick={this.handleVideo} onKeyDown={this.handleVideo} role="button" tabIndex="0" aria-label="play">
                <div className="video-btn">
                  <PlayCircleIcon />
                </div>
              </div>
            }

          </div>
        </Link>
        {this.state.showVideo && video_url &&
          <VideoPopup url={video_url} title={title} path={"blog/" + path} handleVideo={this.handleVideo} toArticleText={this.props.toArticleText}/>
        }
      </div>
    )
  }
}

export default BlogPost