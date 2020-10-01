import React from "react";
import ReactDOM from "react-dom";
import { ModalContext } from "./modalContext";

import CloseIcon from "../../../content/assets/icons/close.svg"
import Styles from "./modal.module.css"
import ContactPopup from "../contact/contactpopup.js"

const Modal = () => {
  let { modalContent, handleModal, modal } = React.useContext(ModalContext);
  if (modal) {
    return ReactDOM.createPortal(
      <div
        className="fixed top-0 left-0 h-screen w-full flex items-center justify-center"
        style={{ background: "rgba(0,0,0,0.8)" }}
      >
        <div className="bg-white relative p-5 shadow-lg rounded flex flex-col items-start text-lg text-gray-800">
          <div className={Styles.closePopup}
            onClick={() => handleModal()}
          >
            <CloseIcon />
          </div>
          <ContactPopup/>
        </div>
      </div>,
      document.querySelector("#modal-root")
    );
  } else return null;
};

export default Modal;