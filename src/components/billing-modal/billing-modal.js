import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import Input from "../input/input";

import closeIcon from "../../icons/closeIcon.png";
import { saveBill, payBill } from "../../redux/actions/transactionAction";
import { useSelector, useDispatch } from "react-redux";
import "./styles.css";
export default function BillingModal(props) {
  const { billID, total, closeModal, bill, customer } = props;
  const dispatch = useDispatch();
  const [balance, setBalance] = useState(total);
  const [paymentFields, setPaymentFields] = useState([]);
  const [proceedLoading, setProceedLoading] = useState(false);
  const [laterLoading, setLaterLoading] = useState(false);
  const generateField = () => {
    let tempField = {};
    tempField["id"] = uniqid("billing-");
    tempField["modeOfPayment"] = {
      label: "Mode Of Payment",
      type: "dropdown",
      options: ["CASH", "CARD", "CHEQUE", "UPI", "OTHER"],
      handleChange: (val) => {
        setPaymentFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              fld.modeOfPayment.value = val;
            }
            return fld;
          })
        );
      },
      value: "CASH",
    };

    tempField["amount"] = {
      label: "Amount Paid",
      type: "number",
      handleChange: (val) => {
        setPaymentFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              fld.amount.value = val;
            }
            return fld;
          })
        );
      },
      value: "0",
    };

    return tempField;
  };
  // console.log("customer is");
  // console.log(billID);
  useEffect(() => {
    if (paymentFields.length === 0) setPaymentFields([generateField()]);
    else if (
      parseFloat(paymentFields[paymentFields.length - 1].amount.value || 0) > 0
    ) {
      setPaymentFields((fields) => [...fields, generateField()]);
    }
    if (paymentFields.length > 0) {
      let tempAmount = 0;
      paymentFields.forEach((field) => {
        tempAmount += parseFloat(field.amount.value) || 0;
      });
      setBalance(Math.round((parseFloat(total) - tempAmount) * 100) / 100);
    }
  }, [paymentFields, total]);
  const renderField = (inputProps) => {
    if (inputProps) {
      return <Input key={inputProps.valueName} inputProps={inputProps} />;
    } else return null;
  };
  const handlePaymentClose = (id) => {
    setPaymentFields((fields) => fields.filter((field) => field.id !== id));
  };
  const handleSubmitClick = (type) => {
    let flag = 0;
    let sLoading = type === "all" ? setProceedLoading : setLaterLoading;
    paymentFields.forEach((field) => {
      if ((parseFloat(field.amount.value) || 0) < 0) flag = 1;
    });
    if (flag === 1) return alert("Please enter valid amount");
    let fieldsObject = {};
    fieldsObject["modeOfPayment"] = paymentFields
      .filter((field) => (parseFloat(field.amount.value) || 0) > 0)
      .map((field) => ({
        type: field.modeOfPayment.value,
        amount: parseFloat(field.amount.value),
      }));

    if (billID) {
      if (type === "all") {
        if (balance > 1 || balance < -1)
          return alert("Please enter valid amount");
      } else {
        if (balance < -1) return alert("Please enter valid amount");
        fieldsObject["modeOfPayment"].push({
          type: "ledger",
          amount: balance,
        });
      }
      dispatch(payBill(fieldsObject, sLoading, billID));
    } else {
      fieldsObject = { ...bill, ...fieldsObject };
      fieldsObject["hasPaid"] = true;
      if (type === "all") {
        if (balance > 1 || balance < -1)
          return alert("Please enter valid amount");
      } else {
        if (balance < -1) return alert("Please enter valid amount");
        fieldsObject["modeOfPayment"].push({
          type: "ledger",
          amount: balance,
        });
      }
      if (customer && customer._id)
        dispatch(saveBill(fieldsObject, sLoading, customer._id));
      else dispatch(saveBill(fieldsObject, sLoading));
    }
  };
  return (
    <div className="bill-modal">
      <div className="bill-modal__box">
        <div className="bill-modal__close-button" onClick={() => closeModal()}>
          <span className="h1 fa fa-times fa-lg"></span>
        </div>
        <div className="row mx-0 bill-modal__method-box">
          {paymentFields.length > 0 &&
            paymentFields.map((field, i) => (
              <div key={field.id} className="col-12 px-0 mx-0 row">
                <div className="col-7 px-1">
                  {renderField(field.modeOfPayment)}
                </div>
                <div className="col-5 px-1">{renderField(field.amount)}</div>
                {paymentFields.length - 1 > i && (
                  <img
                    onClick={() => handlePaymentClose(field["id"])}
                    src={closeIcon}
                  />
                )}
              </div>
            ))}
        </div>
        <div className="bill-modal__balance text-right mt-2 mx-0">
          <h2 className="d-inline-block">Balance: &nbsp;</h2>
          <h2 className="d-inline-block">
            {(+balance || 0).toFixed(2)}&#8377;
          </h2>
        </div>
        <button
          onClick={() => handleSubmitClick("all")}
          className="bill-modal__print-button"
          disabled={proceedLoading}
        >
          Proceed to print
        </button>
        <button
          onClick={() => handleSubmitClick("later")}
          className="bill-modal__later-button"
          disabled={customer && customer._id && !laterLoading ? false : true}
        >
          Pay Remaining Later
        </button>
      </div>
    </div>
  );
}
