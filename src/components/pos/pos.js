import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveBill } from "../../redux/actions/transactionAction";
import Input from "../input/input";
import axios from "axios";
import "./styles.css";
import uniqid from "uniqid";
import { url } from "../../utils/url";
import closeIcon from "../../icons/closeIcon.png";
import BillingModal from "../billing-modal/billing-modal";
export default function Pos(props) {
  const [showBillModal, setShowBillModal] = useState(false);
  const dispatch = useDispatch();
  const [bill, setBill] = useState(null);
  const [gstStructure, setGstStructure] = useState({
    valueName: "gstStructure",
    label: "Gst Structure",
    type: "dropdown",
    options: ["bill wise", "product wise"],
    required: true,

    value: "bill wise",
    handleChange: (val) => {
      setGstStructure((flds) => ({ ...flds, value: val }));
    },
  });
  const [gst, setGst] = useState({
    valueName: "gst",
    label: "G.S.T.",
    type: "number",
    options: ["---", "5", "12", "18", "28"],
    required: true,
    disabled: false,
    value: "5",
    handleChange: (val) => {
      if (+val < 50 || +val > 0) setGst((flds) => ({ ...flds, value: val }));
    },
  });
  const [discountOnBillType, setDiscountOnBillType] = useState({
    valueName: "discountOnBillType",
    label: "Discount On Bill Type",
    type: "dropdown",
    options: ["%", "cash"],
    required: true,
    value: "%",
    handleChange: (val) => {
      setDiscountOnBillType((flds) => ({ ...flds, value: val }));
    },
  });
  const [discountOnBill, setDiscountOnBill] = useState({
    valueName: "discountOnBill",
    label: "Discount On Bill",
    type: "number",
    required: true,
    value: "0",
    handleChange: (val) => {
      setDiscountOnBill((flds) => ({ ...flds, value: +val || "" }));
    },
  });
  const [customerName, setCustomerName] = useState({
    valueName: "customerName",
    label: "Customer Name",
    type: "text",
    required: true,
    value: "",
    handleChange: (val) => {
      setCustomerName((flds) => ({ ...flds, value: val }));
    },
  });
  const [mobileNumber, setMobileNumber] = useState({
    valueName: "mobileNumber",
    label: "Mobile No.",
    type: "number",
    required: true,
    value: "",
    handleChange: (val) => {
      setCustomer(null);
      setMobileNumber((flds) => ({ ...flds, value: val }));
    },
  });
  const [tableFields, setTableFields] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [totalGst, setTotalGst] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [checkLoading, setCheckLoading] = useState(false);
  const [customer, setCustomer] = useState(null);
  const generateField = () => {
    let tempField = {};
    tempField["id"] = uniqid("counterSale-");
    tempField["productName"] = {
      label: "Product Name",
      type: "text",
      handleChange: (val) => {
        setTableFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              fld.productName.value = val;
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
              let v = +val;
              if (isNaN(v)) v = "";
              else {
                if (v < 0) v = "";
              }
              if (+v === 0) v = "";
              fld.rate.value = v;
            }
            return fld;
          })
        );
      },
      value: "",
    };
    tempField["discount"] = {
      label: "Discount %",
      type: "number",
      min: "0",
      max: "100",
      handleChange: (val) => {
        // if ((+val || 0) >= 0 || (+val || 0) <= 100)
        setTableFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              let v = +val || 0;
              if (v > 100) v = 100;
              if (v <= 0) v = "";
              fld.discount.value = v;
            }
            return fld;
          })
        );
      },
      value: "0",
    };
    tempField["gst"] = {
      label: "G.S.T",
      min: "0",
      max: "100",

      type: "number",
      handleChange: (val) => {
        // if ((+val || 0) >= 0 || (+val || 0) <= 100)
        setTableFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              let v = +val || 0;
              if (v > 100) v = 100;
              if (v <= 0) v = "";
              fld.gst.value = v;
            }
            return fld;
          })
        );
      },
      value: "0",
    };
    tempField["quantity"] = {
      label: "Qty",
      min: "0",

      type: "number",
      handleChange: (val) => {
        console.log("vvvv");
        console.log(val);
        setTableFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              let v = +val;
              if (isNaN(v)) v = "";
              else {
                if (v < 0) v = "";
              }
              if (+v === 0) v = "";
              fld.quantity.value = v;
            }
            return fld;
          })
        );
      },
      value: "0",
    };

    return tempField;
  };
  useEffect(() => {
    setTableFields([generateField()]);
  }, []);
  useEffect(() => {
    let temp = tableFields[tableFields.length - 1];
    if (temp && temp.productName.value) {
      setTableFields((flds) => [...flds, generateField()]);
    }
  }, [tableFields]);
  useEffect(() => {
    if (tableFields.length > 0) {
      if (gstStructure.value === "bill wise") {
        setTableFields((prevFields) =>
          prevFields.map((prevField) => ({
            ...prevField,
            ["gst"]: { ...prevField["gst"], disabled: true, value: 0 },
          }))
        );
        setGst((field) => ({
          ...field,
          disabled: false,
          options: field.options.filter((option) => option !== "---"),
          value: "5",
        }));
      } else {
        setGst((field) => ({
          ...field,
          disabled: true,
          options: ["---", ...field.options].reduce((a, b) => {
            if (!a.includes(b)) a.push(b);
            return a;
          }, []),
          value: "---",
        }));
        setTableFields((prevFields) =>
          prevFields.map((prevField) => ({
            ...prevField,
            ["gst"]: { ...prevField["gst"], disabled: false },
          }))
        );
      }
    }
  }, [tableFields.length, gstStructure.value]);

  useEffect(() => {
    if (tableFields.length > 0) {
      console.log("go");
      let tempSubTotal, tempDiscount, tempGst, tempTotal;
      tempSubTotal = tableFields.reduce((a, b) => {
        a += (+b.rate.value || 0) * (+b.quantity.value || 0);
        return a;
      }, 0);
      tempDiscount = tableFields.reduce((a, b) => {
        a +=
          (((+b.rate.value || 0) * (+b.discount.value || 0)) / 100) *
          (+b.quantity.value || 0);
        return a;
      }, 0);

      if (gstStructure.value === "bill wise") {
        tempGst = ((tempSubTotal - tempDiscount) * (+gst.value || 0)) / 100;
      } else {
        tempGst = tableFields.reduce((a, b) => {
          let t =
            (+b.rate.value || 0) -
            ((+b.rate.value || 0) * +b.discount.value) / 100;
          if (t < 0) t = 0;
          a += (t * +b.gst.value * (+b.quantity.value || 0)) / 100;
          return a;
        }, 0);
      }
      tempTotal = tempSubTotal - tempDiscount + tempGst;
      if (discountOnBillType.value === "cash")
        tempDiscount += +discountOnBill.value || 0;
      else tempDiscount += (tempTotal * (+discountOnBill.value || 0)) / 100;
      tempTotal = tempSubTotal - tempDiscount + tempGst;
      setTotalDiscount(tempDiscount < 0 ? 0 : tempDiscount.toFixed(2));
      setSubTotal(tempSubTotal < 0 ? 0 : tempSubTotal.toFixed(2));
      setTotalGst(tempGst < 0 ? 0 : tempGst.toFixed(2));
      setTotal(tempTotal < 0 ? 0 : tempTotal.toFixed(2));
    }
  }, [
    ...tableFields.map((tbf) => tbf.rate.value),
    ...tableFields.map((tbf) => tbf.quantity.value),
    ...tableFields.map((tbf) => tbf.discount.value),
    ...tableFields.map((tbf) => tbf.gst.value),
    gstStructure.value,
    discountOnBill.value,
    discountOnBillType.value,
    gst.value,
  ]);
  const handleDelete = (id) => {
    let fld = tableFields[tableFields.findIndex((fld) => fld.id === id)];
    setTableFields((flds) => flds.filter((fld) => fld.id !== id));
  };
  const handleCustomerCheck = (mobileNumber) => {
    if (!mobileNumber) return alert("Please enter mobile number first");
    setCheckLoading(true);
    axios
      .get(`${url}/customers/mobile-number?mobileNumber=${mobileNumber}`)
      .then((res) => {
        setCustomer(res.data.customer);
        setCustomerName((fld) => ({
          ...fld,
          value: res.data.customer.customerName,
        }));
        setCheckLoading(false);
      })
      .catch((err) => {
        setCustomer(null);
        setCheckLoading(false);
      });
  };
  const renderTableField = (field, i) => {
    return (
      <div key={field.id} className="pos__table-row pl-0 pr-4 col-12 row mx-0">
        <div className="col-md-4 col-6">
          <Input inputProps={field.productName} />
        </div>
        <div className="col-md-2 col-3">
          <Input inputProps={field.rate} />
        </div>
        <div className="col-md-2 col-3">
          <Input inputProps={field.quantity} />
        </div>
        <div className="col-md-2 col-3">
          <Input inputProps={field.discount} />
        </div>

        <div className="col-md-2 col-3">
          <Input inputProps={field.gst} />
        </div>
        {i > 0 && (
          <img src={closeIcon} onClick={() => handleDelete(field.id)} />
        )}
      </div>
    );
  };
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
  const handleSubmit = (e) => {
    if (!customerName.value) return alert("Please enter customer name");
    const fieldsObject = {};
    fieldsObject["gstStructure"] = gstStructure.value;
    fieldsObject["gst"] = +gst.value || 0;
    fieldsObject["discountOnBill"] = {
      value: discountOnBill.value,
      discountType: discountOnBillType.value,
    };

    fieldsObject["customer"] = { customerName: customerName.value };
    fieldsObject["items"] = [];
    tableFields.forEach((tbf, i) => {
      if (i < tableFields.length - 1)
        fieldsObject.items.push({
          productName: tbf.productName.value,
          rate: +tbf.rate.value || 0,
          discount: +tbf.discount.value || 0,
          quantity: +tbf.quantity.value || 0,
          gst: +tbf.gst.value || 0,
        });
    });
    let itemsInvalid = false;
    if (fieldsObject.items.length === 0) itemsInvalid = true;
    else
      itemsInvalid = fieldsObject.items.some(
        (item) => item.rate === 0 || item.quantity === 0
      );

    if (itemsInvalid)
      return alert("Please enter valid product's quantity and rate");
    setBill(fieldsObject);
    setShowBillModal(true);
  };
  const handleSave = (e) => {
    if (!customerName.value) return alert("Please enter customer name");
    const fieldsObject = {};
    fieldsObject["gstStructure"] = gstStructure.value;
    fieldsObject["gst"] = +gst.value || 0;
    fieldsObject["discountOnBill"] = {
      value: discountOnBill.value,
      discountType: discountOnBillType.value,
    };

    fieldsObject["customer"] = { customerName: customerName.value };
    fieldsObject["items"] = [];
    tableFields.forEach((tbf, i) => {
      if (i < tableFields.length - 1)
        fieldsObject.items.push({
          productName: tbf.productName.value,
          rate: +tbf.rate.value || 0,
          discount: +tbf.discount.value || 0,
          quantity: +tbf.quantity.value || 0,
          gst: +tbf.gst.value || 0,
        });
    });
    let itemsInvalid = false;
    if (fieldsObject.items.length === 0) itemsInvalid = true;
    else
      itemsInvalid = fieldsObject.items.some(
        (item) => item.rate === 0 || item.quantity === 0
      );

    if (itemsInvalid)
      return alert("Please enter valid product's quantity and rate");

    if (customer && customer._id) {
      console.log("customer id is");
      console.log(customer._id);
      dispatch(saveBill(fieldsObject, null, customer._id));
    } else {
      // console.log("customer is");
      // console.log(customer);

      dispatch(saveBill(fieldsObject));
    }

    // console.log("fields object");
    // console.log(fieldsObject);
  };
  return (
    <>
      {showBillModal && (
        <BillingModal
          total={total}
          closeModal={() => setShowBillModal(false)}
          bill={bill}
          customer={customer}
        />
      )}
      <button
        onClick={() => props.history.push("/home")}
        className="back-button"
      >
        &larr; Back
      </button>
      <div className="pos row mx-0">
        {renderField(customerName, 12, 2)}
        {renderField(mobileNumber, 12, 2)}
        <div className="col-12 col-md-2 px-1 pos__mobile-check">
          <button
            disabled={checkLoading || (customer && customer.customerName)}
            onClick={() => handleCustomerCheck(mobileNumber.value)}
            className={`pos__mobile-check-button ${
              customer &&
              customer.customerName &&
              "border border-success text-muted"
            }`}
          >
            {checkLoading ? (
              <>
                Checking{" "}
                <div className="spinner-border text-success" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </>
            ) : customer && customer.customerName ? (
              <>Checked &#10003;</>
            ) : (
              <>&larr;Check Customer</>
            )}
          </button>
        </div>
        {renderField(gstStructure, 12, 2)}
        {renderField(discountOnBill, 12, 2)}
        {renderField(discountOnBillType, 12, 2)}
        <div className="pos__table col-12 col-md-8 col-lg-9 mb-2 py-0 pl-0">
          {tableFields.length > 0 &&
            tableFields.map((field, i) => renderTableField(field, i))}
        </div>
        <div className="pos__footer-displays col-lg-3 col-md-4 pr-0">
          <div>
            <h2>G.S.T</h2>
            <select
              disabled={gst.disabled}
              onChange={(e) => gst.handleChange(e.target.value)}
              value={gst.value}
            >
              {gst.options.map((option) => (
                <option value={option} key={option}>
                  {option}%
                </option>
              ))}
            </select>
          </div>
          <div>
            <h2>SubTotal</h2>
            <p>{subTotal}</p>
          </div>
          <div>
            <h2>Discount</h2>
            <p>{totalDiscount}</p>
          </div>
          <div>
            <h2>G.S.T</h2>
            <p>{totalGst}</p>
          </div>
          <div>
            <h2>Total</h2>
            <p>{total}</p>
          </div>
          <div className="pos__footer-button-box">
            <button onClick={handleSubmit} className="bg-success text-light">
              Proceed to Payment
            </button>
            <button onClick={handleSave} className="bg-primary ml-3 text-light">
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
