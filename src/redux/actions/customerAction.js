import axios from "axios";
import { url } from "../../utils/url";
import history from "../../utils/history";
import {
  isDateABetweenDateBAndDateC,
  isDateABeforeDateB,
  returnCurrentDateAndTime,
} from "../../utils/functions";
import { createInvoice } from "./invoiceAction";
import {
  LOADING_CUSTOMER,
  STOP_LOADING_CUSTOMER,
  SET_CUSTOMER,
  CREATE_CUSTOMER,
  RESERVE_ROOM,
  CHECKOUT_CUSTOMER,
  UNRESERVE_ROOM,
  RESERVE_AND_OCCUPY_ROOM,
  CREATE_TRANSACTION,
  EXTRA_CHARGE_CUSTOMER,
  REMOVE_RESERVATION,
  EDIT_LOADING,
  STOP_EDIT_LOADING,
  EDIT_RESERVATION_ROOM,
  EDIT_RESERVATION_CUSTOMER,
  DELETE_RESERVATION,
  EDIT_CUSTOMER_RESERVATION,
  EDIT_CUSTOMER_RESERVATION_ROOM,
  EDIT_CHECKIN_CUSTOMER,
  EDIT_CHECKIN_CUSTOMER_EXTRA_CHARGES,
  EDIT_CHECKIN_ROOM,
  UPDATE_CUSTOMER,
  SYNC_TRANSACTION,
  HAS_MORE_CUSTOMERS,
  NO_MORE_CUSTOMERS,
  LOADING_MORE_CUSTOMERS,
  STOP_LOADING_MORE_CUSTOMERS,
} from "../actionTypes";

export const deleteReservation = (vals, setShowModal) => (dispatch) => {
  dispatch({ type: EDIT_LOADING });
  axios
    .post(`${url}/deleteReservation`, vals)
    .then((res) => {
      setShowModal(false);
      dispatch({ type: DELETE_RESERVATION, payload: vals });
      history.push("/home");
    })
    .catch((error) => {
      alert("something went wrong");
    })
    .finally(() => {
      dispatch({ type: STOP_EDIT_LOADING });
    });
};
export const editReservation = (vals) => (dispatch) => {
  dispatch({ type: EDIT_LOADING });
  axios
    .post(`${url}/editReservation`, vals)
    .then((res) => {
      dispatch({ type: EDIT_RESERVATION_ROOM, payload: vals });
      dispatch({ type: EDIT_RESERVATION_CUSTOMER, payload: vals });
      history.push("/home");
    })
    .catch((error) => {
      alert("Something went wrong");
      console.log(error);
    })
    .finally(() => {
      dispatch({ type: STOP_EDIT_LOADING });
    });
};
export const editCustomerReservation = (vals) => (dispatch, getState) => {
  const { customers } = getState().customers;
  let foundCustomer = customers.find(
    (customer) => customer._id === vals.customerId
  );
  let prevData = {
    customerName: foundCustomer.customerName,
    mobileNumber: foundCustomer.mobileNumber,
    reservations: foundCustomer.reservations.map((reservation) => ({
      roomNumber: reservation.roomNumber,
      checkIn: reservation.checkIn,
      checkOut: reservation.checkOut,
    })),
  };

  dispatch({ type: EDIT_LOADING });
  axios
    .post(`${url}/editCustomerReservation`, vals)
    .then((res) => {
      dispatch({ type: EDIT_CUSTOMER_RESERVATION, payload: vals });
      dispatch({
        type: EDIT_CUSTOMER_RESERVATION_ROOM,
        payload: { newData: vals, prevData },
      });
      history.push("/home");
    })
    .catch((error) => {
      alert("Something went wrong");
      console.log(error);
    })
    .finally(() => {
      dispatch({ type: STOP_EDIT_LOADING });
    });
};

