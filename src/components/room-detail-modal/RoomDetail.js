import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  returnCurrentDateAndTime,
  isDateABetweenDateBAndDateC,
  isDateABeforeDateB,
  returnTimestamp,
} from "../../utils/functions";
import history from "../../utils/history";
import "./styles.css";
import closeIcon from "../../icons/closeIcon.png";
import EditAddOn from "../edit-add-on/editAddOn";
import RoomForm from "../customer-form/customer-form";
import AddOn from "../add-on/add-on";
import GuestDetails from "../guest-details-modal/guest-details";
import PreBookedRoomModal from "../prebooked-room-modal/prebooked-room-modal";
import ShowBill from "../show-bill-modal/show-bill";
import EditCustomerModal from "../edit-customer-modal/edit-customer-modal";
export default function RoomDetail(props) {
  const { rooms } = useSelector((state) => state.rooms);
  const { credentials } = useSelector((state) => state.user);
  const { customers } = useSelector((state) => state.customers);
  const [room, setRoom] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [showBill, setShowBill] = useState(false);
  const { selectedRoom, setShowModal } = props;
  const [showRoomForm, setShowRoomForm] = useState(false);
  const [showCustomerEdit, setShowCustomerEdit] = useState(false);
  const [showEditAddOn, setShowEditAddOn] = useState(false);
  const [showAddOn, setShowAddOn] = useState(false);
  const [showPrebookedRoomModal, setShowPrebookedRoomModal] = useState(false);
  const [showGuestDetails, setShowGuestDetails] = useState(false);
  const [reservedCustomers, setReservedCustomers] = useState([]);
  const [selectedRoomForAddOn, setSelectedRoomForAddOn] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState({});

  useEffect(() => {
    if (rooms.length > 0) {
      setRoom(rooms.find((room) => parseInt(room.roomNumber) === selectedRoom));
    }
  }, [rooms, selectedRoom]);
  useEffect(() => {
    if (room && room.isOccupied && customers.length > 0) {
      setCustomer(
        customers.find(
          (customer) =>
            parseInt(customer.mobileNumber) ===
            parseInt(room.occupiedBy.mobileNumber)
        )
      );
    }
    if (customers.length > 0 && room && room.isReserved) {
      let tempReservations = [];
      customers.forEach((customer) => {
        if (
          customer.reservations &&
          customer.reservations.length > 0 &&
          customer.reservations
            .map((cst) => parseInt(cst.roomNumber))
            .includes(parseInt(room.roomNumber))
        ) {
          let cReservations = customer.reservations.filter(
            (res) => parseInt(res.roomNumber) === parseInt(room.roomNumber)
          );
          cReservations.forEach((cRes) => {
            tempReservations.push({
              customerName: customer.customerName,
              mobileNumber: customer.mobileNumber,
              customerId: customer._id,
              ...cRes,
            });
          });
        }
      });

      setReservedCustomers(tempReservations);
    }
  }, [room, customers]);

  const returnStatus = (room) => {
    if (room.isOutOfService) return "Out Of Service";
    else if (room.isOccupied) return "Currently Occupied";
    else if (room.isReserved) {
      if (
        room.reservations.every(
          (rRoom) =>
            !isDateABetweenDateBAndDateC(
              returnCurrentDateAndTime(),
              rRoom.reservedFrom,
              rRoom.reservedTo
            )
        )
      )
        return "Available";
      else return "Reserved";
    } else return "Available";
  };
  const handleAddOnClick = (room) => {
    let customer = customers.find((customer) => {
      if (
        customer.customerName === room.occupiedBy.customerName &&
        parseInt(customer.mobileNumber) ===
          parseInt(room.occupiedBy.mobileNumber)
      ) {
        if (
          customer.rooms &&
          customer.rooms.length > 0 &&
          customer.rooms
            .map((rm) => parseInt(rm.roomNumber))
            .includes(parseInt(room.roomNumber))
        ) {
          return true;
        }
      }
      return false;
    });
    setSelectedRoomForAddOn({
      customerName: room.occupiedBy.customerName,
      mobileNumber: room.occupiedBy.mobileNumber,
      roomNumber: room.roomNumber,
      customerId: customer._id,
    });
    setShowAddOn(true);
  };
  const handleCheckOutClick = (room) => {
    let customer = customers.find((customer) => {
      if (
        customer.customerName === room.occupiedBy.customerName &&
        parseInt(customer.mobileNumber) ===
          parseInt(room.occupiedBy.mobileNumber)
      ) {
        if (
          customer.rooms &&
          customer.rooms.length > 0 &&
          customer.rooms
            .map((rm) => parseInt(rm.roomNumber))
            .includes(parseInt(room.roomNumber))
        ) {
          return true;
        }
      }
      return false;
    });
    history.push(`/home/checkOut/${customer._id}`);
  };
  useEffect(() => {
    document
      .querySelector(".room-detail__modal")
      .addEventListener("click", (event) => {
        if (event.target.className === "room-detail__modal") {
          setShowModal(false);
        }
      });
  }, []);
  return (
    <div className="room-detail__modal">
      {showCustomerEdit && (
        <EditCustomerModal
          customer={customer}
          setShowModal={setShowCustomerEdit}
        />
      )}
      {showEditAddOn && (
        <EditAddOn customer={customer} setShowModal={setShowEditAddOn} />
      )}
      {showBill && <ShowBill customer={customer} setShowModal={setShowBill} />}
      {showGuestDetails && (
        <GuestDetails setShowModal={setShowGuestDetails} customer={customer} />
      )}
      {showRoomForm && (
        <RoomForm
          selectedRoom={selectedRoom}
          closeRoomForm={() => setShowRoomForm(false)}
          roomAction="edit"
        />
      )}
      {showAddOn && (
        <AddOn
          closeModal={() => setShowAddOn(false)}
          selectedRoom={selectedRoomForAddOn}
        />
      )}
      {showPrebookedRoomModal && (
        <PreBookedRoomModal
          room={selectedCustomer}
          setShowModal={setShowPrebookedRoomModal}
        />
      )}
      <div className="room-detail__modal-box">
        <div className="close-button" onClick={() => setShowModal(false)}>
          <img src={closeIcon} alt="close icon" />
        </div>
        {room && (
          <>
            <h1>Room {room.roomNumber}</h1>
            <div className="room-detail__modal-status-edit-box">
              <h2 className="room-detail__modal-status">
                STATUS: {returnStatus(room)}
              </h2>
              {credentials && credentials.authorization === "owner" && (
                <button
                  onClick={() => setShowRoomForm(true)}
                  className="room-detail__modal-edit-button"
                >
                  Edit Room
                </button>
              )}
            </div>
            {room.isOccupied && (
              <div className="room-detail__modal-current-guest-box">
                <h2 className="room-detail__modal-current-guest">
                  Current Guest
                </h2>
                <div className="room-detail__modal-current-guest-details row mx-0">
                  <div className="col-6">
                    <h2>Name</h2>
                    <p>{room.occupiedBy.customerName}</p>
                  </div>
                  <div className="col-6">
                    <h2>Mobile</h2>
                    <p>{room.occupiedBy.mobileNumber}</p>
                  </div>
                  <div className="col-6">
                    <h2>Check In</h2>
                    <p>{room.occupiedBy.checkIn.replace("T", "/")}</p>
                  </div>
                  <div className="col-6">
                    <h2>Check Out</h2>
                    <p>{room.occupiedBy.checkOut.replace("T", "/")}</p>
                  </div>
                </div>
                <div className="room-detail__modal-buttons">
                  <button
                    onClick={() => setShowGuestDetails(true)}
                    className="show-details-button"
                  >
                    Show Guest Details
                  </button>
                  <button
                    onClick={() => setShowBill(true)}
                    className="show-bill-button"
                  >
                    Show Bill
                  </button>
                  <button
                    onClick={() => setShowCustomerEdit(true)}
                    className="edit-checkin-button"
                  >
                    Edit Details
                  </button>
                  <button
                    onClick={() => setShowEditAddOn(true)}
                    className="edit-checkin-button"
                  >
                    Edit Extra Charges
                  </button>

                  <button
                    onClick={() => handleCheckOutClick(room)}
                    className="check-out-button"
                  >
                    Check Out
                  </button>
                  <button
                    onClick={() => handleAddOnClick(room)}
                    className="add-on-button"
                  >
                    Add On
                  </button>
                </div>
              </div>
            )}
            {reservedCustomers.length > 0 && (
              <div className="room-detail__modal-current-guest-box">
                <h2 className="room-detail__modal-current-guest">
                  Pre Bookings
                </h2>
                <div className="room-detail__modal-prebookings-header row mx-0">
                  <div className="col-4">
                    <h2>Name</h2>
                  </div>
                  <div className="col-4">
                    <h2>Check In</h2>
                  </div>
                  <div className="col-4">
                    <h2>Check Out</h2>
                  </div>
                </div>
                <div className="room-detail__modal-prebookings-content row mx-0 px-0">
                  {reservedCustomers
                    .sort(function (a, b) {
                      return (
                        returnTimestamp(a.checkIn) - returnTimestamp(b.checkIn)
                      );
                    })
                    .map((reservation) => (
                      <>
                        <input
                          onClick={() => {
                            setSelectedCustomer({
                              customerName: reservation.customerName,
                              mobileNumber: reservation.mobileNumber,
                              checkIn: reservation.checkIn,
                              checkOut: reservation.checkOut,
                              reservationId: reservation._id,
                              customerId: reservation.customerId,
                            });
                          }}
                          name="prebook"
                          type="radio"
                          id={`${reservation.customerName}${reservation.mobileNumber}${reservation.checkIn}${reservation.checkOut}`}
                          className="form__radio-input"
                        />
                        <label
                          htmlFor={`${reservation.customerName}${reservation.mobileNumber}${reservation.checkIn}${reservation.checkOut}`}
                          className="room-detail__modal-prebookings-content-row col-12 row mx-0 px-0"
                        >
                          <div className="col-4">
                            <p>{reservation.customerName}</p>
                          </div>
                          <div className="col-4">
                            <p>{reservation.checkIn.replace("T", "/")}</p>
                          </div>
                          <div className="col-4">
                            <p>{reservation.checkOut.replace("T", "/")}</p>
                          </div>
                        </label>
                      </>
                    ))}
                </div>

                <div className="room-detail__modal-buttons">
                  <button
                    onClick={() => {
                      if (
                        !selectedCustomer.customerName ||
                        !selectedCustomer.mobileNumber
                      )
                        return alert("please select customer first");
                      setShowPrebookedRoomModal(true);
                      // props.history.push(
                      //   `/home/newRegistration/?type=checkIn&mobile=${selectedReservedCustomer.mobileNumber}`
                      // );
                    }}
                    className="check-out-button"
                  >
                    Edit
                  </button>
                  <button
                    // onClick={() => handleAddOnClick(room)}
                    className="add-on-button"
                    onClick={() => {
                      if (
                        !selectedCustomer.customerName ||
                        !selectedCustomer.mobileNumber
                      )
                        return alert("please select customer first");

                      if (
                        isDateABeforeDateB(
                          returnCurrentDateAndTime(),
                          selectedCustomer.checkIn
                        )
                      ) {
                        return alert("Early Check in is not allowed!");
                      }
                      if (
                        isDateABeforeDateB(
                          selectedCustomer.checkOut,
                          returnCurrentDateAndTime()
                        )
                      )
                        return alert(
                          "This customer has passed check out date! Its suggestable to delete this reservation"
                        );
                      history.push(
                        `/home/newRegistration/?type=checkIn&customerId=${selectedCustomer.customerId}&reservationId=${selectedCustomer.reservationId}`
                      );
                    }}
                  >
                    Check In
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
