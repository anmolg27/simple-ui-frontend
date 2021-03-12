import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import moment from "moment";
import { calculateAmount } from "../../utils/functions";
import { createCustomer } from "../../redux/actions/customerAction";
import { returnDate } from "../../utils/functions";
import closeIcon from "../../icons/closeIcon.png";
import Complimentaries from "../complimentaries/complimentaries";
import uniqid from "uniqid";
import "./styles.css";
import Input from "../input/input";
export default function CreateLedger(props) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.customers);
  const { loading: roomsLoading, rooms } = useSelector((state) => state.rooms);
  const [roomsAvailable, setRoomsAvailable] = useState([]);
  const [roomsSelected, setRoomsSelected] = useState([]);
  const [tableFields, setTableFields] = useState([]);
  const { propFields, heading } = props;
  const [fields, setFields] = useState([]);
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
    value: "18",
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
    value: "",
    handleChange: (val) => {
      setNumberOfKids((flds) => ({ ...flds, value: val }));
    },
  });
  const [numberOfMale, setNumberOfMale] = useState({
    valueName: "numberOfMale",
    label: "Males",
    type: "number",
    required: true,
    value: "",
    handleChange: (val) => {
      setNumberOfMale((flds) => ({ ...flds, value: val }));
    },
  });
  const [numberOfFemale, setNumberOfFemale] = useState({
    valueName: "numberOfFemale",
    label: "Females",
    type: "number",
    required: true,
    value: "",
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
    type: "text",
    required: true,
    value: "",
    handleChange: (val) => {
      setGoingTo((flds) => ({ ...flds, value: val }));
    },
  });
  const generateTableField = () => {
    let tempField = {};
    tempField["id"] = uniqid("roomstable-");
    tempField["roomType"] = {
      label: "Room Type",
      type: "dropdown",
      options: [],
      // disabled: true,
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
      value: "",
    };
    tempField["numberOfPeople"] = {
      label: "Capacity",
      type: "dropdown",
      options: [],
      // disabled: true,
      handleChange: (val) => {
        setTableFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              fld.numberOfPeople.value = val;
            }
            return fld;
          })
        );
      },
      value: "",
    };
    tempField["roomNumber"] = {
      label: "Room No.",
      type: "dropdown",
      // disabled: true,
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
      value: "",
    };
    tempField["checkIn"] = {
      label: "Check In",
      type: "datetime-local",
      handleChange: (val) => {
        setTableFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              fld.checkIn.value = val;
            }
            return fld;
          })
        );
      },
      min: `${returnDate(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        new Date().getDate()
      )}T${
        new Date().getHours().toString().length === 1
          ? `0${new Date().getHours()}`
          : new Date().getHours()
      }:${
        new Date().getMinutes().toString().length === 1
          ? `0${new Date().getMinutes()}`
          : new Date().getMinutes()
      }`,
      value: `${returnDate(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        new Date().getDate()
      )}T${
        new Date().getHours().toString().length === 1
          ? `0${new Date().getHours()}`
          : new Date().getHours()
      }:${
        new Date().getMinutes().toString().length === 1
          ? `0${new Date().getMinutes()}`
          : new Date().getMinutes()
      }`,
    };
    tempField["checkOut"] = {
      label: "Check Out",
      type: "datetime-local",
      handleChange: (val) => {
        setTableFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              fld.checkOut.value = val;
            }
            return fld;
          })
        );
      },
      value: `${returnDate(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        new Date().getDate()
      )}T${
        new Date().getHours().toString().length === 1
          ? `0${new Date().getHours()}`
          : new Date().getHours()
      }:${
        new Date().getMinutes().toString().length === 1
          ? `0${new Date().getMinutes()}`
          : new Date().getMinutes()
      }`,
    };
    tempField["amount"] = {
      label: "Total amount",
      type: "number",
      // disabled: true,
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
      value: "",
    };
    // index++;
    return tempField;
  };
  const [complimentaryFields, setComplimentaryFields] = useState([]);
  const generateField = (asset, charge) => {
    let tempField = {};
    tempField["id"] = uniqid("roomForm-");
    tempField["assetName"] = {
      label: "Asset Name",
      type: "text",
      handleChange: (val) => {
        setComplimentaryFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              fld.assetName.value = val;
            }
            return fld;
          })
        );
      },
      value: asset ? asset : "",
    };

    tempField["charge"] = {
      label: "Charge",
      type: "number",
      handleChange: (val) => {
        setComplimentaryFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              fld.charge.value = val;
            }
            return fld;
          })
        );
      },
      value: charge ? charge : "",
    };

    // index++;
    return tempField;
  };

  const [totalFare, setTotalFare] = useState(0);
  // const calculateAmount = (rate, checkIn, checkOut) => {
  //   // console.log("dates are");
  //   // console.log(checkIn);
  //   // console.log(checkOut);
  //   let checkOutArr = checkOut.split("T");
  //   let checkInArr = checkIn.split("T");
  //   checkInArr[1] = parseInt(checkInArr[1].replace(":", ""));
  //   checkOutArr[1] = parseInt(checkOutArr[1].replace(":", ""));
  //   if (checkInArr[0] === checkOutArr[0]) return rate;
  //   else {
  //     let checkInDate = checkInArr[0].split("-").map((dt) => parseInt(dt));

  //     let checkOutDate = checkOutArr[0].split("-").map((dt) => parseInt(dt));
  //     checkInDate = moment([
  //       checkInDate[0],
  //       checkInDate[1] - 1,
  //       checkInDate[2],
  //     ]);
  //     checkOutDate = moment([
  //       checkOutDate[0],
  //       checkOutDate[1] - 1,
  //       checkOutDate[2],
  //     ]);
  //     let numberOfDays = checkOutDate.diff(checkInDate, "days");
  //     return (numberOfDays + 1) * rate;
  //   }
  // };
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
          checkIn: fld["checkIn"].value,
          checkOut: fld["checkOut"].value,
        });
    });
    fieldsObject["rooms"] = tempRooms;
    fieldsObject["extraDetails"] = {};
    fieldsObject[`${customerName.valueName}`] = customerName.value;
    // if (address.value)
    fieldsObject["extraDetails"][`${address.valueName}`] = address.value;

    fieldsObject[`${mobileNumber.valueName}`] = mobileNumber.value;
    // if (numberOfMale.value)
    fieldsObject["extraDetails"][`${numberOfMale.valueName}`] =
      numberOfMale.value;
    // if (numberOfFemale.value)
    fieldsObject["extraDetails"][`${numberOfFemale.valueName}`] =
      numberOfFemale.value;

    // if (numberOfKids.value)
    fieldsObject["extraDetails"][`${numberOfKids.valueName}`] =
      numberOfKids.value;
    // if (nationality.value)
    fieldsObject["extraDetails"][`${nationality.valueName}`] =
      nationality.value;
    // if (idType.value)
    fieldsObject["extraDetails"][`${idType.valueName}`] = idType.value;
    // if (idNumber.value)
    fieldsObject["extraDetails"][`${idNumber.valueName}`] = idNumber.value;
    if (vehicleNumber.value)
      fieldsObject["extraDetails"][`${vehicleNumber.valueName}`] =
        vehicleNumber.value;
    fieldsObject["extraDetails"][`${comingFrom.valueName}`] = comingFrom.value;
    fieldsObject["extraDetails"][`${goingTo.valueName}`] = goingTo.value;
    // console.log(fieldsObject);
    dispatch(createCustomer(fieldsObject, props.history));
  };
  const handleComplimentaryClose = (id) => {
    setComplimentaryFields((flds) => flds.filter((fld) => fld["id"] !== id));
  };
  useEffect(() => {
    if (tableFields.length === 0) {
      setTableFields([generateTableField()]);
    }
  }, [tableFields.length, rooms.length]);
  useEffect(() => {
    let tempRooms = [];
    if (rooms.length > 0)
      rooms.forEach((room) => {
        if (!room.isReserved) tempRooms.push(room);
      });
    setRoomsAvailable(tempRooms);
  }, [rooms]);
  useEffect(() => {
    let selectedRooms;
    let notSelectedRooms;
    if (tableFields.length > 0 && roomsAvailable.length > 0) {
      setTableFields((flds) => {
        return flds.map((fld) => ({
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
                    feld.numberOfPeople.value = "";
                    feld.numberOfPeople.options = [];
                    feld.roomNumber.options = [];
                    feld.roomNumber.value = "";
                    feld.amount.value = "";
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
                    feld.numberOfPeople.options = roomsAvailable
                      .filter((room) =>
                        notSelectedRooms.includes(room.roomNumber)
                      )
                      .filter((room) => room.roomType === val)
                      .map((room) => room.roomCapacity)
                      .reduce((a, v) => {
                        !a.includes(v) && a.push(v);
                        return a;
                      }, []);
                    feld.numberOfPeople.handleChange = (valu) => {
                      setTableFields((feelds) =>
                        feelds.map((feeld) => {
                          if (feld["id"] === feeld["id"]) {
                            feeld.numberOfPeople.value = valu;
                            feeld.amount.value = "";
                            feeld.roomNumber.value = "";
                            feeld.roomNumber.handleChange = (roomNumberVal) => {
                              setTableFields((feeelds) =>
                                feeelds.map((feeeld) => {
                                  if (feeeld["id"] === feeld["id"]) {
                                    feeeld.roomNumber.value = roomNumberVal;

                                    feeeld.amount.value = calculateAmount(
                                      roomsAvailable.find(
                                        (room) =>
                                          room.roomNumber === roomNumberVal
                                      ).chargePerDay,
                                      feeeld.checkIn.value,
                                      feeeld.checkOut.value
                                    );
                                    feeeld.checkIn.handleChange = (
                                      checkInVal
                                    ) => {
                                      setTableFields((feeeelds) =>
                                        feeeelds.map((feeeeld) => {
                                          if (feeeeld["id"] === feeeld["id"]) {
                                            feeeeld.checkIn.value = checkInVal;
                                            feeeeld.amount.value = calculateAmount(
                                              roomsAvailable.find(
                                                (room) =>
                                                  room.roomNumber ===
                                                  roomNumberVal
                                              ).chargePerDay,
                                              feeeeld.checkIn.value,
                                              feeeeld.checkOut.value
                                            );
                                          }
                                          // console.log("checoutdate");
                                          // console.log(feeeeld.checkOut.value);

                                          return feeeeld;
                                        })
                                      );
                                    };
                                    feeeld.checkOut.handleChange = (
                                      checkOutVal
                                    ) => {
                                      setTableFields((feeeelds) =>
                                        feeeelds.map((feeeeld) => {
                                          if (feeeeld["id"] === feeeld["id"]) {
                                            feeeeld.checkOut.value = checkOutVal;
                                            feeeeld.amount.value = calculateAmount(
                                              roomsAvailable.find(
                                                (room) =>
                                                  room.roomNumber ===
                                                  roomNumberVal
                                              ).chargePerDay,
                                              feeeeld.checkIn.value,
                                              feeeeld.checkOut.value
                                            );
                                          }
                                          return feeeeld;
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
                                          selectedRooms.push(
                                            tbField.roomNumber.value
                                          )
                                      );
                                      notSelectedRooms = roomsAvailable
                                        .filter(
                                          (room) =>
                                            !selectedRooms.includes(
                                              room.roomNumber
                                            )
                                        )
                                        .map((room) => room.roomNumber);

                                      if (
                                        selectedRooms.includes(
                                          rfield.roomNumber.value
                                        )
                                      ) {
                                        console.log("opt");
                                        console.log();
                                        rfield.roomNumber.options = [
                                          rfield.roomNumber.value,
                                          ...roomsAvailable
                                            .filter(
                                              (room) =>
                                                room.roomCapacity ===
                                                parseInt(
                                                  rfield.numberOfPeople.value
                                                )
                                            )
                                            .map((room) => room.roomNumber)
                                            .filter((room) =>
                                              notSelectedRooms.includes(room)
                                            ),
                                        ].sort(function (a, b) {
                                          return parseFloat(a) - parseFloat(b);
                                        });
                                      } else
                                        rfield.roomNumber.options = roomsAvailable
                                          .filter(
                                            (room) =>
                                              room.roomCapacity ===
                                              parseInt(
                                                rfield.numberOfPeople.value
                                              )
                                          )
                                          .map((room) => room.roomNumber)
                                          .filter((room) =>
                                            notSelectedRooms.includes(room)
                                          )
                                          .sort(function (a, b) {
                                            return (
                                              parseFloat(a) - parseFloat(b)
                                            );
                                          });

                                      return rfield;
                                    })
                                  );
                                  return feeeld;
                                })
                              );
                            };
                          }
                          selectedRooms = [];
                          tableFields.forEach(
                            (tbField) =>
                              tbField.roomNumber.value &&
                              selectedRooms.push(tbField.roomNumber.value)
                          );
                          notSelectedRooms = roomsAvailable
                            .filter(
                              (room) =>
                                room.roomCapacity ===
                                  parseInt(feeld.numberOfPeople.value) &&
                                !selectedRooms.includes(room.roomNumber)
                            )
                            .map((room) => room.roomNumber);
                          if (selectedRooms.includes(feeld.roomNumber.value)) {
                            feeld.roomNumber.options = [
                              feeld.roomNumber.value,
                              ...notSelectedRooms,
                            ].sort(function (a, b) {
                              return parseFloat(a) - parseFloat(b);
                            });
                          } else
                            feeld.roomNumber.options = notSelectedRooms.sort(
                              function (a, b) {
                                return parseFloat(a) - parseFloat(b);
                              }
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
        }));
      });
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
        <div className="col-md-1 col-6">
          <Input inputProps={field.roomType} />
        </div>
        <div className="col-md-1 col-3">
          <Input inputProps={field.numberOfPeople} />
        </div>
        <div className="col-md-2 col-3">
          <Input inputProps={field.roomNumber} />
        </div>
        <div className="col-md-3 col-3">
          <Input inputProps={field.checkIn} />
        </div>
        <div className="col-md-3 col-3">
          <Input inputProps={field.checkOut} />
        </div>

        <div className="col-md-2 col-3">
          <Input inputProps={field.amount} />
        </div>

        {tableFields.length - 1 > i && (
          <img onClick={() => handleFieldClose(field.id)} src={closeIcon} />
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
      <h5>{heading}</h5>

      <form
        autoComplete="off"
        className="ledger-fields-container row mx-0"
        onSubmit={handleSubmit}
      >
        {renderField(customerName, 8, 2)}
        {renderField(age, 2, 1)}
        {renderField(mobileNumber, 2, 1)}

        {renderField(address, 12, 5)}

        {renderField(numberOfMale, 2, 1)}
        {renderField(numberOfFemale, 2, 1)}
        {renderField(numberOfKids, 2, 1)}
        {renderField(nationality, 3, 2)}
        {renderField(idType, 3, 2)}
        {renderField(idNumber, 3, 2)}
        {renderField(vehicleNumber, 3, 2)}
        {renderField(comingFrom, 3, 2)}
        {renderField(goingTo, 3, 2)}
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
                    console.log("c");
                    console.log(c);
                    a = a + parseFloat(c.amount.value);
                  }
                  console.log("a");
                  console.log(a);
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
