import {
  LOGIN_USER,
  LOADING_USER,
  SET_USER_ERROR,
  SET_UNAUTHENTICATED,
  LOADING_UI,
  SET_UI_ERROR,
  CLEAR_DATA,
  STOP_LOADING_UI,
} from "../actionTypes";
import { url } from "../../utils/url";
import axios from "axios";
import history from "../../utils/history";

export const loginUser = (name, password) => (dispatch) => {
  dispatch(login(name, password, LOADING_USER, SET_USER_ERROR));
};
export const autoLogin = () => (dispatch) => {
  let userData = JSON.parse(localStorage.getItem("userData"));
  if (userData) {
    dispatch(login("", "", LOADING_UI, SET_UI_ERROR));
  } else {
    dispatch(login("", "", LOADING_UI, SET_UI_ERROR));
  }
};

const login = (name, password, loadingType, errorType) => (dispatch) => {
  dispatch({ type: loadingType });
  if (loadingType === LOADING_USER) {
    axios
      .post(`${url}/user/login`, {
        name,
        password,
      })
      .then((res) => {
        setAuthorizationToken(res.data.token);
        dispatch({ type: LOGIN_USER, payload: res.data.user });
        localStorage.setItem("userData", JSON.stringify(res.data.user));
        history.push("/home");
      })
      .catch((error) => {
        dispatch({
          type: errorType,
          payload: "Something went wrong. Please try again later",
        });
        console.log(error);
      });
  } else {
    axios
      .get(`${url}/user`)
      .then((res) => {
        localStorage.setItem("userData", JSON.stringify(res.data));
        dispatch({ type: LOGIN_USER, payload: res.data });
        history.push("/home");
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: errorType,
          payload: "Something went wrong. Please try again later",
        });
        unsetAuthorizationToken();
        dispatch({ type: SET_UNAUTHENTICATED });
        dispatch({ type: CLEAR_DATA });
        dispatch({ type: STOP_LOADING_UI });
        console.log(error);
      });
  }
};

export const logOutUser = () => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`/${url}/users/logout`)
    .then((res) => {
      console.log("loged out");
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      unsetAuthorizationToken();
      dispatch({ type: SET_UNAUTHENTICATED });
      dispatch({ type: CLEAR_DATA });
      dispatch({ type: STOP_LOADING_UI });
    });
};

const setAuthorizationToken = (token) => {
  const IdToken = `Bearer ${token}`;
  localStorage.setItem("IdToken", IdToken);
  axios.defaults.headers.common["Authorization"] = IdToken;
};

const unsetAuthorizationToken = () => {
  localStorage.removeItem("IdToken");
  localStorage.removeItem("userData");
  localStorage.removeItem("customers");
  localStorage.removeItem("rooms");
  delete axios.defaults.headers.common["Authorization"];
};
