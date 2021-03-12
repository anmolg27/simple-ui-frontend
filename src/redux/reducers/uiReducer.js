import {
  LOADING_UI,
  SET_UI_ERROR,
  LOGIN_USER,
  STOP_LOADING_UI,
} from "../actionTypes";

const initialState = {
  uiLoading: false,
  uiError: "",
};

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_UI:
      return { ...state, uiLoading: true, uiError: "" };
    case STOP_LOADING_UI:
      return { ...state, uiLoading: false };
    case LOGIN_USER:
      return { ...state, uiLoading: false, uiError: "" };
    case SET_UI_ERROR:
      return { ...state, uiLoading: false, uiError: action.payload };
    default:
      return state;
  }
}
