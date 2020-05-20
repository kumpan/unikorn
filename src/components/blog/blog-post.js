import React, { Component }  from "react"
import Img from "gatsby-image"
import { Link } from "gatsby"

import BlogDate from "./blog-date.js"
import VideoPopup from "../video/videopopup.js"
import { slugify } from '../../global-functions.js'


class BlogPost extends Component {
  constructor(props) {
    super(props)
    this.state = { showVideo: false }
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

    return (
      <div>
        <Link to={"/blog/" + slugify(path)}>
          <div className={"blog-post type-" + type}>
            <span className={"blog-type type-name-" + type}>{type}</span>
            <h2 className="blog-title">{title}</h2>
            <div className="blog-info">
              <span className="blog-author">{author}</span>
              <BlogDate date={date} />
            </div>
            <Img 
              fluid={featured_image.src.childImageSharp.fluid}
              alt={featured_image.alt}
            />

            {video_url &&
              <div className="video-btn" onClick={this.handleVideo} onKeyDown={this.handleVideo} role="button" tabIndex="0">Play</div>
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