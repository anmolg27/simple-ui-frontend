import {
  LOADING_COMPANY,
  ERROR_COMPANY,
  STOP_LOADING_COMPANY,
  SET_COMPANY,
  CREATE_COMPANY,
  CLEAR_DATA,
  CREATE_INVOICE,
  EDIT_COMPANY_LOADING,
  STOP_EDIT_COMPANY_LOADING,
  UPDATE_COMPANY,
} from "../actionTypes";
// let customersData;
const initialState = {
  loading: false,
  editLoading: false,
  data: {},
  error: "",
};
export default function companyReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_COMPANY:
      return {
        ...state,
        loading: true,
        error: "",
      };
    // case CREATE_INVOICE:
    //   return {
    //     ...state,
    //     data: {
    //       ...state.data,
    //       invoiceNumbers: [
    //         ...state.data.invoiceNumbers,
    //         action.payload.invoice_no,
    //       ],
    //     },
    //   };
    case CLEAR_DATA:
      return initialState;
    case SET_COMPANY:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: "",
      };

    //   case UPDATE_COMPANY:
    //     let searchedInventoryIndex = state.inventories.findIndex(
    //       (iv) => iv.id === action.payload.id
    //     );
    //     if (action.payload.message === "updated successfully") {
    //       // return state.map()
    //       return {
    //         ...state,
    //         loading: false,
    //         inventories: state.inventories.map((iv, i) => {
    //           if (i === searchedInventoryIndex) {
    //             iv = action.payload;
    //           }
    //           return iv;
    //         }),
    //         error: "",
    //       };
    //     } else {
    //       return {
    //         ...state,
    //         loading: false,
    //         error: "couldnt update inventory in database",
    //         inventories: state.inventories.map((iv, i) => {
    //           if (i === searchedInventoryIndex) {
    //             iv = { ...iv, ...action.payload };
    //           }
    //           return iv;
    //         }),
    //       };
    //     }
    case CREATE_COMPANY:
      return {
        ...state,
        loading: false,
        error: "",
        data: action.payload,
      };
    case UPDATE_COMPANY:
      return {
        ...state,
        data: { ...state.data, ...action.payload },
      };
    case ERROR_COMPANY:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case EDIT_COMPANY_LOADING:
      return {
        ...state,
        editLoading: true,
      };
    case STOP_EDIT_COMPANY_LOADING:
      return {
        ...state,
        editLoading: false,
      };
    case STOP_LOADING_COMPANY:
      return {
        ...state,
        error: "",
        loading: false,
      };
    default:
      return state;
  }
}
