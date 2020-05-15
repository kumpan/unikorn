import React, { Component }  from "react"

import Video from "./video.js"

class VideoPopup extends Component {
  render() {
    const { url, title } = this.props

    return (
      <div className="video-popup">
      <Video
        videoSrcURL={url}
        videoTitle={title}
      />
      </div>
    )
  }
}

export default VideoPopup