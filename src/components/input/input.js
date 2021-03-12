import React, { useState, useEffect } from "react";
import Modal from "../modal/modal";
import "./styles.css";

export default function Input(props) {
  const {
    inputProps: {
      required,
      label,
      type,
      handleChange,
      options,
      value,
      labels,
      disabled,
      valueName,
      min,
      max,
      blurHandler: handleBlur,
    },
  } = props;
  // console.log("input are");
  // console.log(props.inputProps);
  useEffect(() => {
    if (value) {
      let inputNodes = document.querySelectorAll(".input-box");
      inputNodes.forEach((inputNode) => {
        if (inputNode.children[0].children[1].value) {
          if (
            !inputNode.children[0].children[0].className.includes(
              "label-animate jaruri"
            )
          ) {
            inputNode.children[0].children[0].className +=
              " " + "label-animate jaruri";
          }
        }
      });
    }
  }, [value]);
  const [show, setShow] = useState(false);
  const focusHandler = (event) => {
    let labelElement = event.target.previousElementSibling;
    if (!labelElement.className.includes("color-blue"))
      labelElement.className += " " + "color-blue";
    if (!labelElement.className.includes("label-animate jaruri"))
      labelElement.className += " " + "label-animate jaruri";
  };
  const blurHandler = (event) => {
    let labelElement = event.target.previousElementSibling;
    if (!event.target.value)
      labelElement.className = labelElement.className.replace(
        "label-animate jaruri",
        ""
      );
    labelElement.className = labelElement.className.replace("color-blue", "");
    if (handleBlur) handleBlur(event.target.value);
  };
  const closeModal = () => {
    setShow(false);
  };
  return (
    <div className="input-box">
      {typeof type === "string" ? (
        type === "dropdown" ? (
          <div className="txt-field">
            <label data-shrink="false">{label}</label>

            {/* <input value={value} type={type[0]} /> */}
            <select
              disabled={disabled ? true : false}
              required={required ? true : false}
              value={value}
              onChange={(event) => {
                handleChange(event.target.value);
              }}
              onFocus={focusHandler}
              onBlur={blurHandler}
            >
              <option selected disabled hidden></option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ) : type === "modal" ? (
          <div className="txt-field">
            {show && (
              <Modal
                closeModal={closeModal}
                handleChange={handleChange}
                labels={labels}
              />
            )}
            <button onClick={() => setShow(true)}>
              <span>{label}</span>
            </button>
          </div>
        ) : (
          <div className="txt-field">
            <label data-shrink="false">{label}</label>

            <input
              disabled={disabled ? true : false}
              required={required ? true : false}
              value={value}
              onChange={(event) => {
                handleChange(event.target.value);
              }}
              onFocus={focusHandler}
              onBlur={blurHandler}
              type={type}
              min={min ? min : ""}
              max={max ? max : ""}
            />
          </div>
        )
      ) : (
        <div className="txt-field">
          <label data-shrink="false">{label}</label>

          <input
            required={required ? true : false}
            value={value}
            onChange={(event) => {
              handleChange(event.target.value);
            }}
            onFocus={focusHandler}
            onBlur={blurHandler}
            type={type[0]}
            list={valueName}
          />
          <datalist id={valueName}>
            {/* {options.map(option)=>(<option value="Chrome" />)} */}
            {options &&
              options.map((option) => <option key={option} value={option} />)}
          </datalist>
        </div>
      )}
    </div>
  );
}

<fieldset
  aria-hidden="true"
  class="PrivateNotchedOutline-root-1 MuiOutlinedInput-notchedOutline"
>
  <legend class="PrivateNotchedOutline-legendLabelled-3">
    <span>Item Style</span>
  </legend>
</fieldset>;
