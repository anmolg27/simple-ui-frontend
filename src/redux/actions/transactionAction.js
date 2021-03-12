import {
  LOADING_TRANSACTION,
  STOP_LOADING_TRANSACTION,
  SET_TRANSACTION,
  EDIT_TRANSACTION_GUEST,
  TRANSACTION_EDIT_LOADING,
  STOP_TRANSACTION_EDIT_LOADING,
  EDIT_TRANSACTION,
  LOADING_MORE_TRANSACTIONS,
  STOP_LOADING_MORE_TRANSACTIONS,
  HAS_MORE_TRANSACTIONS,
  NO_MORE_TRANSACTIONS,
  SET_MORE_TRANSACTION,
} from "../actionTypes";
import axios from "axios";
import { url } from "../../utils/url";
import history from "../../utils/history";
import { createInvoice } from "./invoiceAction";

export const editGuestDetails = (vals, transactionId, closeModal) => (
  dispatch
) => {
  dispatch({ type: TRANSACTION_EDIT_LOADING });
  axios
    .post(`${url}/editTransaction?transactionId=${transactionId}`, vals)
    .then((res) => {
      dispatch({
        type: EDIT_TRANSACTION_GUEST,
        payload: { transactionId, details: vals },
      });
      dispatch({ type: STOP_TRANSACTION_EDIT_LOADING });
      closeModal();
    })
    .catch((error) => {
      console.log(error);
      alert("Something went wrong");
    });
};
export const editBillDetails = (vals, transactionId, closeModal) => (
  dispatch
) => {
  dispatch({ type: TRANSACTION_EDIT_LOADING });
  axios
    .post(`${url}/editTransactionBill?transactionId=${transactionId}`, vals)
    .then((res) => {
      dispatch({
        type: EDIT_TRANSACTION,
        payload: { transactionId, details: vals },
      });
      dispatch({ type: STOP_TRANSACTION_EDIT_LOADING });
      closeModal();
    })
    .catch((error) => {
      console.log(error);
      alert("Something went wrong");
    });
};
export const updateAndGetTransactions = () => (dispatch) => {
  let transactions = [];
  dispatch({ type: LOADING_TRANSACTION });
  axios
    .get(`${url}/transactions`)
    .then((res) => {
      res.data.forEach((iv) => {
        transactions.push({ ...iv, message: "recently fetched" });
      });
      localStorage.setItem("transactions", JSON.stringify(transactions));
      dispatch({ type: SET_TRANSACTION, payload: transactions });
    })
    .catch((error) => {
      dispatch({ type: STOP_LOADING_TRANSACTION });
    });
};

// --------------------------------------------------------------------------
export const saveBill = (vals, setLoading, customerID) => (
  dispatch,
  getState
) => {
  const companyID = getState().company.data._id;
  let queryString = `companyID=${companyID}`;
  if (customerID) queryString += `&customerID=${customerID}`;

  setLoading ? setLoading(true) : dispatch({ type: TRANSACTION_EDIT_LOADING });
  axios
    .post(`${url}/bills?${queryString}`, vals)
    .then((res) => {
      const { bill, foundCustomer } = res.data;
      dispatch(fetchBills());
      setLoading
        ? setLoading(false)
        : dispatch({ type: STOP_TRANSACTION_EDIT_LOADING });
      if (bill.modeOfPayment && bill.modeOfPayment.length > 0) {
        console.log("bill is");
        console.log(bill);
        dispatch(createInvoice(bill, foundCustomer));
      } else history.push("/");
    })
    .catch((err) => {
      setLoading
        ? setLoading(false)
        : dispatch({ type: STOP_TRANSACTION_EDIT_LOADING });
      console.log(err);
      console.log("error");
      alert("something went wrong");
    });
};
export const payBill = (vals, setLoading, billID) => (dispatch) => {
  setLoading(true);
  axios
    .post(`${url}/bills/${billID}?type=pay`, vals)
    .then((res) => {
      const { bill, foundCustomer } = res.data;
      setLoading(false);
      dispatch(createInvoice(bill, foundCustomer));
      // history.push("/");
      dispatch(fetchBills());
    })
    .catch((err) => {
      setLoading(false);
      alert("something went wrong");
    });
};
export const fetchBills = (skip = 0) => (dispatch, getState) => {
  console.log("skip value is");
  console.log(skip);
  const companyID = getState().company.data._id;
  let queryString = `companyID=${companyID}&skip=${skip}`;
  const loadingType =
    skip === 0 ? LOADING_TRANSACTION : LOADING_MORE_TRANSACTIONS;
  const stopLoadingType =
    skip === 0 ? STOP_LOADING_TRANSACTION : STOP_LOADING_MORE_TRANSACTIONS;
  dispatch({ type: loadingType });
  const setType = skip === 0 ? SET_TRANSACTION : SET_MORE_TRANSACTION;

  axios
    .get(`${url}/bills?${queryString}`)
    .then((res) => {
      console.log("success");
      console.log(res.data);
      // history.push("/");
      dispatch({ type: setType, payload: res.data.bills });
      if (res.data.bills.length === 10)
        dispatch({ type: HAS_MORE_TRANSACTIONS });
      else dispatch({ type: NO_MORE_TRANSACTIONS });
    })
    .catch((err) => {
      console.log(err);
      console.log("error");
      alert("something went wrong");
    })
    .finally(() => dispatch({ type: stopLoadingType }));
};
export const discountAllBills = (value, setLoading) => (dispatch, getState) => {
  const companyID = getState().company.data._id;
  let queryString = `companyID=${companyID}`;
  axios
    .post(`${url}/bills/discount?${queryString}`, { value })
    .then((res) => {
      history.push("/");
    })
    .catch((err) => {
      console.log(err);
      alert("Somtehing went wrong");
    })
    .finally(() => {
      setLoading(false);
    });
};
