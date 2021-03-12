import {
  LOADING_TRANSACTION,
  ERROR_TRANSACTION,
  STOP_LOADING_TRANSACTION,
  SET_TRANSACTION,
  CREATE_TRANSACTION,
  CLEAR_DATA,
  EDIT_TRANSACTION,
  EDIT_TRANSACTION_GUEST,
  TRANSACTION_EDIT_LOADING,
  STOP_TRANSACTION_EDIT_LOADING,
  SYNC_TRANSACTION,
  LOADING_MORE_TRANSACTIONS,
  STOP_LOADING_MORE_TRANSACTIONS,
  HAS_MORE_TRANSACTIONS,
  NO_MORE_TRANSACTIONS,
  SET_MORE_TRANSACTION,
} from "../actionTypes";
const initialState = {
  loading: false,
  editLoading: false,
  transactions: [],
  hasMore: false,
  loadingMore: false,
  error: "",
};
export default function transactionsReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_TRANSACTION:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case LOADING_MORE_TRANSACTIONS:
      return {
        ...state,
        loadingMore: true,
      };
    case STOP_LOADING_MORE_TRANSACTIONS:
      return {
        ...state,
        loadingMore: false,
      };
    case HAS_MORE_TRANSACTIONS:
      return {
        ...state,
        hasMore: true,
      };
    case NO_MORE_TRANSACTIONS:
      return {
        ...state,
        hasMore: false,
      };
    case SET_MORE_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, ...action.payload],
      };
    case CLEAR_DATA:
      return initialState;
    case TRANSACTION_EDIT_LOADING:
      return {
        ...state,
        editLoading: true,
      };
    case STOP_TRANSACTION_EDIT_LOADING:
      return {
        ...state,
        editLoading: false,
      };
    case EDIT_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.map((transaction) => {
          if (transaction._id === action.payload.transactionId) {
            transaction.bill = action.payload.details.bill;
            transaction.discountPercent =
              action.payload.details.discountPercent;
            transaction.gst = action.payload.details.gst;
            transaction.rooms = action.payload.details.rooms;
            transaction.extraCharges = action.payload.details.extraCharges;
          }
          return transaction;
        }),
      };
    case EDIT_TRANSACTION_GUEST:
      return {
        ...state,
        transactions: state.transactions.map((transaction) => {
          if (transaction._id === action.payload.transactionId) {
            for (let i in action.payload.details) {
              if (i === "customerName")
                transaction[i] = action.payload.details[i];
              else if (i === "mobileNumber")
                transaction[i] = action.payload.details[i];
              else transaction.extraDetails[i] = action.payload.details[i];
            }
          }
          return transaction;
        }),
      };
    case SET_TRANSACTION:
      return {
        ...state,
        loading: false,
        transactions: action.payload,
        error: "",
      };

    case CREATE_TRANSACTION:
      return {
        ...state,
        error: "",
        loading: false,
        transactions: [action.payload, ...state.transactions],
      };
    case SYNC_TRANSACTION:
      return {
        ...state,
        transaction: state.transactions.map((transaction) => {
          if (
            transaction.customer.customerID &&
            transaction.customer.customerID === action.payload.customerID
          )
            transaction.customer.customerName = action.payload.customerName;

          return transaction;
        }),
      };
    case ERROR_TRANSACTION:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case STOP_LOADING_TRANSACTION:
      return {
        ...state,
        error: "",
        loading: false,
      };
    default:
      return state;
  }
}
