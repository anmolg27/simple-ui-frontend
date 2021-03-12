import React, { useState, useEffect } from "react";
import "./styles.css";
import closeIcon from "../../icons/closeIcon.png";

export default function Modal(props) {
  useEffect(() => {
    document
      .querySelector(".modal-container")
      .addEventListener("click", (event) => {
        if (event.target.className === "modal-container") {
          props.closeModal();
        }
      });
  }, []);
  const handleSave = () => {
    if (props.fields.every((field) => field.value)) {
      props.handleSubmit();
    }
  };
  const renderFields = (fields) => {
    if (fields.length > 0) {
      return fields.map((field, i) => {
        if (field.type === "dropdown") {
          return (
            <div>
              <label className="modal-label">{field.label}</label>
              <select
                autoFocus={i === 0}
                type="select"
                value={field.value}
                onChange={(event) => {
                  field.handleChange(event.target.value);
                }}
                onBlur={(event) => {
                  field.handleBlur(event.target.value);
                }}
              >
                {field.options.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </select>
            </div>
          );
        }
        return (
          <>
            <div>
              <label className="modal-label">{field.label}</label>
              <input
                onBlur={(event) => {
                  field.handleBlur(event.target.value);
                }}
                autoFocus={i === 0}
                type={field.type}
                value={field.value}
                onChange={(event) => {
                  field.handleChange(event.target.value);
                }}
              />

              <span className="modal-error">
                <p>{field.error}</p>
                {/* <p>Im the error</p> */}
              </span>
            </div>
          </>
        );
      });
    }
    return null;
  };
  return (
    <div className="modal-container">
      <div className="modal-box">
        <div className="close-button" onClick={() => props.closeModal()}>
          <img src={closeIcon} />
        </div>

        {renderFields(props.fields)}
        <button onClick={() => handleSave()} className="save-btn">
          Save
        </button>
      </div>
    </div>
  );
}
