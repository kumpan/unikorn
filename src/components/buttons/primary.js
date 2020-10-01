import React, { Component }  from "react"
import { Link } from "gatsby"

import Styles from "./primary.module.css"

import { ModalProvider, ModalContext } from "../modal/modalContext";

const ModalButton = (props) => {
  let { handleModal } = React.useContext(ModalContext);

  return (
    <div className={Styles.primary_btn} onClick={() => handleModal()}>
      <span>{props.name}</span>
    </div>
  );
};

class PrimaryButton extends Component {
  render() {
    const { text, link } = this.props

    return (
      <div className={Styles.primary_btn}>
        {link && link.includes("contact") ? (
        <ModalProvider>
          <ModalButton name={text}></ModalButton>
        </ModalProvider>
        ) :
        link && !link.includes("mailto" || "call") ? (
          <Link to={link}>
            {text}
          </Link>
        ) : link && link.includes("mailto" || "call") ? (
          <a href={link}>
            {text}
          </a>
        ) : (
            <div>
              {text}
            </div>
        )}
      </div>
    )
  }
}

export default PrimaryButton