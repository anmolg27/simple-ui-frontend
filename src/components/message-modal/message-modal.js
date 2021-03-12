import React from "react";
import closeIcon from "../../icons/closeIcon.png";
import uniqid from "uniqid";
import "./styles.css";
export default function MessageModal(props) {
  const { message, reservations, setShowMessageModal, buttonText } = props;
  return (
    <div className="message-modal">
      <div className="message-modal__box">
        <p className="message-modal__text">{message}</p>
        {reservations && reservations.length > 0 && (
          <div className="message-modal__reservations row mx-0">
            <div className="message-modal__reservations-header col-12 px-0 mx-0 row">
              <div className="col-6 pl-0 pr-2">
                <h2>From</h2>
              </div>
              <div className="col-6 pr-0 pl-2">
                <h2>Upto</h2>
              </div>
            </div>
            <div className="message-modal__reservations-detail-box row mx-0 px-0 col-12">
              {reservations.map((reservation) => (
                <div
                  className="row mx-0 col-12 px-0"
                  key={uniqid("reservation")}
                >
                  <div className="col-6">
                    <p>{reservation.reservedFrom.replace("T", " at ")}</p>
                  </div>
                  <div className="col-6">
                    <p>{reservation.reservedTo.replace("T", " at ")}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="message-modal__buttons">
          <button
            onClick={() => {
              setShowMessageModal(false);
              //   dispatch(deleteOperator({ email: selectedOperator.email }));
            }}
          >
            {buttonText ? buttonText : "Okay"}
          </button>
          {/* <button
                onClick={() => {
                  setDeleteShow(false);
                }}
              >
                No
              </button> */}
        </div>
      </div>
    </div>
  );
}
