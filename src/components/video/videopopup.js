import React, { Component }  from "react"

import ArrowButton from "../buttons/arrow-btn.js"
import Video from "./video.js"

class VideoPopup extends Component {
  constructor(props) {
    super(props)
    this.state = { closePopup: false }
  }

  closePopup = (e) => {
    e.preventDefault()
      this.setState({
        closePopup: true
      })
  }

  componentWillReceiveProps() {
    this.setState({
      closePopup: false
    })
  }
  
  render() {
    const { url, title, path } = this.props

    if(this.state.closePopup === false) {
      return (
        <div className="video-popup" key={this.props.id}>
          <div onClick={this.closePopup} onKeyDown={this.closePopup} role="button" tabIndex="0">CLOSE POPUP</div>
          <div>
            <Video
              videoSrcURL={url}
              videoTitle={title}
            />
          </div>
          {path &&
            <div>
              <ArrowButton text="Read the article" link={path} />
            </div>
          }
        </div>
      )
    } else {
      return null
    }
  }
}

export default VideoPopup