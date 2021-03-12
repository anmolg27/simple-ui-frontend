import React, { useEffect } from "react";
import "./styles.css";
import closeIcon from "../../icons/closeIcon.png";
export default function GuestDetails(props) {
  const { setShowModal, customer } = props;
  useEffect(() => {
    document
      .querySelector(".guest-details__modal")
      .addEventListener("click", (event) => {
        if (event.target.className === "guest-details__modal") {
          setShowModal(false);
        }
      });
  }, []);
  return (
    <div className="guest-details__modal">
      <div className="guest-details__modal-box">
        <div className="close-button" onClick={() => setShowModal(false)}>
          <img src={closeIcon} alt="close icon" />
        </div>
        <div className="guest-details__box">
          <div className="guest-details__name-mobile">
            <div>
              <h2>Name</h2>
              <p>{customer.customerName}</p>
            </div>
            <div>
              <h2>Mobile</h2>
              <p>{customer.mobileNumber}</p>
            </div>
            <div>
              <h2>Age</h2>
              <p>{customer.extraDetails.age}</p>
            </div>
          </div>
          <div className="guest-details__extra-details px-0 row mx-0">
            <div className="col-4 px-2">
              <h3>Address</h3>
              <p>{customer.extraDetails.address}</p>
            </div>
            <div className="col-4 px-2">
              <h3>Coming From</h3>
              <p>{customer.extraDetails.comingFrom}</p>
            </div>
            <div className="col-4 px-2">
              <h3>Going To</h3>
              <p>{customer.extraDetails.goingTo}</p>
            </div>

            <div className="col-4 px-2">
              <h3>Nationality</h3>
              <p>{customer.extraDetails.nationality}</p>
            </div>
            <div className="col-4 px-2">
              <h3>{customer.extraDetails.idType} No.</h3>
              <p>{customer.extraDetails.idNumber}</p>
            </div>
            <div className="col-4 px-2">
              <h3>Males</h3>
              <p>{customer.extraDetails.numberOfMale}</p>
            </div>
            <div className="col-4 px-2">
              <h3>Females</h3>
              <p>{customer.extraDetails.numberOfFemale}</p>
            </div>

            <div className="col-4 px-2">
              <h3>Kids</h3>
              <p>{customer.extraDetails.numberOfKids}</p>
            </div>
            {customer.extraDetails.vehicleNumber && (
              <div className="col-4 px-2">
                <h3>Vehicle No.</h3>
                <p>{customer.extraDetails.vehicleNumber}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
