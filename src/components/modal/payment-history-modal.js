import React from "react";
import "./styles.css";
import closeIcon from "../../icons/closeIcon.png";
export default function PaymentHistoryModal(props) {
  return (
    <div className="modal-container">
      <div className="modal-box">
        <div className="close-button" onClick={() => props.closeModal()}>
          <img src={closeIcon} />
        </div>
        {props.children}
        {/* {renderFields()} */}
        {/* <button onClick={() => handleSave()} className="save-btn">
          Save
        </button> */}
      </div>
    </div>
  );
}
