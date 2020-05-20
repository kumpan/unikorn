import React, { Component }  from "react"
import { Link } from "gatsby"
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock"

class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = { showMenu: false }
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
      <nav>
        <div>
          <Link to="/" aria-label="Home">
           Hem
          </Link>
          <div
            onClick={this.toggleMenu}
            onKeyPress={this.toggleMenu}
            role="button"
            tabIndex="0"
            aria-label="Toggle Menu"
          >
            <div>
              <span/>
              <span/>
            </div>
          </div>
          <ul>
            <li className={ this.props.location === "/web-and-seo" ? "active" : ""}>
              <Link to="/web-and-seo">
                Web & SEO
              </Link>
            </li>
            <li className={this.props.location === "/marketing" ? "active" : ""}>
              <Link to="/marketing">
                Marketing
              </Link>
              <ul className="submenu">
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
            <li
              className={
                this.props.location === "/our-approach" ? "active" : ""
              }>
              <Link to="/our-approach">
                Our Approach
              </Link>
            </li>
            <li
              className={
                this.props.location === "/blog" ? "active" : ""
              }>
              <Link to="/blog">
                Blog
              </Link>
            </li>
            <li
              className={
                this.props.location === "/about" ? "active" : ""
              }>
              <Link to="/about">
                About us
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Nav