import {
  LOGIN_USER,
  LOADING_USER,
  SET_USER_ERROR,
  SET_UNAUTHENTICATED,
} from "../actionTypes";

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  error: "",
};
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_USER:
      return {
        ...state,
        authenticated: false,
        loading: true,
        credentials: {},
        error: "",
      };
    case LOGIN_USER:
      return {
        ...state,
        authenticated: true,
        loading: false,
        credentials: action.payload,
        error: "",
      };
    case SET_USER_ERROR:
      return {
        ...state,
        authenticated: false,
        loading: false,
        credentials: {},
        error: action.payload,
      };
    case SET_UNAUTHENTICATED:
      return {
        ...state,
        authenticated: false,
        loading: false,
        credentials: {},
        error: "",
      };
    default:
      return state;
  }
}
