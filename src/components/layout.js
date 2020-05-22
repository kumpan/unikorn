import React, { Component }  from "react"

import Nav from "./nav"
import ContactInfo from "../components/contact/contactinfo.js"
import Footer from "./footer"

class Layout extends Component {
  
  render() {
    const { children } = this.props

    console.log(this.props.show_contact_info)

    return (
      <div className="main-container">
        <Nav location={this.props.location}/>
        <main>{children}</main>
        {this.props.show_contact_info &&
          <ContactInfo />
        }
        <Footer />
      </div>
    )
  }
}

export default Layout