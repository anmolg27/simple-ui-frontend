import {
  LOADING_OPERATOR,
  ERROR_OPERATOR,
  STOP_LOADING_OPERATOR,
  SET_OPERATOR,
  CREATE_OPERATOR,
  DELETE_OPERATOR,
} from "../actionTypes";

const initialState = {
  loading: false,
  operators: [],
  error: "",
};

export default function operatorsReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_OPERATOR:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case SET_OPERATOR:
      return {
        ...state,
        loading: false,
        operators: action.payload,
        error: "",
      };
    //   case UPDATE_OPERATOR:
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
    case CREATE_OPERATOR:
      return {
        ...state,
        loading: false,
        error: "",
        operators: [...state.operators, action.payload],
      };
    case DELETE_OPERATOR:
      return {
        ...state,
        loading: false,
        operators: state.operators.filter(
          (operator) => operator.email !== action.payload
        ),
      };
    case ERROR_OPERATOR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case STOP_LOADING_OPERATOR:
      return {
        ...state,
        error: "",
        loading: false,
      };
    default:
      return state;
  }
}
