import React, { Component }  from "react"

import Styles from "./container.module.css"

class Container extends Component {
  render() {
    const { children } = this.props
    const fullWidth = this.props.fullWidth

    console.log(this.props)

    return (
      <div className={Styles.content_container}>
        <div className={fullWidth ? Styles.content_container_row + ' ' + Styles.content_container_row_full: Styles.content_container_row}>
          {children}
        </div>
      </div>
    )
  }
}

export default Container