import React, { useEffect } from "react";
import "./styles.css";
export default function DeleteModal(props) {
  const { resolveHandler, rejectHandler, name } = props;
  useEffect(() => {
    document
      .querySelector(".delete-operator-modal")
      .addEventListener("click", (event) => {
        if (event.target.className === "delete-operator-modal") {
          rejectHandler();
        }
      });
  }, []);
  return (
    <div className="delete-operator-modal">
      <div className="delete-operator-modal__box">
        <p className="delete-operator-modal__text">
          Are you sure You want to delete {name}?
        </p>
        <div className="delete-operator-modal__buttons">
          <button onClick={() => resolveHandler()}>Yes</button>
          <button onClick={() => rejectHandler()}>No</button>
        </div>
      </div>
    </div>
  );
}
