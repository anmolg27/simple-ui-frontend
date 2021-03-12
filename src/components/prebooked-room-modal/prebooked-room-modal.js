import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./styles.css";
import {
  editReservation,
  deleteReservation,
  editCustomerReservation,
} from "../../redux/actions/customerAction";
import {
  isDateABeforeDateB,
  isDateABetweenDateBAndDateC,
  returnCurrentDateAndTime,
} from "../../utils/functions";
import DeleteModal from "../delete-modal/delete-modal";
import closeIcon from "../../icons/closeIcon.png";
export default function PrebookedRoomModal(props) {
  const dispatch = useDispatch();
  const { customers, editLoading } = useSelector((state) => state.customers);
  const { rooms } = useSelector((state) => state.rooms);
  const [availableRooms, setAvailableRooms] = useState([]);
  const { room, setShowModal } = props;
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [checkIn, setCheckIn] = useState(room.checkIn);
  const [checkOut, setCheckOut] = useState(room.checkOut);
  const [roomType, setRoomType] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showCustomerPopup, setShowCustomerPopup] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  useEffect(() => {
    if (selectedReservation && rooms.length > 0) {
      setRoomType(
        rooms.find(
          (room) =>
            parseInt(room.roomNumber) ===
            parseInt(selectedReservation.roomNumber)
        ).roomType
      );
      setRoomNumber(selectedReservation.roomNumber);
    }
  }, [selectedReservation, rooms]);
  useEffect(() => {
    if (customers.length > 0) {
      setSelectedReservation(
        customers
          .find((customer) => customer._id === room.customerId)
          .reservations.find(
            (reservation) => reservation._id === room.reservationId
          )
      );
    }
  }, [customers]);
  const handleDelete = () => {
    let fieldsObject = {
      reservationData: selectedReservation,
      mobileNumber: room.mobileNumber,
      customerId: room.customerId,
    };
    dispatch(deleteReservation(fieldsObject, setShowModal));
  };
  const handleCustomerSave = () => {
    let customerName = document.getElementById("customerName").value;
    let mobileNumber = document.getElementById("mobileNumber").value;
    let comingFrom = document.getElementById("comingFrom").value;
    let goingTo = document.getElementById("goingTo").value;
    if (!customerName || !mobileNumber || !comingFrom || !goingTo)
      return alert("Please fill all fields");
    let fieldsObject = {
      customerName,
      mobileNumber,
      comingFrom,
      goingTo,
      customerId: room.customerId,
    };

    dispatch(editCustomerReservation(fieldsObject, setShowCustomerPopup));
  };
  const handleSave = () => {
    let checkOutValue = document.getElementById("check-out").value;
    let checkInValue = document.getElementById("check-in").value;
    let roomNumberValue = document.getElementById("room-number").value;
    if (isDateABeforeDateB(checkOutValue, checkInValue))
      return alert("Entered Dates are invalid");
    let fieldsObject = {
      previousReservation: selectedReservation,
      checkIn: checkInValue,
      roomNumber: roomNumberValue,
      checkOut: checkOutValue,
      mobileNumber: room.mobileNumber,
      customerName: room.customerName,
      customerId: room.customerId,
    };
    dispatch(editReservation(fieldsObject, setShowPopup));
  };
  const renderCustomerPopup = (selectedReservation) => (
    <div className="popup">
      <div className="popup__box">
        <div className="prebooked-modal__edit-popup">
          <div>
            <label className="mr-3" htmlFor="customerName">
              Customer Name
            </label>
            <input
              id="customerName"
              type="text"
              defaultValue={room.customerName}
              // onChange={(e) => setCheckIn(e.target.value)}
            />
            <label className="mr-3" htmlFor="mobileNumber">
              Mobile No.
            </label>
            <input
              id="mobileNumber"
              type="number"
              defaultValue={room.mobileNumber}
              // onChange={(e) => setCheckOut(e.target.value)}
            />
            <label className="mr-3" htmlFor="comingFrom">
              Coming From
            </label>
            <input
              id="comingFrom"
              type="text"
              defaultValue={selectedReservation.comingFrom}
            />
            <label className="mr-3" htmlFor="goingTo">
              Going To
            </label>
            <input
              id="goingTo"
              type="text"
              defaultValue={selectedReservation.goingTo}
              // onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>

          <div className="popup__buttons">
            <button
              onClick={handleCustomerSave}
              disabled={editLoading}
              className="popup__resolve-button"
            >
              {editLoading ? (
                <div className="spinner-border text-success" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Save"
              )}
            </button>
            <button
              className="popup__reject-button"
              onClick={() => setShowCustomerPopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  const renderPopup = (availableRooms) => (
    <div className="popup">
      <div className="popup__box">
        <div className="prebooked-modal__edit-popup">
          <div>
            <label className="mr-3" htmlFor="check-in">
              CheckIn Date
            </label>
            <input
              id="check-in"
              type="datetime-local"
              defaultValue={room.checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
            <label className="mr-3" htmlFor="check-out">
              CheckOut Date
            </label>
            <input
              id="check-out"
              type="datetime-local"
              defaultValue={room.checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div>
            <label className="mr-3" htmlFor="room-type">
              Room Type
            </label>
            <select
              value={roomType}
              id="room-type"
              onChange={(e) => setRoomType(e.target.value)}
            >
              {availableRooms
                .filter((room) => !room.isOutOfService)
                .map((room) => room.roomType)
                .reduce((a, c) => {
                  if (!a.includes(c)) a.push(c);
                  return a;
                }, [])
                .map((roomType) => (
                  <option key={roomType} value={roomType}>
                    {roomType}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="mr-3" htmlFor="room-number">
              Room No.
            </label>
            <select
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              id="room-number"
            >
              {availableRooms
                .filter((room) => room.roomType === roomType)
                .map((room) => (
                  <option key={room.roomNumber} value={room.roomNumber}>
                    {room.roomNumber}
                  </option>
                ))}
            </select>
          </div>

          <div className="popup__buttons">
            <button
              onClick={handleSave}
              disabled={editLoading}
              className="popup__resolve-button"
            >
              {editLoading ? (
                <div className="spinner-border text-success" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Save"
              )}
            </button>
            <button
              className="popup__reject-button"
              onClick={() => setShowPopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  const handleEditClick = () => {
    setShowPopup(true);
  };
  const handleCustomerEditClick = () => {
    setShowCustomerPopup(true);
  };
  useEffect(() => {
    if (rooms.length > 0 && room && selectedReservation) {
      setAvailableRooms(
        rooms.filter((proom) => {
          if (
            proom.isOccupied &&
            isDateABetweenDateBAndDateC(
              returnCurrentDateAndTime(),
              checkIn,
              checkOut
            )
          ) {
            return false;
          } else if (proom.reservations && proom.reservations.length > 0) {
            let isError = false;
            let tempReservations = proom.reservations;
            if (
              parseInt(proom.roomNumber) ===
              parseInt(selectedReservation.roomNumber)
            )
              tempReservations = proom.reservations.filter((reservation) => {
                if (
                  reservation.reservedFrom === room.checkIn &&
                  reservation.reservedTo === room.checkOut
                ) {
                  return false;
                }
                return true;
              });

            tempReservations.forEach((reservation) => {
              if (isDateABeforeDateB(checkIn, reservation.reservedFrom)) {
                if (
                  isDateABetweenDateBAndDateC(
                    checkOut,
                    reservation.reservedFrom,
                    reservation.reservedTo
                  )
                ) {
                  isError = true;
                } else if (
                  isDateABeforeDateB(reservation.reservedFrom, checkOut)
                ) {
                  isError = true;
                }
              } else if (
                isDateABetweenDateBAndDateC(
                  checkIn,
                  reservation.reservedFrom,
                  reservation.reservedTo
                )
              ) {
                isError = true;
              }
            });
            if (isError) return false;
          }
          return true;
        })
      );
    }
  }, [selectedReservation, room, checkIn, checkOut, selectedReservation]);
  // useEffect(() => {
  //   document.querySelector(".popup").addEventListener("click", (event) => {
  //     if (event.target.className === "popup") {
  //       setShowPopup(false);
  //       setShowCustomerPopup(false);
  //     }
  //   });
  // }, []);
  return (
    <div className="prebooked-modal">
      {showDelete && (
        <DeleteModal
          name={`this reservation of ${room.customerName} for room ${selectedReservation.roomNumber}`}
          resolveHandler={handleDelete}
          rejectHandler={() => setShowDelete(false)}
        />
      )}
      {showPopup && selectedReservation && renderPopup(availableRooms)}
      {showCustomerPopup &&
        selectedReservation &&
        renderCustomerPopup(selectedReservation)}
      <div className="prebooked-modal__box">
        <div className="close-button" onClick={() => setShowModal(false)}>
          <img src={closeIcon} alt="close icon" />
        </div>
        <div className="prebooked-modal__row row mx-0 px-0">
          <div className="col-4">
            <h3>Name:</h3>
            <p>{room.customerName}</p>
          </div>
          <div className="col-4">
            <h3>Room:</h3>
            <p>{selectedReservation && selectedReservation.roomNumber}</p>
          </div>
          <div className="col-4">
            <h3>Mobile:</h3>
            <p>{room.mobileNumber}</p>
          </div>
          <div className="col-6">
            <h3>Check In</h3>
            <p>{room.checkIn.replace("T", " at ")}</p>
          </div>
          <div className="col-6">
            <h3>Check Out</h3>
            <p>{room.checkOut.replace("T", " at ")}</p>
          </div>
        </div>
        <div className="prebooked-modal__buttons">
          <button
            className="prebooked-modal__edit-button"
            onClick={() => handleEditClick(rooms, availableRooms)}
          >
            Edit Rooms
          </button>
          <button
            className="prebooked-modal__edit-customer-button ml-2"
            onClick={() => handleCustomerEditClick(rooms, availableRooms)}
          >
            Edit Customer
          </button>
          <button
            onClick={handleDelete}
            className="prebooked-modal__delete-button"
            onClick={() => setShowDelete(true)}
          >
            Delete this reservation
          </button>
        </div>
      </div>
    </div>
  );
}
