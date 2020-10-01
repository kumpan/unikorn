import React, { Component }  from "react"
import { Link } from "gatsby"
import ArrowRightIcon from "../../../content/assets/icons/arrow-forward.svg"

import Styles from "./secondary.module.css"


import { ModalProvider, ModalContext } from "../modal/modalContext";

const ContactModal = (props) => {
  let { handleModal } = React.useContext(ModalContext);

  return (
    <div className={Styles.secondary_modal_btn + " secondary_modal_btn"} role="button" tabIndex="0" onClick={() => handleModal()} onKeyPress={() => handleModal()}>
      <span>{props.name}</span>
    </div>
  );
};

class SecondaryButton extends Component {
  render() {
    const { text, mobileBtn, link, arrow } = this.props

    return (
      <div className={Styles.secondary_btn + " secondary-btn " + (arrow ? Styles.arrow : "")}>
        {link && link.includes("contact") ? (
        <ModalProvider>
          <ContactModal name={text}></ContactModal>
        </ModalProvider>
        ) :
        link && !link.includes("mailto" || "call") && text && mobileBtn ? (
          <Link to={link}>
            <span className={Styles.large_btn_text}>{text}</span>
            {mobileBtn &&
              <span className={Styles.small_btn_text}>{mobileBtn}</span>
            }
            {arrow &&
              <ArrowRightIcon />
            }
          </Link>
        ) : link && !link.includes("mailto" || "call") ? (
          <Link to={link}>
            {text}
            {arrow &&
              <ArrowRightIcon />
            }
          </Link>
        ) : link && link.includes("mailto" || "call") ? (
          <a href={link}>
            {text}
            {arrow &&
              <ArrowRightIcon />
            }
          </a>
        ) : (
            <div>
              {text}
              {arrow &&
                <ArrowRightIcon />
              }
            </div>
        )}
      </div>
    )
  }
}

export default SecondaryButton