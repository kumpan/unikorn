import React, { Component } from "react"
import { ArrowDownIcon } from "@icons/material"

import Faq from "./faq.js"

import Styles from "./faq-list.module.css"

class FaqList extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      items: this.props.faqs,
      visible: 3,
      error: false
    }
    
    this.loadMore = this.loadMore.bind(this);
  }
  
  loadMore = () => {
    this.setState((prev) => {
      return {visible: prev.visible + 4};
    });
  }
  
  render(){
    const faqList = this.state.items.slice(0, this.state.visible).map(({question, answer}, index) => {
      return (
        <Faq key={index} question={question} answer={answer} />
      );
    })

    return(
      <div className={Styles.faq_list}>
        {faqList}
        {this.state.visible < this.state.items.length &&
          <div className={Styles.faq_load_more_wrapper}>
            <div className={Styles.faq_load_more} onClick={this.loadMore} onKeyDown={this.loadMore} role="button" tabIndex="0">
              <span>{this.props.faq_text}</span>
              <ArrowDownIcon />
            </div>
          </div>
        }
      </div>
    )
  }
}

export default FaqList