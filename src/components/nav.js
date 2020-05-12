import React from "react"
import { Link } from "gatsby"

class Nav extends React.Component {
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
            className={
              styles.hamburger +
              " " +
              (this.state.showMenu ? styles.opened : "")
            }
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
          <ul className={this.state.showMenu ? styles.opened : ""}>
            <li>
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