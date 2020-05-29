import React, { Component }  from "react"
import { CloseIcon } from '@icons/material'

import ArrowButton from "../buttons/arrow-btn.js"
import Video from "./video.js"

import Styles from "./videopopup.module.css"

class VideoPopup extends Component {
  render() {
    const { url, title, path, toArticleText } = this.props

      return (
        <div className={Styles.video_popup_wrapper} key={this.props.id} onClick={this.props.handleVideo} onKeyDown={this.props.handleVideo} role="button" tabIndex="0">
          <div className={Styles.video_popup_close} onClick={this.props.handleVideo} onKeyDown={this.props.handleVideo} role="button" tabIndex="0"><CloseIcon /></div>
          <div className={Styles.video_popup_row}>
            <div className={Styles.popup_video}>
              <Video
                videoSrcURL={url}
                videoTitle={title}
              />
            </div>
            {path && toArticleText &&
              <div className={Styles.video_popup_link}>
                <ArrowButton text={toArticleText} link={path} />
              </div>
            }
          </div>
        </div>
      )
  }
}

export default VideoPopup