export const createCustomer = (
  vals,
  history,
  actionType,
  setShowModal,
  setErrorMessage,
  setReservations
) => (dispatch, useState) => {
  const { rooms } = useState().rooms;
  let errorMessage = "";
  const reservationsToRemove = [];
  vals.rooms.forEach((room) => {
    let foundRoom = rooms.find(
      (tRoom) => parseInt(room.roomNumber) === parseInt(tRoom.roomNumber)
    );

    if (foundRoom.isReserved) {
      let foundReservation = null;
      if (actionType === "checkIn") {
        foundReservation = foundRoom.reservations.find(
          (reservation) =>
            reservation.reservedFrom === room.checkIn &&
            reservation.reservedTo === room.checkOut &&
            parseInt(reservation.mobileNumber) === parseInt(vals.mobileNumber)
        );
        reservationsToRemove.push({
          ...foundReservation,
          roomNumber: foundRoom.roomNumber,
        });
      }

      if (!foundReservation) {
        setReservations(foundRoom.reservations);
        if (
          foundRoom.isOccupied &&
          isDateABetweenDateBAndDateC(
            returnCurrentDateAndTime(),
            room.checkIn,
            room.checkOut
          )
        ) {
          errorMessage = `Room No. ${room.roomNumber} is currently occupied`;
          setReservations([]);
        }

        foundRoom.reservations.forEach((reservation) => {
          if (isDateABeforeDateB(room.checkIn, reservation.reservedFrom)) {
            if (
              isDateABetweenDateBAndDateC(
                room.checkOut,
                reservation.reservedFrom,
                reservation.reservedTo
              ) &&
              !errorMessage
            ) {
              errorMessage = `Room No. ${room.roomNumber} is not available for the selected duration. Followings are the reservations of that room:`;
            } else if (
              isDateABeforeDateB(reservation.reservedFrom, room.checkOut) &&
              !errorMessage
            ) {
              errorMessage = `Room No. ${room.roomNumber} is not available for the selected duration. Followings are the reservations of that room:`;
            }
          } else if (
            isDateABetweenDateBAndDateC(
              room.checkIn,
              reservation.reservedFrom,
              reservation.reservedTo
            ) &&
            !errorMessage
          ) {
            errorMessage = `Room No. ${room.roomNumber} is not available for the selected duration. Followings are the reservations of that room:`;
          }
        });
      }
    }
  });
  if (errorMessage) {
    setErrorMessage(errorMessage);
    setShowModal(true);
    return;
  }
  dispatch({ type: LOADING_CUSTOMER });
  let customerData = JSON.parse(localStorage.getItem("customers")) || [];
  let searchedCustomerIndex = customerData.findIndex(
    (customer) => customer.mobileNumber === parseInt(vals.mobileNumber)
  );
  axios
    .post(`${url}/customer?type=${actionType}`, vals)
    .then((res) => {
      history.push("/home");
      dispatch({
        type: CREATE_CUSTOMER,
        payload: { ...res.data, message: "created successfully" },
      });

      if (searchedCustomerIndex !== -1)
        customerData[searchedCustomerIndex] = {
          ...res.data,
          message: "created successfully",
        };
      else customerData.push({ ...res.data, message: "created successfully" });
      if (actionType === "checkIn")
        vals.rooms.forEach((room) => {
          dispatch({
            type: RESERVE_AND_OCCUPY_ROOM,
            payload: {
              roomNumber: room.roomNumber,
              customerName: vals.customerName,
              mobileNumber: vals.mobileNumber,
              checkIn: room.checkIn,
              checkOut: room.checkOut,
            },
          });
        });
      else
        vals.rooms.forEach((room) => {
          dispatch({
            type: RESERVE_ROOM,
            payload: {
              room,
              customerName: vals.customerName,
              mobileNumber: vals.mobileNumber,
            },
          });
        });
      if (reservationsToRemove.length > 0)
        reservationsToRemove.forEach((reservation) =>
          dispatch({ type: REMOVE_RESERVATION, payload: reservation })
        );
    })
    .catch((error) => {
      console.log(error);
      alert("Something Went wrong. Please try again later");
    });
};

export const editCheckInCustomerDetails = (vals) => (dispatch, getState) => {
  const { customers } = getState().customers;
  const prevCustomer = customers.find(
    (customer) => customer._id === vals.customerId
  );
  const prevData = {
    customerName: prevCustomer.customerName,
    mobileNumber: prevCustomer.mobileNumber,
    rooms: prevCustomer.rooms.map((room) => parseInt(room.roomNumber)),
  };
  dispatch({ type: EDIT_LOADING });
  axios
    .post(`${url}/editCheckInCustomer`, vals)
    .then((res) => {
      dispatch({ type: EDIT_CHECKIN_CUSTOMER, payload: vals });
      dispatch({
        type: EDIT_CHECKIN_ROOM,
        payload: { prevData, newData: vals },
      });
      dispatch({ type: STOP_EDIT_LOADING });
      history.push("/home");
    })
    .catch((err) => {
      alert("Something went wrong");
    });
};
export const editCheckInExtraCharges = (vals) => (dispatch) => {
  dispatch({ type: EDIT_LOADING });
  axios
    .post(`${url}/editCheckInCustomerExtraCharges`, vals)
    .then((res) => {
      dispatch({
        type: EDIT_CHECKIN_CUSTOMER_EXTRA_CHARGES,
        payload: { extraCharges: res.data, customerId: vals.customerId },
      });
    })
    .catch((err) => {
      alert("Something went wrong");
      console.log(err);
    })
    .finally(() => {
      dispatch({ type: STOP_EDIT_LOADING });
      history.push("/home");
    });
};

