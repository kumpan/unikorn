import React, { Component }  from "react"
// import { Link } from "gatsby"
// import CookieConsent from "react-cookie-consent";
// import CloseIcon from "../../content/assets/icons/close.svg"

import Nav from "./nav"
import Footer from "./footer"

class Layout extends Component {
  render() {
    const { children } = this.props
    
    return (
      <div className="main-container">
        <Nav location={this.props.location}/>
        <main>{children}</main>
        <Footer show_contact_info={this.props.show_contact_info} />
        {/* <CookieConsent buttonText="OK" cookieName="cookieConcent" contentClasses="cookie-text" buttonWrapperClasses="cookie-btn">
          This website uses cookies to ensure you get the best experience. <Link to="/cookie-policy">Read the policy here</Link>.
          <CloseIcon />
        </CookieConsent> */}
      </div>
    )
  }
}

export default Layout