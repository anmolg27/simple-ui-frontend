import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./styles.css";
import history from "../../utils/history";

export default function Transactions(props) {
  const handleSalesButtonsClick = (event, type) => {
    if (event.target.innerText === "Create Bill") {
      history.push(`/home/transactions/newBill?type=${type}`);
    } else if (event.target.innerText === "Create Challan") {
      history.push(`/home/transactions/newChallan?type=${type}`);
    } else if (event.target.innerText === "Counter Sale") {
      history.push(`/home/transactions/counterSale?type=${type}`);
    } else if (event.target.innerText === "Modify Bill") {
      history.push(`/home/transactions/modifyBill?type=${type}`);
    }
  };
  return (
    <>
      <div className="row mx-0 px-0">
        <div className="col-md-2">
          <div className="transaction-box">
            <h3>Sales</h3>

            <button
              onClick={(event) => handleSalesButtonsClick(event, "sales")}
            >
              Create Bill
            </button>
            <button
              onClick={(event) => handleSalesButtonsClick(event, "sales")}
            >
              Create Challan
            </button>
            <button
              onClick={(event) => handleSalesButtonsClick(event, "sales")}
            >
              Counter Sale
            </button>
            <button
              onClick={(event) => handleSalesButtonsClick(event, "sales")}
            >
              Modify Bill
            </button>
            <button
              onClick={(event) => handleSalesButtonsClick(event, "sales")}
            >
              Modify Challan
            </button>
          </div>
        </div>
        <div className="col-md-2">
          <div className="transaction-box">
            <h3>Purchase</h3>

            <button
              onClick={(event) => handleSalesButtonsClick(event, "purchase")}
            >
              Create Bill
            </button>
            <button
              onClick={(event) => handleSalesButtonsClick(event, "purchase")}
            >
              Create Challan
            </button>

            <button
              onClick={(event) => handleSalesButtonsClick(event, "purchase")}
            >
              Modify Bill
            </button>
            <button
              onClick={(event) => handleSalesButtonsClick(event, "purchase")}
            >
              Modify Challan
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
