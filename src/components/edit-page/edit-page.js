import React from "react";
import "./styles.css";
import closeIcon from "../../icons/closeIcon.png";
export default function EditPage(props) {
  const { data, notAllowedUpdates } = props;
  console.log("data isss");
  console.log(data);
  console.log(notAllowedUpdates);
  return (
    <div className="edit-modal">
      <div className="edit-modal__box">
        <div className="close-button" onClick={() => props.closeModal()}>
          <img src={closeIcon} />
        </div>
      </div>
    </div>
  );
}
