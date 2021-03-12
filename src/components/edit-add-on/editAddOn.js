import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editCheckInExtraCharges } from "../../redux/actions/customerAction";
import uniqid from "uniqid";
import "./styles.css";
import closeIcon from "../../icons/closeIcon.png";
import Input from "../input/input";

export default function EditAddOn(props) {
  const dispatch = useDispatch();
  const { setShowModal, customer } = props;
  const { editLoading } = useSelector((state) => state.customers);
  const [assetTableFields, setAssetTableFields] = useState(
    customer.extraCharges.length > 0
      ? customer.extraCharges.map((asset) =>
          generateAssetField(
            asset.assetName,
            asset.charge,
            asset.quantity,
            asset.amount
          )
        )
      : []
  );
  useEffect(() => {
    if (
      assetTableFields.length > 0 &&
      assetTableFields[assetTableFields.length - 1].amount.value
    )
      setAssetTableFields((flds) => [...flds, generateAssetField()]);
    if (assetTableFields.length === 0)
      setAssetTableFields([generateAssetField()]);
  }, [assetTableFields]);
  function generateAssetField(
    assetName = "",
    rate = "",
    quantity = "",
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
              fld.amount.value = parseFloat(val) * parseInt(fld.quantity.value);
            }
            return fld;
          })
        );
      },
      value: rate,
    };
    tempField["quantity"] = {
      label: "Quantity",
      type: "number",
      handleChange: (val) => {
        setAssetTableFields((fields) =>
          fields.map((fld) => {
            if (fld["id"] === tempField["id"]) {
              fld.quantity.value = val;
              fld.amount.value = parseInt(val) * parseFloat(fld.rate.value);
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
  const handleAssetFieldClose = (id) => {
    setAssetTableFields((fields) => fields.filter((field) => field.id !== id));
  };
  const renderAssetTableField = (field, i) => {
    return (
      <div key={field.id} className="edit-bill-table px-0 col-12 row mx-0">
        <div className="col-lg-3 col-6">
          <Input inputProps={field.assetName} />
        </div>
        <div className="col-lg-3 col-6">
          <Input inputProps={field.rate} />
        </div>
        <div className="col-lg-3 col-6">
          <Input inputProps={field.quantity} />
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
  const handleSubmit = () => {
    let flag = 0;
    let assetFields = assetTableFields.map((asset) => ({
      assetName: asset.assetName.value,
      quantity: asset.quantity.value,
      charge: asset.rate.value,
      amount: asset.amount.value,
    }));
    assetFields = assetFields.filter(
      (field) =>
        field.assetName || field.quantity || field.charge || field.amount
    );
    if (assetFields.length > 0) {
      for (let i = 0; i < assetFields.length; i++) {
        if (
          !assetFields[i].assetName ||
          !assetFields[i].quantity ||
          !assetFields[i].charge ||
          parseFloat(assetFields[i].charge) === 0
        ) {
          flag = 1;
          break;
        }
      }
    }

    if (flag === 1) return alert("Please Fill fields properly");
    const fieldsObject = {
      customerId: customer._id,
      extraCharges: assetFields,
    };
    // fieldsObject.extraCharges.splice(fieldsObject.extraCharges.length - 1, 1);
    dispatch(editCheckInExtraCharges(fieldsObject));
  };
  useEffect(() => {
    document
      .querySelector(".edit-add-on__modal")
      .addEventListener("click", (event) => {
        if (event.target.className === "edit-add-on__modal") {
          setShowModal(false);
        }
      });
  }, []);
  return (
    <div className="edit-add-on__modal">
      <div className="edit-add-on__modal-box">
        <div className="close-button" onClick={() => setShowModal(false)}>
          <img src={closeIcon} />
        </div>

        <div className="row mx-0 px-0 ">
          {assetTableFields.length > 0 &&
            assetTableFields.map((field, i) => renderAssetTableField(field, i))}
        </div>
        <button
          disabled={editLoading}
          onClick={handleSubmit}
          className="edit-bill__submit-button"
        >
          {editLoading ? (
            <div className="spinner-border text-success" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            "Save"
          )}
        </button>
      </div>
    </div>
  );
}
