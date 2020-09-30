import React, { Component }  from "react"
import { Link } from "gatsby"
import ChevronDownIcon from "../../content/assets/icons/chevron-down.svg"

import ContactInfo from "../components/contact/contactinfo.js"
import ContactPopup from "../components/contact/contactpopup.js"
import Logo from "../../content/assets/logo-unikorn.svg"
import { slugify } from "../global-functions.js"

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

    let hash = window.location.hash

    if(hash && hash === "#contact") {
      window.location.href = ""
    }
  
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
    let hash = window.location.hash

    if(hash && hash === "#contact") {
       //this.setState({ showContactPopup: true })
      this.state.showContactPopup = true
      document.getElementsByTagName( "html" )[0].classList.add("no-scroll")
    } else {
      //this.setState({ showContactPopup: false })
      this.state.showContactPopup = false
      document.getElementsByTagName( "html" )[0].classList.remove("no-scroll")
    }

    let location = this.props.location
    if (this.props.location.pathname) {
      location = this.props.location.pathname
    }

    const aboutMenuItems = []
    this.props.aboutPages.forEach(function (page) {
      const menuItem = page.node.frontmatter.shorttitle
      const menuItemLink = slugify(menuItem)

      aboutMenuItems.push(
        <li className={location === `/about/${menuItemLink}` ? Styles.active : ""}>
          <Link to={"/about/" + menuItemLink}>{menuItem}</Link>
        </li>
      )
    });

    const webMenuItems = []
    this.props.webPages.forEach(function (page) {
      const menuItem = page.node.frontmatter.shorttitle
      const menuItemLink = slugify(menuItem)

      webMenuItems.push(
        <li className={location === `/web/${menuItemLink}` ? Styles.active : ""}>
          <Link to={"/web/" + menuItemLink}>{menuItem}</Link>
        </li>
      )
    });

    const marketingMenuItems = []
    this.props.marketingPages.forEach(function (page) {
      const menuItem = page.node.frontmatter.shorttitle
      const menuItemLink = slugify(menuItem)

      marketingMenuItems.push(
        <li className={location === `/marketing/${menuItemLink}` ? Styles.active : ""}>
          <Link to={"/marketing/" + menuItemLink}>{menuItem}</Link>
        </li>
      )
    });

    const digitalMenuItems = []
    this.props.digitalPages.forEach(function (page) {
      const menuItem = page.node.frontmatter.shorttitle
      const menuItemLink = slugify(menuItem)

      digitalMenuItems.push(
        <li className={location === `/digital-strategies/${menuItemLink}` ? Styles.active : ""}>
          <Link to={"/digital-strategies/" + menuItemLink}>{menuItem}</Link>
        </li>
      )
    });

    const setPage = this.props.type ? true : false

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
                <li className={Styles.has_submenu + " " + ( location.includes("/web") ? Styles.active : "")}>
                  <Link to="/web">
                    Web Magic
                  </Link>
                  <ChevronDownIcon />
                  <ul className={Styles.submenu}>
                    {webMenuItems}
                  </ul>
                </li>
                <li className={Styles.has_submenu + " " + ( location.includes("/marketing") ? Styles.active : "")}>
                  <Link to="/marketing">
                    Unikorn Marketing
                  </Link>
                  <ChevronDownIcon />
                  <ul className={Styles.submenu}>
                    {marketingMenuItems}
                  </ul>
                </li>
                <li className={Styles.has_submenu + " " + ( location.includes("/digital-strategies") ? Styles.active : "")}>
                  <Link to="/digital-strategies">
                    Digital Strategies
                  </Link>
                  <ChevronDownIcon />
                  <ul className={Styles.submenu}>
                    {digitalMenuItems}
                  </ul>
                </li>
                <li className={location === "/blog" ? Styles.active : ""}>
                  <Link to="/blog">
                    Blog
                  </Link>
                </li>
                <li className={Styles.has_submenu + " " + ( location.includes("/about") ? Styles.active : "")}>
                  <Link to="/about">
                    About Unikorn
                  </Link>
                  <ChevronDownIcon />
                  <ul className={Styles.submenu}>
                    {aboutMenuItems}
                  </ul>
                </li>
              </ul>
              <div className={Styles.nav_contact_info}>
                <ContactInfo transparent />
              </div>
            </div>
          </div>

          <div id="nav-cta" className={Styles.nav_cta + " " + (setPage ? Styles.nav_cta_type : " ")} role="button" tabIndex="0" onClick={this.handleContactPopup} onKeyDown={this.handleContactPopup}>
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