export const updateAndGetCustomers = () => (dispatch) => {
  let customersData = [];
  dispatch({ type: LOADING_CUSTOMER });
  axios
    .get(`${url}/customers`)
    .then((res) => {
      res.data.forEach((iv) => {
        customersData.push({ ...iv, message: "recently fetched" });
      });
      dispatch({ type: SET_CUSTOMER, payload: customersData });
    })
    .catch((error) => {
      dispatch({ type: STOP_LOADING_CUSTOMER });
    });
};
export const extraCharge = (vals) => (dispatch) => {
  dispatch({ type: LOADING_CUSTOMER });
  axios
    .post(`${url}/extraCharge`, vals)
    .then((res) => {
      dispatch({ type: EXTRA_CHARGE_CUSTOMER, payload: vals });
      dispatch({ type: STOP_LOADING_CUSTOMER });
      history.push("/home");
    })
    .catch((error) => {
      alert("Something went wrong");
    });
};
export const checkOutCustomer = (vals, history, getState) => (dispatch) => {
  let items = [];
  vals.rooms.forEach((room) => {
    items.push({
      item: room.roomNumber,
      rate: room.rate,
      days: room.days,
      amount: room.amount,
      type: "room",
      checkIn: room.checkIn,
      checkOut: room.checkOut,
    });
  });
  vals.extraCharges.forEach((asset) => {
    items.push({
      item: asset.assetName,
      discountPerUnit: asset.discountPerUnit,
      amount: asset.amount,
      rate: asset.charge,
      quantity: asset.quantity,
      type: "asset",
    });
  });
  // console.log("vals are");
  // console.log(vals);
  dispatch(createInvoice(vals, items));
  // createInvoice(vals, items);
  dispatch({ type: LOADING_CUSTOMER });

  axios
    .post(`${url}/checkOut`, vals)
    .then((res) => {
      dispatch({ type: CHECKOUT_CUSTOMER, payload: vals });
      dispatch({ type: CREATE_TRANSACTION, payload: res.data });
      let selectedRooms = vals.rooms.map((room) => room.roomNumber);
      selectedRooms.forEach((room) => {
        dispatch({ type: UNRESERVE_ROOM, payload: room });
      });
    })
    .catch((error) => {
      alert("something went wrong");
      console.log(error);
      dispatch({ type: STOP_LOADING_CUSTOMER });
    })
    .finally(() => {
      history.push("/home/invoice");
      createInvoice(vals, items);
    });
};
// ---------------------------------------------------------------------------------------------------------
export const newCustomer = (vals, closeModal, setError) => (
  dispatch,
  getState
) => {
  const companyID = getState().company.data._id;
  let queryString = `companyID=${companyID}`;
  dispatch({ type: EDIT_LOADING });
  axios
    .post(`${url}/customers?${queryString}`, vals)
    .then((res) => {
      closeModal();
      dispatch(fetchCustomers());
    })
    .catch((err) => {
      setError(err.response.data.error);
    })
    .finally(() => {
      dispatch({ type: STOP_EDIT_LOADING });
    });
};
export const updateCustomer = (vals, customerID, closeModal, setError) => (
  dispatch
) => {
  axios
    .post(`${url}/customers/${customerID}`, vals)
    .then((res) => {
      closeModal();
      if (vals.customerName)
        dispatch({
          type: SYNC_TRANSACTION,
          payload: { customerID, customerName: vals.customerName },
        });
      dispatch({ type: UPDATE_CUSTOMER, payload: { customerID, data: vals } });
    })
    .catch((err) => {
      setError(err.response.data.error);
    })
    .finally(() => {
      dispatch({ type: STOP_EDIT_LOADING });
    });
};
export const fetchCustomers = (skip = 0) => (dispatch, getState) => {
  const companyID = getState().company.data._id;
  let queryString = `companyID=${companyID}`;
  const loadingType = skip === 0 ? LOADING_CUSTOMER : LOADING_MORE_CUSTOMERS;
  const stopLoadingType =
    skip === 0 ? STOP_LOADING_CUSTOMER : STOP_LOADING_MORE_CUSTOMERS;
  dispatch({ type: loadingType });
  axios
    .get(`${url}/customers?${queryString}`)
    .then((res) => {
      dispatch({ type: SET_CUSTOMER, payload: res.data.customers });
      if (res.data.customers.length === 10)
        dispatch({ type: HAS_MORE_CUSTOMERS });
      else dispatch({ type: NO_MORE_CUSTOMERS });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      dispatch({ type: stopLoadingType });
    });
};
