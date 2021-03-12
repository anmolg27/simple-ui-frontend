import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./styles.css";
import closeIcon from "../../icons/closeIcon.png";
import { calculateAmount } from "../../utils/functions";
export default function ShowBill(props) {
  const { setShowModal, customer } = props;
  const { rooms } = useSelector((state) => state.rooms);
  const [occupiedRooms, setOccupiedRooms] = useState([]);
  useEffect(() => {
    const roomNumbers = customer.rooms.map((room) => parseInt(room.roomNumber));
    if (rooms.length > 0 && customer && customer.rooms.length > 0) {
      setOccupiedRooms(
        rooms.filter((room) => roomNumbers.includes(parseInt(room.roomNumber)))
      );
    }
  }, [rooms, customer]);
  useEffect(() => {
    document
      .querySelector(".show-bill-modal")
      .addEventListener("click", (event) => {
        if (event.target.className === "show-bill-modal") {
          setShowModal(false);
        }
      });
  }, []);
  return (
    <div className="show-bill-modal">
      <div className="show-bill-modal__box">
        <div className="close-button" onClick={() => setShowModal(false)}>
          <img src={closeIcon} alt="close icon" />
        </div>
        <div className="show-bill-modal__room-bill mt-3">
          <h2>Room Bill</h2>
          <div className="show-bill-modal__room-bill-box row mx-0 mt-3">
            <div className="show-bill-modal__room-bill-box-header col-12 row mx-0 px-0">
              <h3 className="col-1 px-2">Room</h3>
              <h3 className="col-4 px-2">Check In</h3>
              <h3 className="col-4 px-2">Check Out</h3>
              <h3 className="col-1 px-2">Rate</h3>
              <h3 className="col-2 px-2">Amount</h3>
            </div>
            <div className="show-bill-modal__room-bill-content col-12 row mx-0 px-0">
              {occupiedRooms.map((room) => (
                <div
                  key={room.roomNumber}
                  className="show-bill-modal__room-bill-content-row col-12 row mx-0 px-0"
                >
                  <p className="col-1 px-2">{room.roomNumber}</p>
                  <p className="col-4 px-2">
                    {room.occupiedBy.checkIn.replace("T", "/")}
                  </p>
                  <p className="col-4 px-2">
                    {room.occupiedBy.checkOut.replace("T", "/")}
                  </p>
                  <p className="col-1 px-2">{room.chargePerDay}</p>
                  <p className="col-2 px-2">
                    {calculateAmount(
                      room.chargePerDay,
                      room.occupiedBy.checkIn,
                      room.occupiedBy.checkOut
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <h3>
            Total:{" "}
            {occupiedRooms.reduce((a, b) => {
              a += calculateAmount(
                b.chargePerDay,
                b.occupiedBy.checkIn,
                b.occupiedBy.checkOut
              );
              return a;
            }, 0)}
            &#8377;
          </h3>
        </div>
        <div className="show-bill-modal__room-bill mt-3">
          <h2>Extra Charges</h2>
          <div className="show-bill-modal__room-bill-box row mx-0 mt-3">
            <div className="show-bill-modal__room-bill-box-header col-12 row mx-0 px-0">
              <h3 className="col-3 px-2">Asset</h3>
              <h3 className="col-3 px-2">Qty</h3>
              <h3 className="col-3 px-2">Rate</h3>
              <h3 className="col-3 px-2">Amount</h3>
            </div>
            <div className="show-bill-modal__room-bill-content col-12 row mx-0 px-0">
              {customer.extraCharges.map((asset) => (
                <div
                  key={asset.assetName}
                  className="show-bill-modal__room-bill-content-row col-12 row mx-0 px-0"
                >
                  <p className="col-3 px-2">{asset.assetName}</p>
                  <p className="col-3 px-2">{asset.quantity}</p>
                  <p className="col-3 px-2">{asset.charge}</p>
                  <p className="col-3 px-2">{asset.amount}</p>
                </div>
              ))}
            </div>
          </div>
          <h3>
            Total:{" "}
            {customer.extraCharges.reduce((a, b) => {
              a += parseFloat(b.amount);

              return a;
            }, 0)}
            &#8377;
          </h3>
        </div>
      </div>
    </div>
  );
}
