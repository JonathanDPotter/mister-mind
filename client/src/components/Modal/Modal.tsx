import React, { FC } from "react";
import "./Modal.scss";

interface Iprops {
  message: string;
  buttonMessage: string;
  closeModal: () => void;
}

const Modal: FC<Iprops> = ({ message, buttonMessage, closeModal }) => {
  return (
    <div className="modal-back">
      <div className="modal-fore">
        <h1>{message}</h1>
        <button onClick={closeModal}>{buttonMessage}</button>
      </div>
    </div>
  );
};

export default Modal;
