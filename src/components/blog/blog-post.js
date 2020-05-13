import React, { Component }  from "react"
import Img from "gatsby-image"

import BlogDate from "./blog-date.js"
import VideoPopup from "../videopopup.js"

class BlogPost extends Component {
  constructor(props) {
    super(props)
    this.state = { showVideo: false }
  }

  playVideo = () => {
    this.setState({
      showVideo: true
    })
  }
  
  render() {
    const { type, title, author, date, featured_image } = this.props.post

    return (
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

        {type === 'video' &&
          <div className="video-btn" onClick={this.playVideo} onKeyDown={this.playVideo} role="button" tabIndex="0">Play</div>
        }

        {this.state.showVideo &&
          <VideoPopup />
        }
      </div>
    )
  }
}

export default BlogPost