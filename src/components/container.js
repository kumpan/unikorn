import React, { Component }  from "react"

import Styles from "./container.module.css"

class Container extends Component {
  render() {
    const { children } = this.props

    return (
      <div className={Styles.content_container}>
        <div className={Styles.content_container_row}>
          {children}
        </div>
      </div>
    )
  }
}

export default Container