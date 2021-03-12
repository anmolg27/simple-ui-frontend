import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MessageModal from "../message-modal/message-modal";
import {
  calculateAmount,
  isDateABetweenDateBAndDateC,
  isDateABeforeDateB,
  returnCurrentDateAndTime,
} from "../../utils/functions";
import { createCustomer } from "../../redux/actions/customerAction";
import { returnDate, returnTomorrowDate } from "../../utils/functions";
import closeIcon from "../../icons/closeIcon.png";
import uniqid from "uniqid";
import "./styles.css";
import Input from "../input/input";
export default function CreateLedger(props) {
  const dispatch = useDispatch();
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [reservations, setReservations] = useState([]);
  const { loading, customers } = useSelector((state) => state.customers);
  const { rooms } = useSelector((state) => state.rooms);
  const [roomsAvailable, setRoomsAvailable] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [tableFields, setTableFields] = useState([]);
  const [actionType, setActionType] = useState("");
  const {
    location: { search },
  } = props;

  const [customerName, setCustomerName] = useState({
    valueName: "customerName",
    label: "Name",
    type: "text",
    required: true,
    value: "",
    handleChange: (val) => {
      setCustomerName((flds) => ({ ...flds, value: val }));
    },
  });
  const [age, setAge] = useState({
    valueName: "age",
    label: "Age",
    type: "Number",
    required: true,
    value: "",
    handleChange: (val) => {
      setAge((flds) => ({ ...flds, value: val }));
    },
  });
  const [address, setAddress] = useState({
    valueName: "address",
    label: "Address",
    type: "text",
    required: true,
    value: "",
    handleChange: (val) => {
      setAddress((flds) => ({ ...flds, value: val }));
    },
  });
  const [mobileNumber, setMobileNumber] = useState({
    valueName: "mobileNumber",
    label: "Mobile",
    type: "number",
    required: true,
    value: "",
    handleChange: (val) => {
      setMobileNumber((flds) => ({ ...flds, value: val }));
    },
  });
  const [numberOfKids, setNumberOfKids] = useState({
    valueName: "numberOfKids",
    label: "Kids",
    type: "number",
    required: true,
    value: "0",
    handleChange: (val) => {
      setNumberOfKids((flds) => ({ ...flds, value: val }));
    },
  });
  const [numberOfMale, setNumberOfMale] = useState({
    valueName: "numberOfMale",
    label: "Males",
    type: "number",
    required: true,
    value: "0",
    handleChange: (val) => {
      setNumberOfMale((flds) => ({ ...flds, value: val }));
    },
  });
  const [numberOfFemale, setNumberOfFemale] = useState({
    valueName: "numberOfFemale",
    label: "Females",
    type: "number",
    required: true,
    value: "0",
    handleChange: (val) => {
      setNumberOfFemale((flds) => ({ ...flds, value: val }));
    },
  });
  const [nationality, setNationality] = useState({
    valueName: "nationality",
    label: "Nationality",
    type: ["text"],
    options: [
      "Indian",
      "Afghan",
      "Bangladeshi",
      "Chinese",
      "German",
      "Nepalese",
    ],
    required: true,
    value: "",
    handleChange: (val) => {
      setNationality((flds) => ({ ...flds, value: val }));
    },
  });
  const [idType, setIdType] = useState({
    valueName: "idType",
    label: "I.D. Type",
    type: ["text"],
    options: ["Aadhaar", "PAN", "Driving License", "Passport", "Voter ID"],
    required: true,
    value: "",
    handleChange: (val) => {
      setIdType((flds) => ({ ...flds, value: val }));
    },
  });
  const [idNumber, setIdNumber] = useState({
    valueName: "idNumber",
    label: "I.D. No.",
    type: "text",
    required: true,
    value: "",
    handleChange: (val) => {
      setIdNumber((flds) => ({ ...flds, value: val }));
    },
  });
  const [vehicleNumber, setVehicleNumber] = useState({
    valueName: "vehicleNumber",
    label: "Vehicle No.",
    type: "text",
    // required: true,
    value: "",
    handleChange: (val) => {
      setVehicleNumber((flds) => ({ ...flds, value: val }));
    },
  });
  const [comingFrom, setComingFrom] = useState({
    valueName: "comingFrom",
    label: "Coming From",
    type: "text",
    required: true,
    value: "",
    handleChange: (val) => {
      setComingFrom((flds) => ({ ...flds, value: val }));
    },
  });
  const [goingTo, setGoingTo] = useState({
    valueName: "goingTo",
    label: "Going To",
    required: true,
    type: "text",
    value: "",
    handleChange: (val) => {
      setGoingTo((flds) => ({ ...flds, value: val }));
    },
  });
  const [reservationId, setReservationId] = useState("");
  useEffect(() => {
    let tempQuery = search;
    tempQuery = tempQuery.split("&");
    tempQuery[0] = tempQuery[0].replace("?type=", "");
    if (!tempQuery[0]) props.history.push("/home");
    setActionType(tempQuery[0]);
    if (tempQuery.length === 3 && customers.length > 0) {
      setMobileNumber((flds) => ({ ...flds, disabled: true }));
      setCustomerName((flds) => ({ ...flds, disabled: true }));
      setComingFrom((flds) => ({ ...flds, disabled: true }));
      setGoingTo((flds) => ({ ...flds, disabled: true }));
      tempQuery[1] = tempQuery[1].replace("customerId=", "");
      tempQuery[2] = tempQuery[2].replace("reservationId=", "");
      setReservationId(tempQuery[2]);
      setSelectedCustomer(
        customers.find((customer) => customer._id === tempQuery[1])
      );
    }
  }, [search, customers]);
  const generateTableField = (
    roomType = "",
    roomNumber = "",
    checkInDate = "",
    checkInTime = "",
    checkOutDate = "",
    checkOutTime = "",
    amount = "",
    reservationId = ""
  ) => {
    let tempField = {};
    if (
      !roomType &&
      !roomNumber &&
      !checkInDate &&
      !checkInTime &&
      !checkOutDate &&
      !checkOutTime &&
      !amount
    )
      tempField["closable"] = true;
    tempField["id"] = uniqid("roomstable-");
    tempField["reservationId"] = reservationId;
    tempField["roomType"] = {
      label: "Room Type",
      type: "dropdown",
      options: [],
      disabled: roomType ? true : false,
      handleChange: (val) => {
        setTableFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              fld.roomType.value = val;
            }
            return fld;
          })
        );
      },
      value: roomType,
    };

    tempField["roomNumber"] = {
      label: "Room No.",
      type: roomNumber ? "number" : "dropdown",
      disabled: roomNumber ? true : false,
      options: [],
      handleChange: (val) => {
        setTableFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              fld.roomNumber.value = val;
            }
            return fld;
          })
        );
      },
      value: roomNumber,
    };
    tempField["checkInDate"] = {
      label: "CheckIn Date",
      type: "date",
      // disabled: checkInDate ? true : false,
      disabled: search.includes("checkIn") ? true : false,

      handleChange: (val) => {
        setTableFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              fld.checkInDate.value = val;
            }
            return fld;
          })
        );
      },
      value: checkInDate
        ? checkInDate
        : `${returnDate(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            new Date().getDate()
          )}`,
    };
    tempField["checkInTime"] = {
      label: "CheckIn Time",
      type: "time",
      disabled: checkInTime ? true : false,
      handleChange: (val) => {
        setTableFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              fld.checkInTime.value = val;
            }
            return fld;
          })
        );
      },
      value: checkInTime
        ? checkInTime
        : `${
            new Date().getHours().toString().length === 1
              ? `0${new Date().getHours()}`
              : new Date().getHours()
          }:${
            new Date().getMinutes().toString().length === 1
              ? `0${new Date().getMinutes()}`
              : new Date().getMinutes()
          }`,
    };
    tempField["checkOutDate"] = {
      label: "CheckOut Date",
      type: "date",
      disabled: checkOutDate ? true : false,
      handleChange: (val) => {
        setTableFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              fld.checkOutDate.value = val;
            }
            return fld;
          })
        );
      },
      min: `${returnDate(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        new Date().getDate()
      )}`,
      value: checkOutDate
        ? checkOutDate
        : `${returnDate(
            returnTomorrowDate().getFullYear(),
            returnTomorrowDate().getMonth() + 1,
            returnTomorrowDate().getDate()
          )}`,
      // value: checkOutDate
      //   ? checkOutDate
      //   : `${returnDate(
      //       new Date().getFullYear(),
      //       new Date().getMonth() + 1,
      //       new Date().getDate()
      //     )}`,
    };
    tempField["checkOutTime"] = {
      label: "CheckOutTime",
      type: "time",
      disabled: checkOutTime ? true : false,
      handleChange: (val) => {
        setTableFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              fld.checkOutTime.value = val;
            }
            return fld;
          })
        );
      },
      value: checkOutTime ? checkOutTime : `11:00`,
    };
    tempField["amount"] = {
      label: "Amount",
      type: "number",
      disabled: true,
      handleChange: (val) => {
        setTableFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              fld.amount.value = val;
            }
            return fld;
          })
        );
      },
      value: amount,
    };
    return tempField;
  };
  useEffect(() => {
    if (
      selectedCustomer &&
      customers.length > 0 &&
      rooms.length > 0 &&
      reservationId
    ) {
      let foundCustomer = selectedCustomer;

      let foundReservation = foundCustomer.reservations[0];

      setCustomerName((field) => ({
        ...field,
        value: foundCustomer.customerName,
      }));
      setMobileNumber((field) => ({
        ...field,
        value: foundCustomer.mobileNumber,
      }));
      setComingFrom((field) => ({
        ...field,
        value: foundReservation.comingFrom,
      }));
      setGoingTo((field) => ({
        ...field,
        value: foundReservation.goingTo,
      }));
      setTableFields(
        foundCustomer.reservations
          .filter((reservation) =>
            isDateABetweenDateBAndDateC(
              returnCurrentDateAndTime(),
              reservation.checkIn,
              reservation.checkOut
            )
          )
          .map((reservation) =>
            generateTableField(
              rooms.find(
                (room) =>
                  parseInt(room.roomNumber) === parseInt(reservation.roomNumber)
              ).roomType,
              reservation.roomNumber,
              reservation.checkIn.split("T")[0],
              reservation.checkIn.split("T")[1],
              reservation.checkOut.split("T")[0],
              reservation.checkOut.split("T")[1],
              calculateAmount(
                rooms.find(
                  (room) =>
                    parseInt(room.roomNumber) ===
                    parseInt(reservation.roomNumber)
                ).chargePerDay,
                reservation.checkIn,
                reservation.checkOut
              ),
              reservation._id
            )
          )
      );
    }
  }, [selectedCustomer, customers, rooms, reservationId]);
  const renderField = (inputProps, xs, md) => {
    if (inputProps) {
      return (
        <div
          key={inputProps.valueName}
          className={`col-${xs} col-md-${md} px-1`}
        >
          <Input key={inputProps.valueName} inputProps={inputProps} />
        </div>
      );
    } else return null;
  };
  const handleSubmit = (event) => {
    const fieldsObject = {};
    event.preventDefault();
    let tempRooms = [];
    tableFields.forEach((fld) => {
      if (fld["amount"].value)
        tempRooms.push({
          roomNumber: fld["roomNumber"].value,
          checkIn: `${fld["checkInDate"].value}T${fld["checkInTime"].value}`,
          checkOut: `${fld["checkOutDate"].value}T${fld["checkOutTime"].value}`,
        });
    });
    if (
      !tempRooms.every((room) =>
        isDateABeforeDateB(room.checkIn, room.checkOut)
      )
    )
      return alert("Dates entered are invalid");
    fieldsObject["rooms"] = tempRooms;
    fieldsObject["extraDetails"] = {};
    fieldsObject[`${customerName.valueName}`] = customerName.value;
    if (age.value) fieldsObject["extraDetails"][`${age.valueName}`] = age.value;
    if (mobileNumber.value)
      fieldsObject[`${mobileNumber.valueName}`] = mobileNumber.value;
    if (address.value)
      fieldsObject["extraDetails"][`${address.valueName}`] = address.value;
    if (numberOfMale.value)
      fieldsObject["extraDetails"][`${numberOfMale.valueName}`] =
        numberOfMale.value;
    if (numberOfFemale.value)
      fieldsObject["extraDetails"][`${numberOfFemale.valueName}`] =
        numberOfFemale.value;
    if (numberOfKids.value)
      fieldsObject["extraDetails"][`${numberOfKids.valueName}`] =
        numberOfKids.value;
    if (nationality.value)
      fieldsObject["extraDetails"][`${nationality.valueName}`] =
        nationality.value;
    if (idType.value)
      fieldsObject["extraDetails"][`${idType.valueName}`] = idType.value;
    if (idNumber.value)
      fieldsObject["extraDetails"][`${idNumber.valueName}`] = idNumber.value;
    if (vehicleNumber.value)
      fieldsObject["extraDetails"][`${vehicleNumber.valueName}`] =
        vehicleNumber.value;
    fieldsObject["extraDetails"][`${comingFrom.valueName}`] = comingFrom.value;
    fieldsObject["extraDetails"][`${goingTo.valueName}`] = goingTo.value;
    if (selectedCustomer) fieldsObject["customerId"] = selectedCustomer._id;
    dispatch(
      createCustomer(
        fieldsObject,
        props.history,
        actionType,
        setShowMessageModal,
        setModalMessage,
        setReservations
      )
    );
  };

  useEffect(() => {
    if (tableFields.length === 0) {
      setTableFields([generateTableField()]);
    }
  }, [tableFields.length, rooms.length]);
  useEffect(() => {
    if (rooms.length > 0 && actionType) {
      let tempRooms = [];
      if (actionType === "checkIn")
        rooms.forEach((room) => {
          if (!room.isOutOfService && !room.isOccupied) {
            tempRooms.push(room);
          }
        });
      else tempRooms = rooms;

      setRoomsAvailable(tempRooms);
    }
  }, [rooms, actionType]);
  useEffect(() => {
    let selectedRooms;
    let notSelectedRooms;
    if (tableFields.length > 0 && roomsAvailable.length > 0) {
      setTableFields((flds) =>
        flds.map((fld) => ({
          ...fld,
          roomType: {
            ...fld.roomType,
            options: roomsAvailable
              .map((room) => room.roomType)
              .reduce((a, v) => {
                !a.includes(v) && a.push(v);
                return a;
              }, []),
            handleChange: (val) => {
              setTableFields((fields) =>
                fields.map((feld) => {
                  if (fld["id"] === feld["id"]) {
                    feld.roomType.value = val;
                    selectedRooms = [];
                    tableFields.forEach(
                      (tbField) =>
                        tbField.roomNumber.value &&
                        selectedRooms.push(tbField.roomNumber.value)
                    );
                    notSelectedRooms = roomsAvailable
                      .filter(
                        (room) => !selectedRooms.includes(room.roomNumber)
                      )
                      .map((room) => room.roomNumber);
                    feld.roomNumber.options = roomsAvailable
                      .filter((room) => room.roomType === val)
                      .map((room) => room.roomNumber)
                      .filter((room) => notSelectedRooms.includes(room));
                    feld.roomNumber.handleChange = (roomNumberVal) => {
                      setTableFields((feelds) =>
                        feelds.map((feeld) => {
                          if (feeld["id"] === feld["id"]) {
                            let foundRoom = roomsAvailable.find(
                              (room) =>
                                parseInt(room.roomNumber) ===
                                parseInt(roomNumberVal)
                            );
                            if (foundRoom.reservations.length > 0) {
                              setModalMessage(
                                `Room No. ${foundRoom.roomNumber} is reserved for following dates:`
                              );
                              setReservations(foundRoom.reservations);
                              setShowMessageModal(true);
                            }
                            feeld.roomNumber.value = roomNumberVal;
                            feeld.amount.value = calculateAmount(
                              foundRoom.chargePerDay,
                              `${feeld.checkInDate.value}:T${feeld.checkInTime.value}`,
                              `${feeld.checkOutDate.value}:T${feeld.checkOutTime.value}`
                            );
                            feeld.checkInDate.handleChange = (
                              checkInDateVal
                            ) => {
                              setTableFields((feeelds) =>
                                feeelds.map((feeeld) => {
                                  if (feeld["id"] === feeeld["id"]) {
                                    feeeld.checkInDate.value = checkInDateVal;
                                    feeeld.amount.value = calculateAmount(
                                      roomsAvailable.find(
                                        (room) =>
                                          room.roomNumber === roomNumberVal
                                      ).chargePerDay,
                                      `${feeld.checkInDate.value}:T${feeeld.checkInTime.value}`,
                                      `${feeeld.checkOutDate.value}:T${feeeld.checkOutTime.value}`
                                    );
                                  }
                                  return feeeld;
                                })
                              );
                            };
                            feeld.checkInTime.handleChange = (
                              checkInTimeVal
                            ) => {
                              setTableFields((feeelds) =>
                                feeelds.map((feeeld) => {
                                  if (feeld["id"] === feeeld["id"]) {
                                    feeeld.checkInTime.value = checkInTimeVal;
                                    feeeld.amount.value = calculateAmount(
                                      roomsAvailable.find(
                                        (room) =>
                                          room.roomNumber === roomNumberVal
                                      ).chargePerDay,
                                      `${feeeld.checkInDate.value}:T${feeeld.checkInTime.value}`,
                                      `${feeeld.checkOutDate.value}:T${feeeld.checkOutTime.value}`
                                    );
                                  }
                                  return feeeld;
                                })
                              );
                            };
                            feeld.checkOutDate.handleChange = (
                              checkOutDateVal
                            ) => {
                              setTableFields((feeelds) =>
                                feeelds.map((feeeld) => {
                                  if (feeld["id"] === feeeld["id"]) {
                                    feeeld.checkOutDate.value = checkOutDateVal;
                                    feeeld.amount.value = calculateAmount(
                                      roomsAvailable.find(
                                        (room) =>
                                          parseInt(room.roomNumber) ===
                                          parseInt(roomNumberVal)
                                      ).chargePerDay,
                                      `${feeld.checkInDate.value}:T${feeeld.checkInTime.value}`,
                                      `${feeeld.checkOutDate.value}:T${feeeld.checkOutTime.value}`
                                    );
                                  }
                                  return feeeld;
                                })
                              );
                            };
                            feeld.checkOutTime.handleChange = (
                              checkOutTimeVal
                            ) => {
                              setTableFields((feeelds) =>
                                feeelds.map((feeeld) => {
                                  if (feeld["id"] === feeeld["id"]) {
                                    feeeld.checkOutTime.value = checkOutTimeVal;
                                    feeeld.amount.value = calculateAmount(
                                      roomsAvailable.find(
                                        (room) =>
                                          parseInt(room.roomNumber) ===
                                          parseInt(roomNumberVal)
                                      ).chargePerDay,
                                      `${feeeld.checkInDate.value}:T${feeeld.checkInTime.value}`,
                                      `${feeeld.checkOutDate.value}:T${feeeld.checkOutTime.value}`
                                    );
                                  }
                                  return feeeld;
                                })
                              );
                            };
                          }
                          setTableFields((rfields) =>
                            rfields.map((rfield) => {
                              selectedRooms = [];
                              rfields.forEach(
                                (tbField) =>
                                  tbField.roomNumber.value &&
                                  !selectedRooms.includes(
                                    tbField.roomNumber.value
                                  ) &&
                                  selectedRooms.push(tbField.roomNumber.value)
                              );
                              notSelectedRooms = roomsAvailable
                                .filter(
                                  (room) =>
                                    !selectedRooms.includes(room.roomNumber)
                                )
                                .map((room) => room.roomNumber);
                              if (rfield.roomType.value) {
                                if (
                                  selectedRooms.includes(
                                    rfield.roomNumber.value
                                  )
                                ) {
                                  rfield.roomNumber.options = [
                                    rfield.roomNumber.value,
                                    ...roomsAvailable
                                      .filter((room) => room.roomType === val)
                                      .map((room) => room.roomNumber)
                                      .filter((room) =>
                                        notSelectedRooms.includes(room)
                                      ),
                                  ].sort(function (a, b) {
                                    return parseFloat(a) - parseFloat(b);
                                  });
                                } else
                                  rfield.roomNumber.options = roomsAvailable
                                    .filter((room) => room.roomType === val)
                                    .map((room) => room.roomNumber)
                                    .filter((room) =>
                                      notSelectedRooms.includes(room)
                                    )
                                    .sort(function (a, b) {
                                      return parseFloat(a) - parseFloat(b);
                                    });
                              }

                              return rfield;
                            })
                          );
                          return feeld;
                        })
                      );
                    };
                  }
                  return feld;
                })
              );
            },
          },
        }))
      );
    }
  }, [tableFields.length, roomsAvailable.length]);
  useEffect(() => {
    if (tableFields.length > 0) {
      if (tableFields[tableFields.length - 1].amount.value) {
        setTableFields((fields) => [...fields, generateTableField()]);
      }
    }
  }, [tableFields]);
  const handleFieldClose = (id) => {
    setTableFields((flds) => flds.filter((fld) => fld["id"] !== id));
  };
  const renderTableField = (field, i) => {
    return (
      <div key={field.id} className="bill-challan-table px-0 col-12 row mx-0">
        <div className="col-lg-1 col-6">
          <Input inputProps={field.roomType} />
        </div>

        <div className="col-lg-2 col-3">
          <Input inputProps={field.roomNumber} />
        </div>
        <div className="col-lg-2 col-3">
          <Input inputProps={field.checkInDate} />
        </div>
        <div className="col-lg-2 col-3">
          <Input inputProps={field.checkInTime} />
        </div>
        <div className="col-lg-2 col-3">
          <Input inputProps={field.checkOutDate} />
        </div>
        <div className="col-lg-2 col-3">
          <Input inputProps={field.checkOutTime} />
        </div>

        <div className="col-lg-1 col-3">
          <Input inputProps={field.amount} />
        </div>

        {tableFields.length - 1 > i && field.closable && (
          <img
            onClick={() => handleFieldClose(field.id)}
            src={closeIcon}
            alt="close"
          />
        )}
      </div>
    );
  };
  return (
    <>
      <button
        onClick={() => props.history.push("/home")}
        className="back-button"
      >
        &larr; Back
      </button>
      <h5>{actionType === "checkIn" ? "Checkin Form" : "Reservation Form"}</h5>
      {showMessageModal && (
        <MessageModal
          message={modalMessage}
          setShowMessageModal={setShowMessageModal}
          reservations={reservations}
        />
      )}
      <form
        autoComplete="off"
        className="ledger-fields-container row mx-0"
        onSubmit={handleSubmit}
      >
        {actionType === "checkIn"
          ? renderField(customerName, 12, 2)
          : renderField(customerName, 6, 3)}
        {actionType === "checkIn" ? renderField(age, 6, 1) : null}
        {actionType === "checkIn"
          ? renderField(mobileNumber, 6, 1)
          : renderField(mobileNumber, 6, 3)}

        {actionType === "checkIn" ? renderField(address, 12, 5) : null}

        {actionType === "checkIn" ? renderField(numberOfMale, 2, 1) : null}
        {actionType === "checkIn" ? renderField(numberOfFemale, 2, 1) : null}
        {actionType === "checkIn" ? renderField(numberOfKids, 2, 1) : null}
        {actionType === "checkIn" ? renderField(nationality, 6, 2) : null}
        {actionType === "checkIn" ? renderField(idType, 4, 2) : null}
        {actionType === "checkIn" ? renderField(idNumber, 4, 2) : null}
        {actionType === "checkIn" ? renderField(vehicleNumber, 4, 2) : null}

        {actionType === "checkIn"
          ? renderField(comingFrom, 6, 2)
          : renderField(comingFrom, 6, 3)}
        {actionType === "checkIn"
          ? renderField(goingTo, 6, 2)
          : renderField(goingTo, 6, 3)}
        <div className="bill-challan-table-container pr-5 pl-0 col-12 mx-0">
          {tableFields.length > 0 &&
            tableFields.map((field, i) => renderTableField(field, i))}
        </div>
        <div className="col-12 px-0 mt-5 row mx-0">
          <div className="total-amount-box col-12 col-md-6 px-0">
            <h1>Total:</h1>
            <p>
              {tableFields.length > 0 &&
                tableFields.reduce((a, c) => {
                  if (c.amount.value) {
                    a = a + parseFloat(c.amount.value);
                  }
                  return a;
                }, 0)}{" "}
              Rs.
            </p>
          </div>
          <div className="col-12 col-md-6 px-0 ledger-btn-container">
            <button className="ledger-submit-btn" disabled={loading}>
              {loading ? (
                <div className="spinner-border text-success" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
