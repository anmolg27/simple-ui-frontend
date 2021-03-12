import React from "react";
import "./styles.css";
export default function LoadingSpinner() {
  return (
    <div className="component-loading-spinner">
      <p>Loading</p>
      <span className="loader"></span>
    </div>
  );
}
