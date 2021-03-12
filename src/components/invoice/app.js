import React, { Component, Fragment } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import Invoice from "./invoice";
import { useSelector } from "react-redux";
import noImage from "../../images/no-image.jpg";
import dummyData from "../../utils/dummy-data";
import invoice from "./data/invoice";

// import logo from './logo.svg';
// import "./App.css";
// import InvoicePrint from "./print";
function App() {
  // const { data } = useSelector((state) => state.company);
  const { invoice } = useSelector((state) => state.invoice);
  return (
    <div className="invoice-container">
      {/* <InvoicePrint /> */}
      <Fragment>
        <PDFViewer className="pdf-view">
          <Invoice invoice={invoice} />
        </PDFViewer>
      </Fragment>
    </div>
  );
}

export default App;
