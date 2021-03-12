import React from "react";
import "./styles.css";
import closeIcon from "../../icons/closeIcon.png";
export default function CreateOperator(props) {
  return (
    <div className="create-operator-modal">
      <div className="create-operator-modal__box">
        <div className="close-button" onClick={() => props.closeModal()}>
          <img src={closeIcon} alt="close icon" />
        </div>
      </div>
    </div>
  );
}
