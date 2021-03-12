import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import { useDispatch, useSelector } from "react-redux";
import { editBillDetails } from "../../redux/actions/transactionAction";
import {
  returnDate,
  calculateAmount,
  calculateNumberOfDays,
} from "../../utils/functions";
import "./styles.css";
import closeIcon from "../../icons/closeIcon.png";
import Input from "../input/input";
export default function EditBill(props) {
  const { setShowModal, transactionId, details } = props;
  const dispatch = useDispatch();
  //   const [discountPercent, setDiscountPercent] = useState(details.discount);
  //   const [gst,setGst] = useState(details.gst)
  const { editLoading } = useSelector((state) => state.transactions);
  const [gst, setGst] = useState({
    valueName: "gst",
    label: "GST %",
    type: "number",
    value: details.gst,
    handleChange: (val) => {
      setGst((flds) => ({ ...flds, value: val }));
    },
  });
  const [discountPercent, setDiscountPercent] = useState({
    valueName: "discountPercent",
    label: "Discount %",
    type: "number",
    required: true,
    disabled: true,
    value: details.discountPercent,
    handleChange: (val) => {
      setDiscountPercent((flds) => ({ ...flds, value: val }));
    },
  });
  function calculateSubTotal(rooms, assets) {
    let temp = rooms.reduce((a, b) => {
      a += parseFloat(b.amount);
      return a;
    }, 0);
    if (assets.length > 0)
      temp += assets.reduce((a, b) => {
        a += parseFloat(b.amount);
        return a;
      }, 0);
    return temp;
  }

  const [subTotal, setSubTotal] = useState({
    valueName: "subTotal",
    label: "Sub Total",
    type: "number",
    disabled: true,
    value: calculateSubTotal(details.rooms, details.extraCharges),

    handleChange: (val) => {
      setSubTotal((flds) => ({ ...flds, value: val }));
    },
  });
  const [discountAmount, setDiscountAmount] = useState({
    valueName: "discountAmount",
    label: "Total Discount",
    type: "number",
    disabled: true,
    value:
      (calculateSubTotal(details.rooms, details.extraCharges) *
        details.discountPercent) /
      100,

    handleChange: (val) => {
      setDiscountAmount((flds) => ({ ...flds, value: val }));
    },
  });
  const [total, setTotal] = useState({
    valueName: "bill",
    label: "Total",
    type: "number",
    disabled: true,
    value: details.bill,
    handleChange: (val) => {
      setTotal((flds) => ({ ...flds, value: val }));
    },
  });
  const [tableFields, setTableFields] = useState(
    details.rooms.map((room) =>
      generateTableField(
        room.roomNumber,
        room.rate,
        room.checkIn,
        room.checkOut,
        room.amount
      )
    )
  );
  const [assetTableFields, setAssetTableFields] = useState(
    details.extraCharges.length > 0
      ? details.extraCharges.map((asset) =>
          generateAssetField(
            asset.assetName,
            asset.charge,
            asset.quantity,
            asset.discountPerUnit,
            asset.amount
          )
        )
      : []
  );
  function generateAssetField(
    assetName = "",
    rate = "",
    quantity = "",
    discountPerUnit = "",
    amount = ""
  ) {
    let tempField = {};
    tempField["id"] = uniqid("assetstable-");
    tempField["assetName"] = {
      label: "Asset Name",
      type: "text",
      handleChange: (val) => {
        setAssetTableFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              fld.assetName.value = val;
            }
            return fld;
          })
        );
      },
      value: assetName,
    };

    tempField["rate"] = {
      label: "Rate",
      type: "number",
      handleChange: (val) => {
        setAssetTableFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              fld.rate.value = val;
              fld.amount.value =
                Math.round(
                  ((parseFloat(val) || 0) -
                    (parseFloat(fld.discountPerUnit.value) || 0)) *
                    (parseInt(fld.quantity.value) || 0) *
                    100
                ) / 100;
            }
            return fld;
          })
        );
      },
      value: rate,
    };
    tempField["discountPerUnit"] = {
      label: "Disc/unit",
      type: "number",
      handleChange: (val) => {
        setAssetTableFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              fld.discountPerUnit.value = val;
              fld.amount.value =
                Math.round(
                  ((parseFloat(fld.rate.value) || 0) - (parseFloat(val) || 0)) *
                    (parseInt(fld.quantity.value) || 0) *
                    100
                ) / 100;
              // fld.amount.value = parseInt(val) * parseFloat(fld.rate.value);
            }
            return fld;
          })
        );
      },
      value: discountPerUnit,
    };
    tempField["quantity"] = {
      label: "Quantity",
      type: "number",
      handleChange: (val) => {
        setAssetTableFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              fld.quantity.value = val;
              fld.amount.value =
                Math.round(
                  ((parseFloat(fld.rate.value) || 0) -
                    (parseFloat(fld.discountPerUnit.value) || 0)) *
                    (parseInt(val) || 0) *
                    100
                ) / 100;
              // fld.amount.value = parseInt(val) * parseFloat(fld.rate.value);
            }
            return fld;
          })
        );
      },
      value: quantity,
    };
    tempField["amount"] = {
      label: "Amount",
      type: "number",
      disabled: true,
      handleChange: (val) => {
        setAssetTableFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              fld.amount.value = val;
            }
            return fld;
          })
        );
      },
      value: amount,
    };
    return tempField;
  }
  function generateTableField(
    roomNumber = "",
    rate = "",
    checkIn = "",
    checkOut = "",
    amount = ""
  ) {
    let tempField = {};
    tempField["id"] = uniqid("roomstable-");
    tempField["roomNumber"] = {
      label: "Room No.",
      type: "number",
      // disabled: roomNumber ? true : false,
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
      value: roomNumber,
    };
    tempField["checkIn"] = {
      label: "CheckIn",
      type: "datetime-local",

      handleChange: (val) => {
        setTableFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              fld.checkIn.value = val;
              fld.amount.value = calculateAmount(
                parseFloat(fld.rate.value),
                val,
                fld.checkOut.value
              );
            }
            return fld;
          })
        );
      },
      value: checkIn
        ? checkIn
        : `${returnDate(
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
      label: "CheckOut",
      type: "datetime-local",
      handleChange: (val) => {
        setTableFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              fld.checkOut.value = val;
              fld.amount.value = calculateAmount(
                parseFloat(fld.rate.value),
                fld.checkIn.value,
                val
              );
            }
            return fld;
          })
        );
      },

      value: checkOut
        ? checkOut
        : `${returnDate(
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

    tempField["rate"] = {
      label: "Rate",
      type: "number",
      //   disabled: true,
      handleChange: (val) => {
        setTableFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              fld.rate.value = val;
              fld.amount.value = calculateAmount(
                parseFloat(val),
                fld.checkIn.value,
                fld.checkOut.value
              );
            }
            return fld;
          })
        );
      },
      value: rate,
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
      value: amount,
    };
    return tempField;
  }
  const renderTableField = (field, i) => {
    return (
      <div key={field.id} className="edit-bill-table px-0 col-12 row mx-0">
        <div className="col-lg-2 col-3">
          <Input inputProps={field.roomNumber} />
        </div>
        <div className="col-lg-3 col-3">
          <Input inputProps={field.checkIn} />
        </div>
        <div className="col-lg-3 col-3">
          <Input inputProps={field.checkOut} />
        </div>
        <div className="col-lg-2 col-3">
          <Input inputProps={field.rate} />
        </div>

        <div className="col-lg-2 col-3">
          <Input inputProps={field.amount} />
        </div>

        {tableFields.length - 1 > i && (
          <img
            onClick={() => handleTableFieldClose(field.id)}
            src={closeIcon}
            alt="close"
          />
        )}
      </div>
    );
  };
  const renderAssetTableField = (field, i) => {
    return (
      <div key={field.id} className="edit-bill-table px-0 col-12 row mx-0">
        <div className="col-lg-3 col-6">
          <Input inputProps={field.assetName} />
        </div>
        <div className="col-lg-2 col-6">
          <Input inputProps={field.rate} />
        </div>
        <div className="col-lg-2 col-6">
          <Input inputProps={field.quantity} />
        </div>
        <div className="col-lg-2 col-6">
          <Input inputProps={field.discountPerUnit} />
        </div>
        <div className="col-lg-3 col-6">
          <Input inputProps={field.amount} />
        </div>

        {assetTableFields.length - 1 > i && (
          <img
            onClick={() => handleAssetFieldClose(field.id)}
            src={closeIcon}
            alt="close"
          />
        )}
      </div>
    );
  };
  const handleTableFieldClose = (id) => {
    setTableFields((fields) => fields.filter((field) => field.id !== id));
  };
  const handleAssetFieldClose = (id) => {
    setAssetTableFields((fields) => fields.filter((field) => field.id !== id));
  };
  useEffect(() => {
    let tempSub = 0;
    tableFields.forEach((field) => {
      if (field.amount.value) tempSub += parseFloat(field.amount.value);
    });
    assetTableFields.forEach((field) => {
      if (field.amount.value) tempSub += parseFloat(field.amount.value);
    });
    setSubTotal((fld) => ({ ...fld, value: +(+tempSub.toFixed(2)) }));
  }, [tableFields, assetTableFields]);
  useEffect(() => {
    if (tableFields[tableFields.length - 1].amount.value)
      setTableFields((flds) => [...flds, generateTableField()]);
  }, [tableFields]);
  useEffect(() => {
    if (
      assetTableFields.length > 0 &&
      assetTableFields[assetTableFields.length - 1].amount.value
    )
      setAssetTableFields((flds) => [...flds, generateAssetField()]);
    if (assetTableFields.length === 0)
      setAssetTableFields([generateAssetField()]);
  }, [assetTableFields]);
  useEffect(() => {
    let tempSubTotal = parseFloat(subTotal.value) || 0;
    let tempDiscount = parseFloat(discountPercent.value) || 0;
    let tempGst = parseFloat(gst.value) || 0;
    let assetBill = 0;
    if (assetTableFields.length > 0)
      assetBill = assetTableFields.reduce((a, b) => {
        a += parseFloat(b.amount.value) || 0;
        return a;
      }, 0);
    tempSubTotal = tempSubTotal - assetBill;
    tempSubTotal = tempSubTotal - (tempDiscount * tempSubTotal) / 100;
    tempSubTotal = tempSubTotal + assetBill;
    tempSubTotal = tempSubTotal + (tempGst * tempSubTotal) / 100;
    setTotal((fld) => ({
      ...fld,
      value: Math.round(+tempSubTotal * 100) / 100,
    }));
  }, [gst.value, discountPercent.value, subTotal.value, assetTableFields]);
  useEffect(() => {
    document
      .querySelector(".edit-bill__modal")
      .addEventListener("click", (event) => {
        if (event.target.className === "edit-bill__modal") {
          setShowModal(false);
        }
      });
  }, []);
  const handleSubmit = () => {
    let fieldsObject = {};
    fieldsObject.rooms = [];
    tableFields.forEach((field) => {
      if (field.amount.value)
        fieldsObject.rooms.push({
          roomNumber: field.roomNumber.value,
          checkIn: field.checkIn.value,
          checkOut: field.checkOut.value,
          rate: field.rate.value,
          days: calculateNumberOfDays(
            field.checkIn.value,
            field.checkOut.value
          ),
          amount: field.amount.value,
        });
    });
    fieldsObject.extraCharges = [];
    assetTableFields.forEach((field) => {
      if (field.amount.value)
        fieldsObject.extraCharges.push({
          assetName: field.assetName.value,
          charge: field.rate.value,
          quantity: field.quantity.value,
          amount: field.amount.value,
        });
    });
    fieldsObject["bill"] = parseFloat(total.value) || 0;
    fieldsObject["discountPercent"] = parseFloat(discountPercent.value) || 0;
    fieldsObject["gst"] = parseFloat(gst.value) || 0;
    dispatch(editBillDetails(fieldsObject, transactionId, handleModalClose));
  };
  const handleModalClose = () => {
    setShowModal(false);
  };
  return (
    <div className="edit-bill__modal">
      <div className="edit-bill__modal-box">
        <div className="close-button" onClick={() => setShowModal(false)}>
          <img src={closeIcon} />
        </div>
        <div className="edit-bill-table-container pr-5 pl-0 row mx-0">
          {tableFields.length > 0 &&
            tableFields.map((field, i) => renderTableField(field, i))}
        </div>
        <div className="row mx-0 px-0 ">
          <div className="edit-bill-table-container asset-table pr-5 pl-0 col-8 row mx-0">
            {assetTableFields.length > 0 &&
              assetTableFields.map((field, i) =>
                renderAssetTableField(field, i)
              )}
          </div>
          {/* <div className="col-2 d-none d-md-inline"></div> */}
          <div className="col-4 row mx-0 px-0">
            <div className="col-12">
              <Input inputProps={subTotal} />
            </div>
            <div className="col-12 row mx-0 px-0">
              <div className="col-6 pr-2">
                <Input inputProps={discountAmount} />
              </div>
              <div className="col-6 pl-2">
                <Input inputProps={discountPercent} />
              </div>
            </div>
            <div className="col-12">
              <Input inputProps={gst} />
            </div>
            <div className="col-12">
              <Input inputProps={total} />
            </div>
            <div className="col-12">
              <button
                disabled={editLoading}
                onClick={handleSubmit}
                className="edit-bill__submit-button"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
