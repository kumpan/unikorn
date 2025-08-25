import React from "react"
import { Link } from "gatsby"

import ContactInfo from "../components/contact/contactinfo.js"

import ChevronDownIcon from "../../content/assets/icons/chevron-down.svg"

import Styles from "./footer.module.css"

const toggleMenu = function(e) {
  const el = document.getElementById("language")

  if (el.classList.contains(Styles.active)) {
    el.classList.remove(Styles.active)
  } else {
    el.classList.add(Styles.active)
  }
}

const Footer = (props) => {
  return (
    <div className={"footer " + Styles.footer}>
      {props.show_contact_info &&
        <ContactInfo />
      }
      <div className={Styles.footer_wrapper}>
        <div className="container">
          <div id={"language"} className={Styles.languages} onClick={toggleMenu} onKeyDown={toggleMenu} role="presentation">
            <ul className={Styles.languages_menu}>
              <li>
                <p>
                  <img
                    src={`https://flagcdn.com/h20/se.png`}
                    srcSet={`https://flagcdn.com/h40/se.png 2x,
                      https://flagcdn.com/h60/se.png 3x`}
                    height="20"
                    alt={'Swedish'}
                  />
                  Svenska
                </p>
                <ChevronDownIcon />
              </li>
              <li className={Styles.languages_submenu + ' ' + Styles.current}>
                <p>
                  <img
                    src={`https://flagcdn.com/h20/se.png`}
                    srcSet={`https://flagcdn.com/h40/se.png 2x,
                      https://flagcdn.com/h60/se.png 3x`}
                    height="20"
                    alt={'Swedish'}
                  />
                  Svenska
                </p>
              </li>
              <li className={Styles.languages_submenu}>
                <Link to={'/'}>
                  <img
                    src={`https://flagcdn.com/h20/gb.png`}
                    srcSet={`https://flagcdn.com/h40/gb.png 2x,
                      https://flagcdn.com/h60/gb.png 3x`}
                    height="20"
                    alt={'English'}
                  />
                  English
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer