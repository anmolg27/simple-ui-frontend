import React from "react";
import "./styles.css";
export default function Popup(props) {
  const { childrenComponent } = props;
  return (
    <div className="popup">
      <div className="popup__box">{childrenComponent}</div>
    </div>
  );
}
