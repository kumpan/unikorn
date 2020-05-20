import React, { Component } from "react"

class Faq extends Component{
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
    return(
      <div className={this.state.active ? 'active': null} onClick={this.toggleClass} onKeyDown={this.toggleClass} role="button" tabIndex="0">
        <h4>{this.props.question}</h4>
        {!this.state.isHidden && <p>{this.props.answer}</p>}   
      </div>
    )
  }
}

export default Faq