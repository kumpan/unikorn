import React, { Component }  from "react"
import { Link } from "gatsby"
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock"


import ContactInfo from "../components/contact/contactinfo.js"
import Logo from '../../content/assets/unikorn-logo.svg'

import Styles from "./nav.module.css"

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      showMenu: false,
      lastScrollPosition: 0
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.navigationOnScroll);
  }

  navigationOnScroll = () => {
    let newScrollPosition =  window.pageYOffset
    let lastScrollPosition = this.state.lastScrollPosition

    if ( newScrollPosition > 1 ){
      console.log('active')
    } else {
      console.log('not active')
    }
 
    if ( newScrollPosition > lastScrollPosition && ( newScrollPosition - lastScrollPosition) > 40 ) { // Scroll down with 40px delay
      console.log('nav up')

    } else if ( newScrollPosition < lastScrollPosition && ( lastScrollPosition - newScrollPosition) > 40 ) { // Scroll up with 40px delay
      console.log('nav down')
    }
 
    this.setState({
      lastScrollPosition: newScrollPosition
    })
  }

  toggleMenu = () => {
    this.setState({ showMenu: !this.state.showMenu })
  
    if (!this.state.showMenu) {
      setTimeout(() => {
        disableBodyScroll(this.targetElement)
      }, 300)
    } else {
      enableBodyScroll(this.targetElement)
    }
  }
  
  componentWillUnmount() {
    clearAllBodyScrollLocks()
  }
  
  render() {
    return (
      <nav id="primary-nav" className={Styles.navigation_wrapper + " " + (this.state.showMenu ? Styles.opened : "")}>
        <div className={Styles.logo}>
          <Link to="/" aria-label="Home">
            <Logo />
          </Link>
        </div>

        <div className={Styles.navigation + " " + (this.state.showMenu ? Styles.opened : "")}>
          <div className={Styles.navigation_inner}>
            <ul className={Styles.navigation_links}>
              <li className={ this.props.location === "/web-and-seo" ? "active" : ""}>
                <Link to="/web-and-seo">
                  Web & SEO
                </Link>
              </li>
              <li className={this.props.location === "/marketing" ? "active" : ""}>
                <Link to="/marketing">
                  Marketing
                </Link>
                <ul className={Styles.submenu}>
                  <li className={this.props.location === "/marketing/search-engine-optimization-seo" ? "active" : ""}>
                    <Link to="/marketing/search-engine-optimization-seo">
                      Search Engine Optimization (SEO)
                    </Link>
                  </li>
                  <li className={this.props.location === "/marketing/content-marketing" ? "active" : ""}>
                    <Link to="/marketing/content-marketing">
                      Content Marketing
                    </Link>
                  </li>
                  <li className={this.props.location === "/marketing/web-analysis" ? "active" : ""}>
                    <Link to="/marketing/web-analysis">
                      Web Analysis
                    </Link>
                  </li>
                </ul>
              </li>
              <li className={this.props.location === "/our-approach" ? "active" : ""}>
                <Link to="/our-approach">
                  Our Approach
                </Link>
              </li>
              <li className={this.props.location === "/blog" ? "active" : ""}>
                <Link to="/blog">
                  Blog
                </Link>
              </li>
              <li className={this.props.location === "/about" ? "active" : ""}>
                <Link to="/about">
                  About us
                </Link>
              </li>
            </ul>
            <div className={Styles.nav_contact_info}>
              <ContactInfo transparent />
            </div>
          </div>
        </div>

        <div className={Styles.nav_button + " " + (this.state.showMenu ? Styles.opened : "")}
          onClick={this.toggleMenu}
          onKeyPress={this.toggleMenu}
          role="button"
          tabIndex="0"
          aria-label="Toggle Menu"
          >
            <span />
            <span />
        </div>
      </nav>
    )
  }
}

export default Nav