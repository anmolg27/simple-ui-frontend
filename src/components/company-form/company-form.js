import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCompany,
  updateCompany,
} from "../../redux/actions/companyAction";
// import imageCompression from "browser-image-compression";
// import uniqid from "uniqid";
import closeIcon from "../../icons/closeIcon.png";
import Input from "../input/input";
// import noImage from "../../images/no-image.jpg";
import "./styles.css";
export default function CompanyForm(props) {
  const { data, editLoading: loading } = useSelector((state) => state.company);
  const { company } = props;
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState({
    valueName: "companyName",
    label: "Company Name",
    type: "text",
    required: true,
    value: company && company.companyName ? company.companyName : "",
    handleChange: (val) => {
      setCompanyName((flds) => ({ ...flds, value: val }));
    },
  });
  const [addressLine1, setAddressLine1] = useState({
    valueName: "line1",
    label: "Address Line 1",
    type: "text",
    value: company && company.address.line1 ? company.address.line1 : "",
    handleChange: (val) => {
      setAddressLine1((flds) => ({ ...flds, value: val }));
    },
  });
  const [addressLine2, setAddressLine2] = useState({
    valueName: "line2",
    label: "Address Line 2",
    type: "text",
    value: company && company.address.line2 ? company.address.line2 : "",
    handleChange: (val) => {
      setAddressLine2((flds) => ({ ...flds, value: val }));
    },
  });
  const [addressLine3, setAddressLine3] = useState({
    valueName: "line3",
    label: "Address Line 3",
    type: "text",
    value: company && company.address.line3 ? company.address.line3 : "",
    handleChange: (val) => {
      setAddressLine3((flds) => ({ ...flds, value: val }));
    },
  });
  const [country, setCountry] = useState({
    valueName: "country",
    label: "Country",
    type: "text",
    value: company && company.country ? company.country : "",
    handleChange: (val) => {
      setCountry((flds) => ({ ...flds, value: val }));
    },
  });
  const [state, setState] = useState({
    valueName: "state",
    label: "State",
    type: "text",
    value: company && company.state ? company.state : "",
    handleChange: (val) => {
      setState((flds) => ({ ...flds, value: val }));
    },
  });
  const [gstNumber, setGstNumber] = useState({
    valueName: "gstNumber",
    label: "GSTIN",
    type: "text",
    required: true,
    value: company && company.gstNumber ? company.gstNumber : "",
    handleChange: (val) => {
      setGstNumber((flds) => ({ ...flds, value: val }));
    },
  });
  const [contactNumber, setContactNumber] = useState({
    valueName: "contactNumber",
    label: "Contact No.",
    type: "number",
    required: true,
    value: company && company.contactNumber ? company.contactNumber : "",
    handleChange: (val) => {
      setContactNumber((flds) => ({ ...flds, value: val }));
    },
  });
  const [billNumberPrefix, setBillNumberPrefix] = useState({
    valueName: "billNumberPrefix",
    label: "Bill No. prefix",
    type: "text",
    required: true,
    value: company && company.billNumberPrefix ? company.billNumberPrefix : "",
    handleChange: (val) => {
      setBillNumberPrefix((flds) => ({ ...flds, value: val }));
    },
  });
  const renderField = (inputProps, md, xs) => {
    if (inputProps) {
      return (
        <div
          key={inputProps.valueName}
          className={`col-${xs} col-md-${md} px-2`}
        >
          <Input key={inputProps.valueName} inputProps={inputProps} />
        </div>
      );
    } else return null;
  };
  const handleSubmit = (event) => {
    const fieldsObject = {};
    event.preventDefault();
    fieldsObject[`${companyName.valueName}`] = companyName.value;
    fieldsObject[`${country.valueName}`] = country.value;
    fieldsObject[`${contactNumber.valueName}`] = +contactNumber.value;
    fieldsObject["address"] = {
      [`${addressLine1.valueName}`]: addressLine1.value,
      [`${addressLine2.valueName}`]: addressLine2.value,
      [`${addressLine3.valueName}`]: addressLine3.value,
    };
    fieldsObject[`${state.valueName}`] = state.value;
    fieldsObject[`${gstNumber.valueName}`] = gstNumber.value;
    fieldsObject[`${billNumberPrefix.valueName}`] = billNumberPrefix.value;
    if (company && company._id) {
      for (let i in fieldsObject) {
        if (company[i]) {
          if (typeof company[i] !== "object") {
            if (!fieldsObject[i])
              fieldsObject[i] = typeof company[i] === "number" ? 0 : "";
            else if (company[i] === fieldsObject[i]) delete fieldsObject[i];
          } else {
            let flag = 0;
            for (let j in fieldsObject[i]) {
              if (fieldsObject[i][j] !== company[i][j]) {
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
      console.log("update");
      console.log(fieldsObject);
      dispatch(updateCompany(fieldsObject, company._id, props.closeModal));
    } else {
      console.log("create");
      dispatch(createCompany(fieldsObject, props.closeModal));
    }
  };
  return (
    <div className="company-form">
      <form
        onSubmit={handleSubmit}
        className="company-form__modal-box row mx-0"
      >
        {company && company._id && (
          <div className="close-button" onClick={() => props.closeModal()}>
            <img src={closeIcon} />
          </div>
        )}
        <h1 className="col-12 px-0">Create Company</h1>
        {renderField(companyName, 6, 12)}
        {renderField(contactNumber, 6, 12)}
        {renderField(addressLine1, 12, 12)}
        {renderField(addressLine2, 12, 12)}
        {renderField(addressLine3, 12, 12)}
        {renderField(state, 12, 12)}
        {renderField(country, 12, 12)}
        {renderField(gstNumber, 4, 6)}

        {renderField(billNumberPrefix, 4, 6)}

        <div className="col-12 col-md-4 px-0 company-form__btn-container">
          <button className="company-form__submit-btn" disabled={loading}>
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
