import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editCheckInCustomerDetails } from "../../redux/actions/customerAction";
import closeIcon from "../../icons/closeIcon.png";
import Input from "../input/input";
import "./styles.css";
export default function EditCustomerModal(props) {
  const { setShowModal, customer } = props;
  const dispatch = useDispatch();
  const { editLoading } = useSelector((state) => state.customers);
  const [customerName, setCustomerName] = useState({
    valueName: "customerName",
    label: "Name",
    type: "text",
    required: true,
    value: customer.customerName,
    handleChange: (val) => {
      setCustomerName((flds) => ({ ...flds, value: val }));
    },
  });
  const [age, setAge] = useState({
    valueName: "age",
    label: "Age",
    type: "Number",
    required: true,
    value: customer.extraDetails.age,
    handleChange: (val) => {
      setAge((flds) => ({ ...flds, value: val }));
    },
  });
  const [address, setAddress] = useState({
    valueName: "address",
    label: "Address",
    type: "text",
    required: true,
    value: customer.extraDetails.address,
    handleChange: (val) => {
      setAddress((flds) => ({ ...flds, value: val }));
    },
  });
  const [mobileNumber, setMobileNumber] = useState({
    valueName: "mobileNumber",
    label: "Mobile",
    type: "number",
    required: true,
    value: customer.mobileNumber,
    handleChange: (val) => {
      setMobileNumber((flds) => ({ ...flds, value: val }));
    },
  });
  const [numberOfKids, setNumberOfKids] = useState({
    valueName: "numberOfKids",
    label: "Kids",
    type: "number",
    required: true,
    value: customer.extraDetails.numberOfKids,
    handleChange: (val) => {
      setNumberOfKids((flds) => ({ ...flds, value: val }));
    },
  });
  const [numberOfMale, setNumberOfMale] = useState({
    valueName: "numberOfMale",
    label: "Males",
    type: "number",
    required: true,
    value: customer.extraDetails.numberOfMale,
    handleChange: (val) => {
      setNumberOfMale((flds) => ({ ...flds, value: val }));
    },
  });
  const [numberOfFemale, setNumberOfFemale] = useState({
    valueName: "numberOfFemale",
    label: "Females",
    type: "number",
    required: true,
    value: customer.extraDetails.numberOfFemale,
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
    value: customer.extraDetails.nationality,
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
    value: customer.extraDetails.idType,
    handleChange: (val) => {
      setIdType((flds) => ({ ...flds, value: val }));
    },
  });
  const [idNumber, setIdNumber] = useState({
    valueName: "idNumber",
    label: "I.D. No.",
    type: "text",
    required: true,
    value: customer.extraDetails.idNumber,
    handleChange: (val) => {
      setIdNumber((flds) => ({ ...flds, value: val }));
    },
  });
  const [vehicleNumber, setVehicleNumber] = useState({
    valueName: "vehicleNumber",
    label: "Vehicle No.",
    type: "text",
    // required: true,
    value: customer.extraDetails.vehicleNumber,
    handleChange: (val) => {
      setVehicleNumber((flds) => ({ ...flds, value: val }));
    },
  });
  const [comingFrom, setComingFrom] = useState({
    valueName: "comingFrom",
    label: "Coming From",
    type: "text",
    required: true,
    value: customer.extraDetails.comingFrom,
    handleChange: (val) => {
      setComingFrom((flds) => ({ ...flds, value: val }));
    },
  });
  const [goingTo, setGoingTo] = useState({
    valueName: "goingTo",
    label: "Going To",
    required: true,
    type: "text",
    value: customer.extraDetails.goingTo,
    handleChange: (val) => {
      setGoingTo((flds) => ({ ...flds, value: val }));
    },
  });
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
    fieldsObject["customerId"] = customer._id;
    dispatch(editCheckInCustomerDetails(fieldsObject));
  };
  useEffect(() => {
    document
      .querySelector(".edit-customer-modal")
      .addEventListener("click", (event) => {
        if (event.target.className === "edit-customer-modal") {
          setShowModal(false);
        }
      });
  }, []);
  return (
    <div className="edit-customer-modal">
      <div className="edit-customer-modal__box">
        <div className="close-button" onClick={() => setShowModal(false)}>
          <img src={closeIcon} />
        </div>
        <form
          onSubmit={handleSubmit}
          className="edit-customer-modal__row row mx-0 px-0"
        >
          {renderField(customerName, 6, 4)}
          {renderField(age, 2, 4)}
          {renderField(mobileNumber, 4, 4)}

          {renderField(address, 12, 12)}

          {renderField(numberOfMale, 2, 3)}
          {renderField(numberOfFemale, 2, 3)}
          {renderField(numberOfKids, 2, 3)}

          {renderField(nationality, 3, 3)}
          {renderField(idType, 3, 3)}
          {renderField(idNumber, 3, 3)}
          {renderField(vehicleNumber, 3, 3)}
          {renderField(comingFrom, 3, 3)}
          {renderField(goingTo, 3, 3)}
          <div className="col-3 pl-1 edit-customer-modal__submit col-md-3">
            <button
              disabled={editLoading}
              className="edit-customer-modal__submit-button"
            >
              {editLoading ? (
                <div className="spinner-border text-success" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Submit"
              )}
            </button>
            {/* <Input key={inputProps.valueName} inputProps={inputProps} /> */}
          </div>
        </form>
      </div>
    </div>
  );
}
