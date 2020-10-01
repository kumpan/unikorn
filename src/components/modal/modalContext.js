import React from "react";
import useModal from "./useModal";
import Modal from "./modal";

let ModalContext;
let { Provider } = (ModalContext = React.createContext());

let ModalProvider = ({ children }) => {
  let { modal, handleModal, modalContent } = useModal();
  
  if(modal === true) {
    document.getElementsByTagName( "html" )[0].classList.add("no-scroll")
  } else {
    document.getElementsByTagName( "html" )[0].classList.remove("no-scroll")
  }

  return (
    <Provider value={{ modal, handleModal, modalContent }}>
      <Modal />
      {children}
    </Provider>
  );
};

export { ModalContext, ModalProvider };