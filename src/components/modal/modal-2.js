import React, { useState, useEffect } from "react";
import "./styles.css";
import closeIcon from "../../icons/closeIcon.png";
import history from "../../utils/history";
export default function Modal2(props) {
  const {
    inputProps,
    handleModalSave,
    closeModal,
    buttonText,
    canClose,
    backRoute,
  } = props;
  const [error, setError] = useState("");
  useEffect(() => {
    document
      .querySelector(".modal-container")
      .addEventListener("click", (event) => {
        if (event.target.className === "modal-container") {
          if (!canClose) {
            closeModal();
          } else {
            history.push(backRoute);
          }
        }
      });
  }, [inputProps, handleModalSave, closeModal]);
  const [fields, setFields] = useState([]);
  useEffect(() => {
    setFields((fields) => {
      let tempFields = [];
      let tempfield = {};

      for (let x in inputProps) {
        if (x !== "modalError") {
          tempfield = {
            label: inputProps[x].label,
            disabled: inputProps[x].disabled,
            type: inputProps[x].type,
            handleChange: inputProps[x].onChange,
            value: inputProps[x].value,
          };
          if (inputProps[x].type === "dropdown") {
            tempfield["options"] = inputProps[x].options;
          }
          tempFields.push(tempfield);
        }
      }
      return tempFields;
    });
  }, [inputProps]);
  const handleSave = (e) => {
    e.preventDefault();
    if (
      fields.every((field) => {
        if (field.value) return true;
        else {
          setError(`Please provide a valid ${field.label}`);
          return false;
        }
      })
    ) {
      handleModalSave();
    } else {
      console.log("values not provided");
    }

    // closeModal();
  };
  const renderFields = () => {
    if (fields.length > 0) {
      return fields.map((field) => {
        if (field.type === "dropdown") {
          return (
            <div key={field.label}>
              <label className="modal-label">{field.label}</label>
              <select
                required={true}
                value={field.value}
                onChange={(event) => {
                  field.handleChange(event.target.value);
                }}
              >
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          );
        } else
          return (
            <div key={field.label}>
              <label className="modal-label">{field.label}</label>
              <input
                required={true}
                disabled={field.disabled ? true : false}
                type={field.type}
                value={field.value}
                onChange={(event) => {
                  field.handleChange(event.target.value);
                }}
              />
            </div>
          );
      });
    }
    return null;
  };
  return (
    <div className="modal-container">
      <form className="modal-box">
        {!canClose && (
          <div className="close-button" onClick={() => closeModal()}>
            <img src={closeIcon} alt="close icon" />
          </div>
        )}

        {renderFields()}
        {error && <p className="modal-error">{error}</p>}

        <button onClick={(e) => handleSave(e)} className="save-btn">
          {buttonText}
        </button>
      </form>
    </div>
  );
}
