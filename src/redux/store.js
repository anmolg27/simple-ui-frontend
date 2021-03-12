import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer";
import uiReducer from "./reducers/uiReducer";
import transactionsReducer from "./reducers/transactionsReducer";
import customersReducer from "./reducers/customersReducer";
import operatorsReducer from "./reducers/operatorsReducer";
import roomsReducer from "./reducers/roomsReducer";
import companyReducer from "./reducers/companyReducer";
// import invoiceReducer from "./reducers/invoicesReducer";
import invoicesReducer from "./reducers/invoicesReducer";
// const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
// const customers = JSON.parse(localStorage.getItem("customers")) || [];
// const rooms = JSON.parse(localStorage.getItem("rooms")) || [];
// const initialState = {
//   transactions: { loading: false, error: "", transactions: transactions },
//   customers: { loading: false, error: "", customers: customers },
//   rooms: { loading: false, error: "", rooms: rooms },
// };
const middleware = [thunk];
const reducers = combineReducers({
  user: userReducer,
  ui: uiReducer,
  transactions: transactionsReducer,
  customers: customersReducer,
  rooms: roomsReducer,
  operators: operatorsReducer,
  company: companyReducer,
  invoice: invoicesReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancer(applyMiddleware(...middleware))
);

export default store;
