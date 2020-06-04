import React from "react"

const Video = ({ videoSrcURL, videoTitle, ...props }) => {
  const parseVideo = (url) => {
    url.match(/(http:\/\/|https:\/\/|)(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(&\S+)?/);
    let newUrl = "";
    
    if (RegExp.$3.indexOf("youtu") > -1) {
      newUrl = "https://www.youtube.com/embed/" + RegExp.$6
      
    } else if (RegExp.$3.indexOf("vimeo") > -1) {
      newUrl = "https://player.vimeo.com/video/" + RegExp.$6
    }
    
    return {
      newUrl
    };
  }
  
  const videoURL = parseVideo(videoSrcURL).newUrl
  
  return (
    <div className="video">
      <iframe
        src={videoURL}
        title={videoTitle}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        frameBorder="0"
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        allowFullScreen
      />
    </div>
  )
}

export default Video