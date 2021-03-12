import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import uniqid from "uniqid";
import "./styles.css";
import closeIcon from "../../icons/closeIcon.png";
import Input from "../input/input";
import { extraCharge } from "../../redux/actions/customerAction";
export default function AddOn(props) {
  const dispatch = useDispatch();
  const { loading, customers } = useSelector((state) => state.customers);
  const { closeModal, selectedRoom } = props;
  const [tableFields, setTableFields] = useState([]);
  useEffect(() => {
    if (tableFields.length > 0) {
      setTableFields((fields) =>
        fields.map((field) => {
          if (field.charge.value) {
            field.amount.value =
              (parseFloat(field.charge.value) || 0) *
              (parseFloat(field.quantity.value) || 0);
            field.quantity.handleChange = (val) => {
              setTableFields((flds) =>
                flds.map((fld) => {
                  if (fld["id"] === field["id"]) {
                    fld.quantity.value = val;
                    fld.amount.value =
                      (parseFloat(fld.charge.value) || 0) *
                      (parseFloat(val) || 0);
                  }
                  return fld;
                })
              );
            };
          }
          return field;
        })
      );
    }
  }, [tableFields.length]);
  useEffect(() => {
    if (
      tableFields.length > 0 &&
      customers.length > 0 &&
      selectedRoom.customerName &&
      selectedRoom.mobileNumber
    ) {
      let prevDetails = customers.find(
        (customer) =>
          parseInt(customer.mobileNumber) ===
          parseInt(selectedRoom.mobileNumber)
      ).extraCharges;
      let assetNames = [];
      // if (prevDetails && prevDetails.length > 0) {
      if (prevDetails && prevDetails.length > 0)
        assetNames = prevDetails
          .map((asset) => asset.assetName)
          .reduce((a, c) => {
            if (!a.includes(c)) a.push(c);
            return a;
          }, []);
      setTableFields((fields) =>
        fields.map((field) => {
          field.assetName.options = assetNames;
          field.assetName.handleChange = (val) => {
            setTableFields((flds) =>
              flds.map((fld) => {
                if (fld["id"] === field["id"]) {
                  fld.assetName.value = val;
                  // let charge = 0
                  // if (prevDetails && prevDetails.length > 0)

                  if (assetNames.includes(val)) {
                    let charge = parseFloat(
                      prevDetails.find((asset) => asset.assetName === val)
                        .charge
                    );
                    fld.charge.value = charge;
                    fld.amount.value =
                      charge * (parseFloat(fld.quantity.value) || 0);
                  }
                }

                return fld;
              })
            );
          };

          return field;
        })
      );
      // }
    }
  }, [tableFields.length, customers, selectedRoom]);
  const generateTableField = () => {
    let tempField = {};
    tempField["id"] = uniqid("asset-");
    tempField["assetName"] = {
      valueName: "assetName",
      label: "Asset Name",
      type: ["text"],
      options: [],
      handleChange: (val) => {
        setTableFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              fld.assetName.value = val;
            }
            return fld;
          })
        );
      },
      value: "",
    };
    tempField["charge"] = {
      label: "Charge",
      type: "number",
      handleChange: (val) => {
        setTableFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              fld.charge.value = val;
            }
            return fld;
          })
        );
      },
      value: "",
    };
    tempField["quantity"] = {
      label: "Quantity",
      type: "number",
      handleChange: (val) => {
        setTableFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              fld.quantity.value = val;
            }
            return fld;
          })
        );
      },
      value: "0",
    };

    tempField["amount"] = {
      label: "Amount",
      type: "number",
      disabled: true,
      handleChange: (val) => {
        setTableFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              fld.charge.value = val;
            }
            return fld;
          })
        );
      },
      value: "",
    };

    return tempField;
  };
  const handleFieldClose = (id) => {
    setTableFields((flds) => flds.filter((fld) => fld["id"] !== id));
  };
  const renderTableField = (field, i) => {
    return (
      <div key={field.id} className="addon-modal__table px-0 col-12 row mx-0">
        <div className="col-3">
          <Input inputProps={field.assetName} />
        </div>

        <div className="col-3">
          <Input inputProps={field.charge} />
        </div>
        <div className="col-3">
          <Input inputProps={field.quantity} />
        </div>
        <div className="col-3">
          <Input inputProps={field.amount} />
        </div>

        {tableFields.length - 1 > i && (
          <img
            onClick={() => handleFieldClose(field.id)}
            src={closeIcon}
            alt="close Icon"
          />
        )}
      </div>
    );
  };
  useEffect(() => {
    if (tableFields.length === 0) {
      setTableFields([generateTableField()]);
    }
    if (tableFields.length > 0) {
      if (
        tableFields[tableFields.length - 1].assetName.value &&
        tableFields[tableFields.length - 1].charge.value
      ) {
        setTableFields((fields) => [...fields, generateTableField()]);
      }
    }
  }, [tableFields]);
  const handleSubmit = () => {
    let assets = [];
    let notProperlyFilled = false;
    if (
      tableFields.every(
        (field) =>
          !field.assetName.value &&
          !field.charge.value &&
          (!field.quantity.value || parseInt(field.quantity.value) === 0)
      )
    )
      return alert("fill fields properly");
    tableFields.forEach((field) => {
      if (
        field.assetName.value &&
        field.charge.value &&
        field.quantity.value &&
        field.amount.value
      )
        assets.push({
          assetName: field.assetName.value,
          charge: field.charge.value,
          quantity: field.quantity.value,
          amount: field.amount.value,
        });
      if (
        (field.assetName.value && !field.charge.value) ||
        (!field.assetName.value && field.charge.value)
      )
        notProperlyFilled = true;
      if (
        field.assetName.value &&
        field.charge.value &&
        (!field.quantity.value || parseInt(field.quantity.value) === 0)
      )
        notProperlyFilled = true;
    });
    if (notProperlyFilled) return alert("Missing some fields");
    let fieldsObject = {
      assets: assets,
      customerName: selectedRoom.customerName,
      mobileNumber: selectedRoom.mobileNumber,
      customerId: selectedRoom.customerId,
    };
    dispatch(extraCharge(fieldsObject));
  };
  useEffect(() => {
    document
      .querySelector(".addon-modal")
      .addEventListener("click", (event) => {
        if (event.target.className === "addon-modal") {
          closeModal();
        }
      });
  }, []);
  return (
    <div className="addon-modal">
      <div className="addon-modal__box row mx-0">
        <div className="close-button" onClick={() => closeModal()}>
          <img src={closeIcon} alt="close" />
        </div>
        <h1>Add On</h1>
        <div className="row col-12 mx-0 add-on__details-box">
          <div className="col-4 px-2 add-on__detail-col">
            <h3>Name</h3>
            <p>{selectedRoom.customerName}</p>
          </div>
          <div className="col-4 px-2 add-on__detail-col">
            <h3>Room No.</h3>
            <p>{selectedRoom.roomNumber}</p>
          </div>
          <div className="col-4 px-2 add-on__detail-col">
            <h3>Mobile</h3>
            <p>{selectedRoom.mobileNumber}</p>
          </div>
        </div>
        <div className="addon-modal__table-container pr-5 pl-0 col-12 mx-0">
          {tableFields.length > 0 &&
            tableFields.map((field, i) => renderTableField(field, i))}
        </div>
        <div className="col-12 mx-0 add-on__submit-button-container">
          <button disabled={loading} onClick={() => handleSubmit()}>
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
    </div>
  );
}
