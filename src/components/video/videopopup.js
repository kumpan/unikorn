import React, { Component }  from "react"

import ArrowButton from "../buttons/arrow-btn.js"
import Video from "./video.js"

class VideoPopup extends Component {
  render() {
    const { url, title, path, toArticleText } = this.props

      return (
        <div className="video-popup" key={this.props.id}>
          <div onClick={this.props.handleVideo} onKeyDown={this.props.handleVideo} role="button" tabIndex="0">CLOSE POPUP</div>
          <div>
            <Video
              videoSrcURL={url}
              videoTitle={title}
            />
          </div>
          {path &&
            <div>
              <ArrowButton text={toArticleText} link={path} />
            </div>
          }
        </div>
      )
  }
}

export default VideoPopup