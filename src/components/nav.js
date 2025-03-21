import React, { Component }  from "react"
import { Link } from "gatsby"
import ChevronDownIcon from "../../content/assets/icons/chevron-down.svg"

import Logo from "../../content/assets/logo-unikorn.svg"

import Styles from "./nav.module.css"

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      showMenu: false,
      lastScrollPosition: 0,
      hideNavbar: false,
      activeNavbar: false
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.navigationOnScroll);
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

    const sortWeb = this.props.webPages
    const sortMarketing = this.props.marketingPages

    function sortItems( a, b ) {
      if ( a.node.frontmatter.menu_position < b.node.frontmatter.menu_position ){
        return -1;
      }
      if ( a.node.frontmatter.menu_position > b.node.frontmatter.menu_position ){
        return 1;
      }
      return 0;
    }
    
    sortWeb.sort( sortItems );
    sortMarketing.sort( sortItems );

    const prefix = this.props.language

    const aboutMenuItems = []
    this.props.aboutPages.forEach(function (page, i) {
      const menuItem = page.node.frontmatter.shorttitle
      const menuItemLink = page.node.frontmatter.path

      aboutMenuItems.push(
        <li className={location === menuItemLink ? Styles.active : ""} key={`${i}aboutmenu`}>
          <Link to={menuItemLink}>{menuItem}</Link>
        </li>
      )
    });

    const webMenuItems = []
    this.props.webPages.forEach(function (page, i) {
      const menuItem = page.node.frontmatter.shorttitle
      const menuItemLink = page.node.frontmatter.path

      webMenuItems.push(
        <li className={location === menuItemLink ? Styles.active : ""} key={`${i}webmenu`} >
          <Link to={menuItemLink}>{menuItem}</Link>
        </li>
      )
    });

    const marketingMenuItems = []
    this.props.marketingPages.forEach(function (page, i) {
      const menuItem = page.node.frontmatter.shorttitle
      const menuItemLink = page.node.frontmatter.path

      marketingMenuItems.push(
        <li className={location === menuItemLink ? Styles.active : ""} key={`${i}marketingmenu`}>
          <Link to={menuItemLink}>{menuItem}</Link>
        </li>
      )
    });

    let currentLang;
    let currentFlag;
    let otherLang;
    let otherFlag;
    let otherUrl;

    if(prefix === '/') {
      currentLang = 'English';
      currentFlag = 'gb';
      otherLang = 'Swedish';
      otherFlag = 'se';
      otherUrl = '/sv/';
    } else {
      currentLang = 'Svenska';
      currentFlag = 'se';
      otherLang = 'Engelska';
      otherFlag = 'gb';
      otherUrl = '/';
    }

    return (
      <div>

        <nav id="primary-nav" className={Styles.navigation_wrapper + " " + (this.state.showMenu ? Styles.opened : "") + " " + (this.state.activeNavbar ? Styles.active : "") + " " + (this.state.hideNavbar ? Styles.nav_up : "")}>
          <div className={Styles.logo}>
            <Link to={prefix} aria-label="Home">
              <Logo />
            </Link>
          </div>

          <div className={Styles.navigation + " " + (this.state.showMenu ? Styles.opened : "")}>
            <div className={Styles.navigation_inner}>
              <ul className={Styles.navigation_links}>
                <li className={Styles.has_submenu + " " + ( location.includes("/seo") ? Styles.active : "")}>
                  {prefix === '/' ?
                    <Link to="/seo/">
                      Unikorn SEO
                    </Link>
                  : <Link to="/sv/seo/">
                      Unikorn SEO
                    </Link>
                  }
                  <ChevronDownIcon />
                  <ul className={Styles.submenu}>
                    {marketingMenuItems}
                  </ul>
                </li>
                <li className={Styles.has_submenu + " " + ( location.includes("/web-analytics") || location.includes("/webbanalys") ? Styles.active : "")}>
                  {prefix === '/' ?
                    <Link to="/web-analytics/">
                      Data Magic
                    </Link>
                  : <Link to="/sv/webbanalys/">
                      Data Magic
                    </Link>
                  }
                  <ChevronDownIcon />
                  <ul className={Styles.submenu}>
                    {webMenuItems}
                  </ul>
                </li>
                <li className={location === "/blog" || location === "/blogg" ? Styles.active : ""}>
                  {prefix === '/' ?
                    <Link to="/blog/">
                      Blog
                    </Link>
                  : <Link to="/sv/blogg/">
                      Blogg
                    </Link>
                  }
                </li>
                <li className={Styles.has_submenu + " " + ( location.includes("/about") || location.includes("/om-unikorn") ? Styles.active : "")}>
                  {prefix === '/' ?
                    <Link to="/about/">
                      About Unikorn
                    </Link>
                  : <Link to="/sv/om-unikorn/">
                      Om Unikorn
                    </Link>
                  }
                  <ChevronDownIcon />
                  <ul className={Styles.submenu}>
                    {aboutMenuItems}
                    <li className={location.includes("/unikorns") || location.includes("/unikorns") ? Styles.active : ""}>
                    {prefix === '/' ?
                      <Link to={"/unikorns/"}>We are Unikorns</Link>
                    : <Link to={"/sv/unikorns/"}>Vi är Unikorns</Link>
                    }
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          {prefix === '/' ?
            <Link to={"/contact/"}>
              <div id="nav-cta" className={Styles.nav_cta + " " + ( location.includes("/contact") ? Styles.active : "")} role="button" tabIndex="0">
                <span>Get in touch now</span>
              </div>
            </Link>
          : <Link to={"/sv/kontakt/"}>
              <div id="nav-cta" className={Styles.nav_cta + " " + ( location.includes("/kontakt") ? Styles.active : "")} role="button" tabIndex="0">
                <span>Kom i kontakt nu</span>
              </div>
            </Link>
          }

          <ul className={Styles.navigation_links + ' ' + Styles.language}>
            <li className={Styles.has_submenu}>
              <p>
                <img
                  src={`https://flagcdn.com/h20/${currentFlag}.png`}
                  srcSet={`https://flagcdn.com/h40/${currentFlag}.png 2x,
                    https://flagcdn.com/h60/${currentFlag}.png 3x`}
                  height="20"
                  alt={currentLang}
                />
                {currentLang}
              </p>
              <ChevronDownIcon />
              <ul className={Styles.submenu}>
                <li>
                  <Link to={otherUrl}>
                    <img
                      src={`https://flagcdn.com/h20/${otherFlag}.png`}
                      srcSet={`https://flagcdn.com/h40/${otherFlag}.png 2x,
                        https://flagcdn.com/h60/${otherFlag}.png 3x`}
                      height="20"
                      alt={otherLang}
                    />
                    {otherLang}
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

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
      </div>
    )
  }
}

export default Nav