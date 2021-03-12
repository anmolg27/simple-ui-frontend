import axios from "axios";
import { url } from "../../utils/url";
import {
  LOADING_OPERATOR,
  STOP_LOADING_OPERATOR,
  SET_OPERATOR,
  CREATE_OPERATOR,
  DELETE_OPERATOR,
} from "../actionTypes";

export const createOperator = (vals) => (dispatch) => {
  dispatch({ type: LOADING_OPERATOR });
  axios
    .post(`${url}/operator`, vals)
    .then((res) => {
      dispatch({ type: CREATE_OPERATOR, payload: res.data });
    })
    .catch((error) => {
      alert(error.error);
      dispatch({ type: STOP_LOADING_OPERATOR });
    });
};
export const getOperators = () => (dispatch) => {
  dispatch({ type: LOADING_OPERATOR });
  axios
    .get(`${url}/operators`)
    .then((res) => {
      dispatch({ type: SET_OPERATOR, payload: res.data });
    })
    .catch((error) => {
      alert("cant load operators. Please check your internet connection");
    });
};

export const deleteOperator = (vals) => (dispatch) => {
  dispatch({ type: LOADING_OPERATOR });
  axios.post(`${url}/deleteOperator`, vals).then((res) => {
    dispatch({ type: DELETE_OPERATOR, payload: vals.email });
  });
};
