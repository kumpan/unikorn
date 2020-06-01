import React, { Component }  from "react"
import Img from "gatsby-image"
import { Link } from "gatsby"

import BlogDate from "./blog-date.js"
import VideoPopup from "../video/videopopup.js"
import { slugify } from '../../global-functions.js'
import { PlayCircleIcon, MovieIcon, FileDocumentIcon } from '@icons/material'

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

    console.log(this.props.large)

    let typeIcon
    if (type === "video") {
      typeIcon = <MovieIcon />
    } else {
      typeIcon = <FileDocumentIcon />
    }

    return (
      <div className={Styles.blog_post_wrapper + " blog-post-wrapper " + (this.props.keepMobileStyling ? Styles.blog_post_mobile_style : '') + " type-" + type }>
        <Link to={"/blog/" + slugify(path)}>
          <div className={Styles.blog_post + " type-" + type + " " + (this.props.large ? Styles.large + " large" : "")}>
            <div className={Styles.blog_post_text_wrapper}>
              <span className={Styles.blog_cat}>
                {typeIcon}
                {type}
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
              <div className="video-btn" onClick={this.handleVideo} onKeyDown={this.handleVideo} role="button" tabIndex="0"><PlayCircleIcon /></div>
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