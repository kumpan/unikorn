import React, { Component }  from "react"

import Styles from "./container.module.css"
import SEOform from "./contact/SEOform.js"

class Container extends Component {
  render() {
    const { children } = this.props

    return (
      <div className={Styles.content_container}>
        <div className={Styles.content_container_row}>
          {children}
        </div>
        {this.props.data && this.props.data.form_button && (
          <div className={Styles.content_container_contactForm}>
            <h4>{this.props.data.form_title}</h4>
            <span>{this.props.data.form_text}</span>
            <div className={Styles.form_input}>
              <SEOform message={this.props.data.form_text} buttonText={this.props.data.form_button}></SEOform>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Container