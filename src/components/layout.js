import React from "react"

import Nav from "./nav"
import Footer from "./footer"

class Layout extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    const { children } = this.props

    return (
      <div className="main-container">
        <Nav location={this.props.location}/>
        <main>{children}</main>
        <Footer />
      </div>
    )
  }
}

export default Layout