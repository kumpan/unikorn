import React, { Component }  from "react"
import { Link } from "gatsby"
import ChevronDownIcon from "../../content/assets/icons/chevron-down.svg"

import ContactInfo from "../components/contact/contactinfo.js"
import ContactPopup from "../components/contact/contactpopup.js"
import Logo from "../../content/assets/logo-unikorn.svg"

import Styles from "./nav.module.css"

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      showMenu: false,
      lastScrollPosition: 0,
      hideNavbar: false,
      activeNavbar: false,
      showContactPopup: false
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.navigationOnScroll);
  }

  handleContactPopup = (e) => {
    e.preventDefault()

    document.getElementById( "nav-cta" ).blur()
    
    if (this.state.showContactPopup === true ) {
      this.setState({
        showContactPopup: false
      })
      document.getElementsByTagName( "html" )[0].classList.remove("no-scroll")

    } else {
      this.setState({
        showContactPopup: true
      })
      document.getElementsByTagName( "html" )[0].classList.add("no-scroll")
    }
    
  }

  navigationOnScroll = () => {
    let newScrollPosition =  window.pageYOffset
    let lastScrollPosition = this.state.lastScrollPosition

    if ( newScrollPosition > 1 ){
      if (this.state.activeNavbar === false) {
        this.setState({
          activeNavbar: true
        })
      }
    } else {
      if (this.state.activeNavbar === true) {
        this.setState({
          activeNavbar: false
        })
      }
    }
 
    if ( newScrollPosition > lastScrollPosition && ( newScrollPosition - lastScrollPosition) > 20 ) { // Scroll down with 40px delay
      if (this.state.hideNavbar === false) {
        this.setState({
          hideNavbar: true
        })
      }

    } else if ( newScrollPosition < lastScrollPosition && ( lastScrollPosition - newScrollPosition) > 20 ) { // Scroll up with 40px delay
      if (this.state.hideNavbar === true) {
        this.setState({
          hideNavbar: false
        })
      }
    }
 
    this.setState({
      lastScrollPosition: newScrollPosition
    })
  }

  toggleMenu = () => {
    this.setState({ showMenu: !this.state.showMenu })
  
    if (!this.state.showMenu) {
      setTimeout(() => {
        document.getElementsByTagName( "html" )[0].classList.add("no-scroll")
      }, 300)
    } else {
      document.getElementsByTagName( "html" )[0].classList.remove("no-scroll")
    }
  }
  
  componentWillUnmount() {
    document.getElementsByTagName( "html" )[0].classList.remove("no-scroll")
  }
  
  render() {
    let location = this.props.location
    if (this.props.location.pathname) {
      location = this.props.location.pathname
    }

    return (
      <div>

        <nav id="primary-nav" className={Styles.navigation_wrapper + " " + (this.state.showMenu ? Styles.opened : "") + " " + (this.state.activeNavbar ? Styles.active : "") + " " + (this.state.hideNavbar ? Styles.nav_up : "")}>
          <div className={Styles.logo}>
            <Link to="/" aria-label="Home">
              <Logo />
            </Link>
          </div>

          <div className={Styles.navigation + " " + (this.state.showMenu ? Styles.opened : "")}>
            <div className={Styles.navigation_inner}>
              <ul className={Styles.navigation_links}>
                <li className={ location === "/web-and-seo" ? Styles.active : ""}>
                  <Link to="/web-and-seo">
                    Web & SEO
                  </Link>
                </li>
                <li className={Styles.has_submenu + " " + ( location.includes("/marketing") ? Styles.active : "")}>
                  <Link to="/marketing">
                    Marketing
                  </Link>
                  <ChevronDownIcon />
                  <ul className={Styles.submenu}>
                    <li className={location === "/marketing/search-engine-optimization-seo" ? Styles.active : ""}>
                      <Link to="/marketing/search-engine-optimization-seo">
                        Search Engine Optimization (SEO)
                      </Link>
                    </li>
                    <li className={location === "/marketing/content-marketing" ? Styles.active : ""}>
                      <Link to="/marketing/content-marketing">
                        Content Marketing
                      </Link>
                    </li>
                    <li className={location === "/marketing/web-analysis" ? Styles.active : ""}>
                      <Link to="/marketing/web-analysis">
                        Web Analysis
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className={location === "/our-approach" ? Styles.active : ""}>
                  <Link to="/our-approach">
                    Our Approach
                  </Link>
                </li>
                <li className={location === "/blog" ? Styles.active : ""}>
                  <Link to="/blog">
                    Blog
                  </Link>
                </li>
                <li className={location === "/about" ? Styles.active : ""}>
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

          <div id="nav-cta" className={Styles.nav_cta} role="button" tabIndex="0" onClick={this.handleContactPopup} onKeyDown={this.handleContactPopup}>
            <span>Get in touch now</span>
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
        <div className={"popup " + (this.state.showContactPopup ? "active" : "")}>
          <ContactPopup handlePopup={this.handleContactPopup}/>
        </div>
      </div>
    )
  }
}

export default Nav