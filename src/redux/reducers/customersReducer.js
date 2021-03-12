import {
  LOADING_CUSTOMER,
  ERROR_CUSTOMER,
  STOP_LOADING_CUSTOMER,
  SET_CUSTOMER,
  CREATE_CUSTOMER,
  CHECKOUT_CUSTOMER,
  CLEAR_DATA,
  EXTRA_CHARGE_CUSTOMER,
  EDIT_LOADING,
  EDIT_RESERVATION_CUSTOMER,
  EDIT_CUSTOMER_RESERVATION,
  STOP_EDIT_LOADING,
  DELETE_RESERVATION,
  EDIT_CHECKIN_CUSTOMER,
  EDIT_CHECKIN_CUSTOMER_EXTRA_CHARGES,
  UPDATE_CUSTOMER,
  HAS_MORE_CUSTOMERS,
  NO_MORE_CUSTOMERS,
  LOADING_MORE_CUSTOMERS,
  STOP_LOADING_MORE_CUSTOMERS,
  SET_MORE_CUSTOMER,
} from "../actionTypes";

const initialState = {
  loading: false,
  customers: [],
  hasMore: false,
  loadingMore: false,
  error: "",
  editLoading: false,
};
let searchedIndex;
export default function customersReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_CUSTOMER:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case LOADING_MORE_CUSTOMERS:
      return {
        ...state,
        loadingMore: true,
      };
    case STOP_LOADING_MORE_CUSTOMERS:
      return {
        ...state,
        loadingMore: false,
      };
    case HAS_MORE_CUSTOMERS:
      return {
        ...state,
        hasMore: true,
      };
    case NO_MORE_CUSTOMERS:
      return {
        ...state,
        hasMore: false,
      };
    case SET_MORE_CUSTOMER:
      return {
        ...state,
        customers: [...state.customers, ...action.payload],
      };
    case CLEAR_DATA:
      return initialState;
    case SET_CUSTOMER:
      return {
        ...state,
        loading: false,
        customers: action.payload,
        error: "",
      };
    case EXTRA_CHARGE_CUSTOMER:
      searchedIndex = state.customers.findIndex(
        (customer) => customer._id === action.payload.customerId
      );
      return {
        ...state,
        customers: state.customers.map((customer, i) => {
          if (i === searchedIndex) {
            action.payload.assets.forEach((payAsset) => {
              let searchedAssetIndex = customer.extraCharges.findIndex(
                (asset) =>
                  asset.assetName.trim().toLowerCase() ===
                  payAsset.assetName.trim().toLowerCase()
              );
              if (searchedAssetIndex === -1)
                customer.extraCharges.push(payAsset);
              else {
                customer.extraCharges[searchedAssetIndex].quantity =
                  parseInt(customer.extraCharges[searchedAssetIndex].quantity) +
                  parseInt(payAsset.quantity);
                customer.extraCharges[searchedAssetIndex].amount =
                  parseFloat(customer.extraCharges[searchedAssetIndex].charge) *
                  customer.extraCharges[searchedAssetIndex].quantity;
              }
            });
          }
          return customer;
        }),
      };
    case CHECKOUT_CUSTOMER:
      let selectedCustomerIndex = state.customers.findIndex(
        (customer) => customer._id === action.payload._id
      );
      let tempCustomers = state.customers;
      let selectedRooms = action.payload.rooms.map((room) =>
        parseInt(room.roomNumber)
      );
      tempCustomers[selectedCustomerIndex].rooms = tempCustomers[
        selectedCustomerIndex
      ].rooms.filter(
        (room) => !selectedRooms.includes(parseInt(room.roomNumber))
      );
      tempCustomers[selectedCustomerIndex].extraCharges = [];
      localStorage.setItem("customers", JSON.stringify(tempCustomers));
      return {
        ...state,
        customers: tempCustomers,
        loading: false,
        error: "",
      };
    case CREATE_CUSTOMER:
      searchedIndex = state.customers.findIndex(
        (customer) => customer._id === action.payload._id
      );
      return {
        ...state,
        loading: false,
        error: "",
        customers:
          searchedIndex === -1
            ? [...state.customers, action.payload]
            : state.customers.map((customer, i) => {
                if (i === searchedIndex) customer = action.payload;
                return customer;
              }),
      };
    case UPDATE_CUSTOMER:
      // const {data,custo}
      return {
        ...state,
        customers: state.customers.map((customer) => {
          if (customer._id === action.payload.customerID)
            return { ...customer, ...action.payload.data };

          return customer;
        }),
      };

    case EDIT_RESERVATION_CUSTOMER:
      const {
        previousReservation,
        checkIn,
        checkOut,
        roomNumber,

        customerId,
      } = action.payload;
      return {
        ...state,
        customers: state.customers.map((customer) => {
          if (customerId === customer._id) {
            customer.reservations = customer.reservations.map((reservation) => {
              if (previousReservation._id === reservation._id) {
                reservation.checkIn = checkIn;
                reservation.checkOut = checkOut;
                reservation.roomNumber = roomNumber;
              }
              return reservation;
            });
          }
          return customer;
        }),
      };
    case EDIT_CHECKIN_CUSTOMER_EXTRA_CHARGES:
      return {
        ...state,
        customers: state.customers.map((customer) => {
          if (customer._id === action.payload.customerId) {
            customer.extraCharges = action.payload.extraCharges;
          }

          return customer;
        }),
      };
    case EDIT_CHECKIN_CUSTOMER:
      return {
        ...state,
        customers: state.customers.map((customer) => {
          if (customer._id === action.payload.customerId) {
            customer.customerName = action.payload.customerName;
            customer.mobileNumber = action.payload.mobileNumber;
            customer.extraDetails = action.payload.extraDetails;
          }

          return customer;
        }),
      };
    case EDIT_CUSTOMER_RESERVATION:
      const {
        customerId: eCustomerId,
        mobileNumber: eMobileNumber,
        customerName: eCustomerName,
        comingFrom: eComingFrom,
        goingTo: eGoingTo,
      } = action.payload;
      return {
        ...state,
        customers: state.customers.map((customer) => {
          if (eCustomerId === customer._id) {
            customer.customerName = eCustomerName;
            customer.mobileNumber = eMobileNumber;
            customer.reservations = customer.reservations.map((res) => {
              res.comingFrom = eComingFrom;
              res.goingTo = eGoingTo;
              return res;
            });
          }
          return customer;
        }),
      };
    case DELETE_RESERVATION:
      const { reservationData, customerId: ncustomerId } = action.payload;
      console.log("nmo");
      console.log(ncustomerId);
      return {
        ...state,
        customers: state.customers.map((customer) => {
          console.log("aaa");
          if (ncustomerId === customer._id) {
            console.log("hjkhj");
            customer.reservations = customer.reservations.filter(
              (reservation) => {
                if (reservationData._id === reservation._id) {
                  return false;
                }
                return true;
              }
            );
          }
          return customer;
        }),
      };
    case EDIT_LOADING:
      return {
        ...state,
        editLoading: true,
      };
    case STOP_EDIT_LOADING:
      return {
        ...state,
        editLoading: false,
      };

    case ERROR_CUSTOMER:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case STOP_LOADING_CUSTOMER:
      return {
        ...state,
        error: "",
        loading: false,
      };
    default:
      return state;
  }
}
