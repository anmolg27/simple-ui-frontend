import React, { useState, useEffect } from "react";
import Input from "../input/input";
import uniqid from "uniqid";
import closeIcon from "../../icons/closeIcon.png";
import "./styles.css";
export default function CounterSale(props) {
  const [tableFields, setTableFields] = useState([]);

  const generateField = () => {
    let tempField = {};
    tempField["id"] = uniqid("counterSale-");
    tempField["cust"] = {
      label: "CUST",
      type: "text",
      handleChange: (val) => {
        setTableFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              fld.cust.value = val;
            }
            return fld;
          })
        );
      },
      value: "",
    };
    tempField["itemDescription"] = {
      label: "Item Description",
      type: "text",
      handleChange: (val) => {
        setTableFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              fld.itemDescription.value = val;
            }
            return fld;
          })
        );
      },
      value: "",
    };
    tempField["batch"] = {
      label: "Batch",
      type: "number",
      handleChange: (val) => {
        setTableFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              fld.batch.value = val;
            }
            return fld;
          })
        );
      },
      value: "",
    };
    tempField["qty"] = {
      label: "Qty",
      type: "text",
      handleChange: (val) => {
        setTableFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              fld.qty.value = val;
            }
            return fld;
          })
        );
      },
      value: "",
    };
    tempField["rate"] = {
      label: "Rate",
      type: "number",
      handleChange: (val) => {
        setTableFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              fld.rate.value = val;
            }
            return fld;
          })
        );
      },
      value: "",
    };

    tempField["amount"] = {
      label: "Amount",
      type: "number",
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
  useEffect(() => {
    setTableFields([generateField()]);
  }, []);
  useEffect(() => {
    let temp = tableFields[tableFields.length - 1];
    if (
      temp &&
      temp.cust.value &&
      temp.itemDescription.value &&
      temp.batch.value &&
      temp.qty.value &&
      temp.rate.value &&
      temp.amount.value
    ) {
      setTableFields((flds) => [...flds, generateField()]);
    }
  }, [tableFields]);
  const handleDelete = (id) => {
    let fld = tableFields[tableFields.findIndex((fld) => fld.id === id)];
    if (
      fld.cust.value &&
      fld.itemDescription.value &&
      fld.batch.value &&
      fld.qty.value &&
      fld.rate.value &&
      fld.amount.value
    ) {
      setTableFields((flds) => flds.filter((fld) => fld.id !== id));
    }
  };
  const renderTableField = (field, i) => {
    return (
      <div key={field.id} className="bill-challan-table px-0 col-12 row mx-0">
        <div className="col-md-2 col-6">
          <Input inputProps={field.cust} />
        </div>
        <div className="col-md-3 col-3">
          <Input inputProps={field.itemDescription} />
        </div>
        <div className="col-md-2 col-3">
          <Input inputProps={field.batch} />
        </div>
        <div className="col-md-2 col-3">
          <Input inputProps={field.qty} />
        </div>
        <div className="col-md-2 col-3">
          <Input inputProps={field.rate} />
        </div>
        <div className="col-md-1 col-3">
          <Input inputProps={field.amount} />
        </div>
        {tableFields.length - 1 > i && (
          <img src={closeIcon} onClick={() => handleDelete(field.id)} />
        )}
      </div>
    );
  };

  return (
    <>
      <h5>{props.heading}</h5>
      <form className="counter-sale-form row">
        <div className="counter-sale-table-container col-12 mx-0">
          {tableFields.length > 0 &&
            tableFields.map((field, i) => renderTableField(field, i))}
        </div>
      </form>
    </>
  );
}
