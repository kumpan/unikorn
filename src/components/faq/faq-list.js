import React, { Component } from "react"

import Faq from "./faq.js"

class FaqList extends Component{
  constructor(props) {
    super(props);

    this.state = {
      items: this.props.faqs,
      visible: 2,
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
      <div className="faq-list">
        {faqList}
        {this.state.visible < this.state.items.length &&
          <div onClick={this.loadMore} onKeyDown={this.loadMore} role="button" tabIndex="0" className="load-more">View more FAQ’s</div>
        }
      </div>
    )
  }
}

export default FaqList