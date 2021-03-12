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
  const [fields, setFields] = useState([]);
  useEffect(() => {
    setFields((fields) => {
      let tempFields = [];
      let tempfield = {};
      props.labels.forEach((label) => {
        tempfield = {
          label: label.label,
          type: label.type,
          value: "",
          handleChange: (val) => {
            setFields((flds) => {
              return flds.map((fld) => {
                if (fld.label === label.label) {
                  fld.value = val;
                }
                return fld;
              });
            });
          },
        };
        if (label.type === "dropdown") {
          tempFields["options"] = label.options;
        }
        tempFields.push(tempfield);
      });
      return tempFields;
    });
  }, []);
  const handleSave = () => {
    if (fields.every((field) => field.value)) {
      let values = [];
      fields.forEach((field) => {
        values.push(field.value);
      });

      props.handleChange(values);
      props.closeModal();
    }
  };
  const renderFields = () => {
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
              >
                {field.options.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </select>
            </div>
          );
        }
        return (
          <div>
            <label className="modal-label">{field.label}</label>
            <input
              autoFocus={i === 0}
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
      <div className="modal-box">
        <div className="close-button" onClick={() => props.closeModal()}>
          <img src={closeIcon} />
        </div>

        {renderFields()}
        <button onClick={() => handleSave()} className="save-btn">
          Save
        </button>
      </div>
    </div>
  );
}
