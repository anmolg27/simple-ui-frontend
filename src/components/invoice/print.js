import React from "react";
import Printer, { print } from "react-pdf-print";
const ids = ["1"];
import "./styles.css";
export default function InvoicePrint() {
  return (
    <div className="invoice-print">
      <Printer>
        <div className="invoice-print__a4-page" id={ids[0]}>
          <div>Print Me</div>
        </div>
      </Printer>
      <button
        className="invoice-print__print-button"
        onClick={() => print(ids)}
      >
        Print
      </button>
    </div>
  );
}
