import React, { Component } from "react"
import AnimateHeight from 'react-animate-height';

class ToggleItem extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      height: 0
    } 
  }

  toggleHeight = () => {
    this.setState({
      height: this.state.height === 0 ? 'auto' : 0
    })
  }

  render() {
    return (
      <div>
        <div onClick={ this.toggleHeight } onKeyDown={ this.toggleHeight } role="button" tabIndex="0">{this.props.children[0]}</div>
        <AnimateHeight duration={ 300 } height={ this.state.height }>
          {this.props.children[1]}
        </AnimateHeight>
      </div>
    )
  }
}

export default ToggleItem