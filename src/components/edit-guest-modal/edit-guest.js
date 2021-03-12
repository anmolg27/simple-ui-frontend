import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import closeIcon from "../../icons/closeIcon.png";
import Input from "../input/input";
// import { useEffect } from "react";
import { editGuestDetails } from "../../redux/actions/transactionAction";
export default function EditGuest(props) {
  const { setShowModal, transactionId, details } = props;
  const { editLoading } = useSelector((state) => state.transactions);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    let fieldsObject = {};
    if (details.customerName !== customerName.value)
      fieldsObject[`${customerName.valueName}`] = customerName.value;
    if (details.address !== address.value)
      fieldsObject[`${address.valueName}`] = address.value;
    if (details.mobileNumber.toString() !== mobileNumber.value.toString())
      fieldsObject[`${mobileNumber.valueName}`] = mobileNumber.value;
    if (details.age.toString() !== age.value.toString())
      fieldsObject[`${age.valueName}`] = age.value;
    if (details.idType !== idType.value)
      fieldsObject[`${idType.valueName}`] = idType.value;
    if (details.idNumber !== idNumber.value)
      fieldsObject[`${idNumber.valueName}`] = idNumber.value;
    if (details.nationality !== nationality.value)
      fieldsObject[`${nationality.valueName}`] = nationality.value;
    if (details.comingFrom !== comingFrom.value)
      fieldsObject[`${comingFrom.valueName}`] = comingFrom.value;
    if (details.goingTo !== goingTo.value)
      fieldsObject[`${goingTo.valueName}`] = goingTo.value;

    if (parseInt(details.numberOfMale) !== parseInt(numberOfMale.value))
      fieldsObject[`${numberOfMale.valueName}`] = numberOfMale.value;
    if (parseInt(details.numberOfFemale) !== parseInt(numberOfFemale.value))
      fieldsObject[`${numberOfFemale.valueName}`] = numberOfFemale.value;
    if (parseInt(details.numberOfKids) !== parseInt(numberOfKids.value))
      fieldsObject[`${numberOfKids.valueName}`] = numberOfKids.value;
    if (vehicleNumber.value) {
      if (details.vehicleNumber) {
        if (details.vehicleNumber !== vehicleNumber.value)
          fieldsObject[`${vehicleNumber.valueName}`] = vehicleNumber.value;
      } else fieldsObject[`${vehicleNumber.valueName}`] = vehicleNumber.value;
    }

    dispatch(editGuestDetails(fieldsObject, transactionId, handleModalClose));
  };
  const handleModalClose = () => {
    setShowModal(false);
  };
  const [customerName, setCustomerName] = useState({
    valueName: "customerName",
    label: "Name",
    type: "text",
    required: true,
    value: details.customerName,
    handleChange: (val) => {
      setCustomerName((flds) => ({ ...flds, value: val }));
    },
  });
  const [age, setAge] = useState({
    valueName: "age",
    label: "Age",
    type: "Number",
    required: true,
    value: details.age,
    handleChange: (val) => {
      setAge((flds) => ({ ...flds, value: val }));
    },
  });
  const [address, setAddress] = useState({
    valueName: "address",
    label: "Address",
    type: "text",
    required: true,
    value: details.address,
    handleChange: (val) => {
      setAddress((flds) => ({ ...flds, value: val }));
    },
  });
  const [mobileNumber, setMobileNumber] = useState({
    valueName: "mobileNumber",
    label: "Mobile",
    type: "number",
    required: true,
    value: details.mobileNumber,
    handleChange: (val) => {
      setMobileNumber((flds) => ({ ...flds, value: val }));
    },
  });
  const [numberOfKids, setNumberOfKids] = useState({
    valueName: "numberOfKids",
    label: "Kids",
    type: "number",
    required: true,
    value: details.numberOfKids,
    handleChange: (val) => {
      setNumberOfKids((flds) => ({ ...flds, value: val }));
    },
  });
  const [numberOfMale, setNumberOfMale] = useState({
    valueName: "numberOfMale",
    label: "Males",
    type: "number",
    required: true,
    value: details.numberOfMale,
    handleChange: (val) => {
      setNumberOfMale((flds) => ({ ...flds, value: val }));
    },
  });
  const [numberOfFemale, setNumberOfFemale] = useState({
    valueName: "numberOfFemale",
    label: "Females",
    type: "number",
    required: true,
    value: details.numberOfFemale,
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
    value: details.nationality,
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
    value: details.idType,
    handleChange: (val) => {
      setIdType((flds) => ({ ...flds, value: val }));
    },
  });
  const [idNumber, setIdNumber] = useState({
    valueName: "idNumber",
    label: "I.D. No.",
    type: "text",
    required: true,
    value: details.idNumber,
    handleChange: (val) => {
      setIdNumber((flds) => ({ ...flds, value: val }));
    },
  });
  const [vehicleNumber, setVehicleNumber] = useState({
    valueName: "vehicleNumber",
    label: "Vehicle No.",
    type: "text",
    // required: true,
    value: details.vehicleNumber ? details.vehicleNumber : "",
    handleChange: (val) => {
      setVehicleNumber((flds) => ({ ...flds, value: val }));
    },
  });
  const [comingFrom, setComingFrom] = useState({
    valueName: "comingFrom",
    label: "Coming From",
    type: "text",
    required: true,
    value: details.comingFrom,
    handleChange: (val) => {
      setComingFrom((flds) => ({ ...flds, value: val }));
    },
  });
  const [goingTo, setGoingTo] = useState({
    valueName: "goingTo",
    label: "Going To",
    required: true,
    type: "text",
    value: details.goingTo,
    handleChange: (val) => {
      setGoingTo((flds) => ({ ...flds, value: val }));
    },
  });
  const renderField = (field, xs, md) => (
    <div className={`col-${xs} col-md-${md} px-2`}>
      <Input key={field.valueName} inputProps={field} />
    </div>
  );
  useEffect(() => {
    document
      .querySelector(".edit-guest__modal")
      .addEventListener("click", (event) => {
        if (event.target.className === "edit-guest__modal") {
          setShowModal(false);
        }
      });
  }, []);
  return (
    <div className="edit-guest__modal">
      <div className="edit-guest__modal-box">
        <div className="close-button" onClick={() => setShowModal(false)}>
          <img src={closeIcon} />
        </div>
        <h1>Edit Guest Details</h1>
        <div className="row mx-0 ">
          {renderField(customerName, 12, 4)}
          {renderField(address, 12, 8)}
          {renderField(mobileNumber, 6, 3)}

          {renderField(age, 3, 1)}
          {renderField(idType, 3, 2)}
          {renderField(idNumber, 3, 3)}

          {renderField(nationality, 3, 3)}
          {renderField(comingFrom, 3, 2)}
          {renderField(goingTo, 3, 2)}
          {renderField(numberOfMale, 3, 1)}
          {renderField(numberOfFemale, 3, 1)}
          {renderField(numberOfKids, 3, 2)}
          {renderField(vehicleNumber, 3, 4)}
          {/* {renderField(customerName,4)} */}
        </div>
        <button
          disabled={editLoading}
          onClick={handleSubmit}
          className="edit-guest__submit-button"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
