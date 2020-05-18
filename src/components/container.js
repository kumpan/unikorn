import React, { Component }  from "react"

class Container extends Component {
  render() {
    const { children } = this.props

    return (
      <div className="content-container">
        {children}
      </div>
    )
  }
}

export default Container