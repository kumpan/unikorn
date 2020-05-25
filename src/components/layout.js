import React, { Component }  from "react"

import Nav from "./nav"
import Footer from "./footer"

class Layout extends Component {
  
  render() {
    const { children } = this.props

    console.log(this.props.show_contact_info)

    return (
      <div className="main-container">
        <Nav location={this.props.location}/>
        <main>{children}</main>
        <Footer show_contact_info={this.props.show_contact_info} />
      </div>
    )
  }
}

export default Layout