import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  newCustomer,
  updateCustomer,
} from "../../redux/actions/customerAction";
import closeIcon from "../../icons/closeIcon.png";
import "./styles.css";
import Input from "../input/input";
export default function CreateLedger(props) {
  const dispatch = useDispatch();
  const { editLoading: loading } = useSelector((state) => state.customers);

  const { customer } = props;
  const [error, setError] = useState("");
  const [customerName, setCustomerName] = useState({
    valueName: "customerName",
    label: "Name",

    type: "text",
    required: true,
    value: customer && customer.customerName ? customer.customerName : "",
    handleChange: (val) => {
      setCustomerName((flds) => ({ ...flds, value: val }));
    },
  });
  const [mobileNumber, setMobileNumber] = useState({
    valueName: "mobileNumber",
    label: "Contact Number",

    type: "number",
    required: true,
    value: customer && customer.mobileNumber ? customer.mobileNumber : "",
    handleChange: (val) => {
      setMobileNumber((flds) => ({ ...flds, value: val }));
    },
  });
  const [balance, setBalance] = useState({
    valueName: "balance",
    label: "Balance",
    type: "number",
    value: customer && customer.balance ? customer.balance : "",
    handleChange: (val) => {
      setBalance((flds) => ({ ...flds, value: +val < 0 ? "0" : val }));
    },
  });
  const [idType, setIdType] = useState({
    valueName: "idType",
    label: "I.D Type",
    type: ["text"],
    options: ["Aadhaar", "Driving Licence", "Passport", "PAN card"],
    value:
      customer && customer.customerIdentificationNumber.type
        ? customer.customerIdentificationNumber.type
        : "",
    handleChange: (val) => {
      setIdType((flds) => ({ ...flds, value: val }));
    },
  });
  const [idNumber, setIdNumber] = useState({
    valueName: "idNumber",
    label: "I.D No.",
    type: "text",
    value:
      customer && customer.customerIdentificationNumber.number
        ? customer.customerIdentificationNumber.number
        : "",
    handleChange: (val) => {
      setIdNumber((flds) => ({ ...flds, value: val }));
    },
  });
  const [address1, setAddress1] = useState({
    valueName: "address1",
    label: "Address Line 1",
    type: "text",
    value: customer && customer.address.line1 ? customer.address.line1 : "",
    handleChange: (val) => {
      setAddress1((flds) => ({ ...flds, value: val }));
    },
  });
  const [address2, setAddress2] = useState({
    valueName: "address2",
    label: "Address Line 2",
    type: "text",
    value: customer && customer.address.line2 ? customer.address.line2 : "",
    handleChange: (val) => {
      setAddress2((flds) => ({ ...flds, value: val }));
    },
  });
  const [address3, setAddress3] = useState({
    valueName: "address3",
    label: "Address Line 3",
    type: "text",
    value: customer && customer.address.line3 ? customer.address.line3 : "",
    handleChange: (val) => {
      setAddress3((flds) => ({ ...flds, value: val }));
    },
  });

  const [customerEmail, setCustomerEmail] = useState({
    valueName: "customerEmail",
    label: "Email",
    type: "email",
    value: customer && customer.customerEmail ? customer.customerEmail : "",
    handleChange: (val) => {
      setCustomerEmail((flds) => ({ ...flds, value: val }));
    },
  });
  const [city, setCity] = useState({
    valueName: "city",
    label: "City",
    type: "text",
    value: customer && customer.city ? customer.city : "",
    handleChange: (val) => {
      setCity((flds) => ({ ...flds, value: val }));
    },
  });
  const [state, setState] = useState({
    valueName: "state",
    label: "State",
    type: "text",
    value: customer && customer.state ? customer.state : "",
    handleChange: (val) => {
      setState((flds) => ({ ...flds, value: val }));
    },
  });
  const [area, setArea] = useState({
    valueName: "area",
    label: "Area",
    type: "dropdown",
    options: ["local", "central"],
    required: true,
    value: customer && customer.area ? customer.area : "local",
    handleChange: (val) => {
      setArea((flds) => ({ ...flds, value: val }));
    },
  });
  const renderField = (inputProps, md) => {
    if (inputProps) {
      return (
        <div key={inputProps.valueName} className={`col-12 col-md-${md} px-3`}>
          <Input key={inputProps.valueName} inputProps={inputProps} />
        </div>
      );
    } else return null;
  };
  const handleSubmit = (event) => {
    const fieldsObject = {};
    event.preventDefault();
    // console.log("clicked");
    // if(customer &&customer._id)
    if (mobileNumber.value.toString().length !== 10)
      return alert("Invalid Contact Number");
    fieldsObject.customerName = customerName.value;
    fieldsObject.mobileNumber = +mobileNumber.value;
    fieldsObject.customerIdentificationNumber = {
      type: idType.value,
      number: idNumber.value,
    };
    if (customerEmail.value) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(customerEmail.value)) return alert("Invalid email");
      fieldsObject.customerEmail = customerEmail.value;
    }
    if (city.value) fieldsObject.city = city.value;
    if (state.value) fieldsObject.state = state.value;

    fieldsObject.area = area.value;
    if (balance.value || +balance.value !== 0)
      fieldsObject.balance = balance.value;
    fieldsObject.address = {
      line1: address1.value,
      line2: address2.value,
      line3: address3.value,
    };
    if (customer && customer._id) {
      for (let i in fieldsObject) {
        if (customer[i]) {
          if (typeof customer[i] !== "object") {
            if (!fieldsObject[i])
              fieldsObject[i] = typeof customer[i] === "number" ? 0 : "";
            else if (customer[i] === fieldsObject[i]) delete fieldsObject[i];
          } else {
            let flag = 0;
            for (let j in fieldsObject[i]) {
              if (fieldsObject[i][j] !== customer[i][j]) {
                flag = 1;
                break;
              }
            }
            if (flag === 0) delete fieldsObject[i];
          }
        }
      }
      if (Object.keys(fieldsObject).length === 0)
        return alert("You haven't done any changes");
      dispatch(
        updateCustomer(fieldsObject, customer._id, props.closeModal, setError)
      );
    } else {
      dispatch(newCustomer(fieldsObject, props.closeModal, setError));
    }
  };
  useEffect(() => {
    document.querySelector(".room-form").addEventListener("click", (event) => {
      if (event.target.className === "room-form") {
        props.closeModal();
      }
    });
  }, []);
  const editBalance = (e, type) => {
    e.preventDefault();
    let val = e.currentTarget.parentNode.querySelector("input").value;
    e.currentTarget.parentNode.querySelector("input").value = "";
    if ((+val || 0) === 0) return;
    if (type === "add") {
      setBalance((fld) => ({ ...fld, value: +fld.value + +val }));
    } else {
      setBalance((fld) => ({ ...fld, value: +fld.value - +val }));
    }
  };
  return (
    <div className="room-form">
      <form
        autoComplete="off"
        className="room-form__form row mx-0"
        onSubmit={handleSubmit}
      >
        <div className="close-button" onClick={() => props.closeModal()}>
          <img src={closeIcon} alt="close icon" />
        </div>
        {renderField(customerName, 6)}
        {renderField(mobileNumber, 6)}
        {renderField(idType, 6)}
        {renderField(idNumber, 6)}
        {renderField(address1, 12)}
        {renderField(address2, 12)}
        {renderField(address3, 12)}

        {renderField(customerEmail, 6)}
        {renderField(city, 6)}
        {renderField(state, 6)}
        {renderField(area, 6)}
        {renderField(balance, 6)}
        <div className="col-12 col-md-6 px-3 align-self-end">
          {/* <Input  inputProps={inputProps} /> */}
          <div className="room-form__edit-balance">
            <input type="number" />
            <button onClick={(e) => editBalance(e, "add")}>Add</button>
            <button onClick={(e) => editBalance(e, "sub")}>Sub</button>
          </div>
        </div>
        {error && (
          <div className="col-12 px-0 room-form__error">
            <span
              className="fa fa-exclamation-triangle"
              aria-hidden="true"
            ></span>
            <div className="room-form__error-message">{error}</div>
          </div>
        )}

        <div className="col-12 px-0 room-form__btn-container">
          <button className="room-form__submit-btn" disabled={loading}>
            {loading ? (
              <div className="spinner-border text-success" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
