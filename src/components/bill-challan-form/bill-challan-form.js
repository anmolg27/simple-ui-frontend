import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Input from "../input/input";
import uniqid from "uniqid";
import { returnDate } from "../../utils/functions";
import closeIcon from "../../icons/closeIcon.png";
import "./styles.css";
export default function BillChallanForm(props) {
  const [tableFields, setTableFields] = useState([]);
  const [heading, setHeading] = useState("");
  const [name, setName] = useState({
    label: "Name",
    type: ["text"],
    options: [],
    value: "",
    handleChange: (val) => setName((nme) => ({ ...nme, value: val })),
  });
  const [store, setStore] = useState({
    label: "Store",
    type: "dropdown",
    options: [],
    value: "",
    handleChange: (val) => setStore((nme) => ({ ...nme, value: val })),
  });
  const [billNumber, setBillNumber] = useState({
    label: "Bill No.",
    type: "text",
    value: "",
    handleChange: (val) => setBillNumber((bll) => ({ ...bll, value: val })),
  });
  const [date, setDate] = useState({
    label: "Date",
    type: "date",
    value: returnDate(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      new Date().getDate()
    ),
    handleChange: (val) => setDate((dte) => ({ ...dte, value: val })),
  });
  const [type, setType] = useState({
    label: "Type",
    type: "text",
    value: "",
    handleChange: (val) => setType((tpe) => ({ ...tpe, value: val })),
  });
  const [item, setItem] = useState({
    label: "Item",
    type: "text",
    value: "",
    disabled: true,
    handleChange: (val) => setItem((tpe) => ({ ...tpe, value: val })),
  });
  const [company, setCompany] = useState({
    label: "Company",
    type: "text",
    disabled: true,
    value: "",
    handleChange: (val) => setCompany((tpe) => ({ ...tpe, value: val })),
  });
  const [expiry, setExpiry] = useState({
    label: "Expiry",
    type: "text",
    disabled: true,
    value: "",
    handleChange: (val) => setExpiry((tpe) => ({ ...tpe, value: val })),
  });
  const [chall, setChall] = useState({
    label: "Chall",
    type: "text",
    disabled: true,
    value: "",
    handleChange: (val) => setChall((tpe) => ({ ...tpe, value: val })),
  });
  const [stock, setStock] = useState({
    label: "Stock",
    type: "text",
    disabled: true,
    value: "",
    handleChange: (val) => setStock((tpe) => ({ ...tpe, value: val })),
  });
  const [valueOfGoods, setValueOfGoods] = useState({
    label: "Value of goods",
    type: "text",
    disabled: true,
    value: "0.00",
    handleChange: (val) => setValueOfGoods((tpe) => ({ ...tpe, value: val })),
  });
  const [discount, setDiscount] = useState({
    label: "Discount",
    type: "text",
    disabled: true,
    value: "",
    handleChange: (val) => setDiscount((tpe) => ({ ...tpe, value: val })),
  });
  const [gst, setGst] = useState({
    label: "GST",
    type: "number",
    disabled: true,
    value: "",
    handleChange: (val) => setGst((tpe) => ({ ...tpe, value: val })),
  });
  const { ledgers, loading: ledgersLoading } = useSelector(
    (state) => state.ledgers
  );
  const { products, loading: productsLoading } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    let netAmount = 0.0;
    tableFields.forEach((fields) => {
      if (fields["amount"].value)
        netAmount += parseFloat(fields["amount"].value);
    });
    setValueOfGoods((vls) => ({ ...vls, value: netAmount }));
  }, [tableFields]);
  useEffect(() => {
    if (products.length > 0) {
      let storeNames = [];
      products.forEach(
        (pdt) => !storeNames.includes(pdt.store) && storeNames.push(pdt.store)
      );
      setStore((vals) => ({ ...vals, options: storeNames }));
    }
  }, [products.length]);
  useEffect(() => {
    if (products.length > 0 && tableFields.length > 0 && store.value) {
      let storeProducts = [];
      products.forEach(
        (pdt) => pdt.store === store.value && storeProducts.push(pdt)
      );
      setTableFields((flds) =>
        flds.map((fld) => {
          fld.product.options = storeProducts.map((pdt) => pdt.id);
          fld.product.disabled = false;
          fld.product.handleChange = (val) => {
            setTableFields((fields) =>
              fields.map((feld) => {
                if (fld["id"] === feld["id"]) {
                  feld.product.value = val;
                  let rate;
                  if (props.location.search.includes("sale")) {
                    rate = storeProducts.find((pdt) => pdt.id === val).details
                      .mrp;
                    feld.rate.value = rate;
                  } else {
                    rate = storeProducts.find((pdt) => pdt.id === val).details
                      .pRate;
                    feld.pRate.value = rate;
                  }
                  rate = parseFloat(rate);
                  feld.qty.handleChange = (qtVal) => {
                    setTableFields((qtflds) =>
                      qtflds.map((qtfld) => {
                        if (feld["id"] === qtfld["id"]) {
                          qtfld.qty.value = qtVal;
                          qtfld.amount.value = parseFloat(qtVal) * rate;
                        }
                        return qtfld;
                      })
                    );
                  };
                }
                return feld;
              })
            );
          };
          fld.qty.disabled = false;
          // fld.qty.handleChange()
          // fld.product.value = "";
          return fld;
        })
      );
    }
  }, [products.length, tableFields.length, store.value]);
  useEffect(() => {
    let formType = props.location.pathname.split("/");
    formType = formType[formType.length - 1];
    let transactionType = props.location.search.split("=");
    transactionType = transactionType[transactionType.length - 1];
    if (transactionType === "sales") {
      if (formType === "newBill") setHeading("Sale Entry");
      else if (formType === "newChallan") setHeading("Sale Challan Entry");
    } else if (transactionType === "purchase") {
      if (formType === "newBill") setHeading("Purchase Entry");
      else if (formType === "newChallan") setHeading("Purchase Challan Entry");
    }
  }, []);
  useEffect(() => {
    if (ledgers) {
      setName((vals) => ({
        ...vals,
        options: ledgers.map((ldg) => ldg.ledgerName),
      }));
    }
  }, [ledgers]);
  const generateField = () => {
    let tempField = {};
    tempField["id"] = uniqid("billChallan-");
    tempField["product"] = {
      label: "Product",
      type: "dropdown",
      disabled: true,
      options: [],
      handleChange: (val) => {
        setTableFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              fld.product.value = val;
            }
            return fld;
          })
        );
      },
      value: "",
    };
    tempField["pack"] = {
      label: "Pack",
      type: "number",
      disabled: true,
      handleChange: (val) => {
        setTableFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              fld.pack.value = val;
            }
            return fld;
          })
        );
      },
      value: "",
    };
    tempField["qty"] = {
      label: "Qty",
      type: "number",
      disabled: true,
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
    tempField["free"] = {
      label: "Free",
      type: "text",
      disabled: true,
      handleChange: (val) => {
        setTableFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              fld.free.value = val;
            }
            return fld;
          })
        );
      },
      value: "",
    };
    if (props.location.search.includes("sale")) {
      tempField["rate"] = {
        label: "Rate",
        disabled: true,
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
    } else {
      tempField["pRate"] = {
        label: "P.rate",
        type: "number",
        disabled: true,
        handleChange: (val) => {
          setTableFields((fields) =>
            fields.map((fld) => {
              if (fld["id"] === tempField["id"]) {
                fld.pRate.value = val;
              }
              return fld;
            })
          );
        },
        value: "",
      };
    }

    tempField["dis1"] = {
      label: "Dis%1",
      type: "number",
      disabled: true,
      handleChange: (val) => {
        setTableFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              fld.dis1.value = val;
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
      temp.product.value &&
      // temp.pack.value &&
      temp.qty.value
      // temp.free.value &&
      // ((temp.rate && temp.rate.value) || (temp.pRate && temp.pRate.value)) &&
      // temp.dis1.value &&
      // temp.amount.value
    ) {
      setTableFields((flds) => [...flds, generateField()]);
    }
  }, [tableFields]);
  const handleDelete = (id) => {
    let fld = tableFields[tableFields.findIndex((fld) => fld.id === id)];
    if (
      fld.product.value &&
      // fld.pack.value &&
      fld.qty.value
      // fld.free.value &&
      // ((fld.rate && fld.rate.value) || (fld.pRate && fld.pRate.value)) &&
      // fld.dis1.value &&
      // fld.amount.value
    ) {
      setTableFields((flds) => flds.filter((fld) => fld.id !== id));
    }
  };
  const renderTableField = (field, i) => {
    return (
      <div key={field.id} className="bill-challan-table px-0 col-12 row mx-0">
        <div className="col-md-3 col-6">
          <Input inputProps={field.product} />
        </div>
        <div className="col-md-1 col-3">
          <Input inputProps={field.pack} />
        </div>
        <div className="col-md-1 col-3">
          <Input inputProps={field.qty} />
        </div>
        <div className="col-md-2 col-3">
          <Input inputProps={field.free} />
        </div>
        <div className="col-md-1 col-3">
          {field.rate ? (
            <Input inputProps={field.rate} />
          ) : (
            <Input inputProps={field.pRate} />
          )}
        </div>
        <div className="col-md-1 col-3">
          <Input inputProps={field.dis1} />
        </div>
        <div className="col-md-3 col-3">
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
      <button
        onClick={() => props.history.push("/home/transactions")}
        className="back-button"
      >
        &larr; Back
      </button>
      <h5>{heading}</h5>
      <form className="bill-challan-form row">
        <div className="bill-challan-col col-2 px-0">
          <Input inputProps={name} />
          {/* <Input inputProps={billNumber} /> */}
        </div>
        <div className="bill-challan-col col-2 px-0">
          <Input inputProps={store} />
          {/* <Input inputProps={billNumber} /> */}
        </div>
        <div className="bill-challan-col col-2 px-0">
          {/* <Input inputProps={name} /> */}
          <Input inputProps={billNumber} />
        </div>
        <div className="bill-challan-col col-3 px-0">
          <Input inputProps={date} />
        </div>
        <div className="bill-challan-col col-2 px-0">
          <Input inputProps={type} />
        </div>
        <div className="bill-challan-table-container col-12 mx-0">
          {tableFields.length > 0 &&
            tableFields.map((field, i) => renderTableField(field, i))}
        </div>

        <div className="bill-challan-bottom-fields my-1 px-0 col-12 row mx-0">
          <div className="col-md-3 col-3 px-0">
            <Input inputProps={item} />
            <Input inputProps={company} />
          </div>
          <div className="col-md-3 col-3 px-0">
            <Input inputProps={expiry} />
            <Input inputProps={chall} />
          </div>
          <div className="col-md-3 col-3 px-0">
            <Input inputProps={stock} />
            <Input inputProps={valueOfGoods} />
          </div>
          <div className="col-md-3 col-3 px-0">
            <Input inputProps={discount} />
            <Input inputProps={gst} />
          </div>
        </div>
      </form>
    </>
  );
}
