import React, { Component } from "react"
import remark from "remark"
import recommended from "remark-preset-lint-recommended"
import remarkHtml from "remark-html"

import ToggleItem from "../../components/toggle.js"

import Styles from "./faq.module.css"

class Faq extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    }
  }

  toggleClass = (e) => {
    const currentState = this.state.active;
    this.setState({ 
      active: !currentState 
    });
  }

  render(){
    // Remark MD-content outside of body
    const answer = remark()
      .use(recommended)
      .use(remarkHtml)
      .processSync(this.props.answer)
      .toString()

    return(
      <div className={Styles.faq_wrapper + (this.state.active ? ' ' + Styles.active : '')}>
        <ToggleItem>
          <h4 onClick={this.toggleClass} onKeyDown={this.toggleClass} role='presentation' className={Styles.faq_title}>
            <span>{this.props.question}</span>
          </h4>
          <div className={Styles.faq_answer} dangerouslySetInnerHTML={{ __html: answer }} />
        </ToggleItem>
      </div>
    )
  }
}

export default Faq