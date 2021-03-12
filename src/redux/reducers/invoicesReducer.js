import { CREATE_INVOICE } from "../actionTypes";
// let customersData;
const initialState = {
  loading: false,
  invoice: {},
  error: "",
};
export default function invoiceReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_INVOICE:
      return {
        ...state,
        loading: false,
        error: "",
        invoice: action.payload,
      };

    default:
      return state;
  }
}
