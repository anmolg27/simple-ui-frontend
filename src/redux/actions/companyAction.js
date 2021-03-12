import {
  LOADING_COMPANY,
  STOP_LOADING_COMPANY,
  SET_COMPANY,
  CREATE_COMPANY,
  SET_COMPANY_LOGO,
  UPDATE_COMPANY,
  EDIT_COMPANY_LOADING,
  STOP_EDIT_COMPANY_LOADING,
} from "../actionTypes";
import axios from "axios";
import { url } from "../../utils/url";
import history from "../../utils/history";

export const getCompany = (setShowForm) => (dispatch) => {
  dispatch({ type: LOADING_COMPANY });
  axios
    .get(`${url}/company`)

    .then((res) => {
      console.log("company is");
      console.log(res.data);
      if (res.data.companies.length > 0)
        dispatch({ type: SET_COMPANY, payload: res.data.companies[0].company });
      else {
        setShowForm(true);
        dispatch({ type: SET_COMPANY, payload: null });
      }
    })
    .catch((error) => {
      console.log(error.status);
      dispatch({ type: STOP_LOADING_COMPANY });
    });
};

// ------------------------------------------------------

export const createCompany = (vals, closeModal, image) => (dispatch) => {
  dispatch({ type: EDIT_COMPANY_LOADING });
  axios
    .post(`${url}/company`, vals)
    .then((res) => {
      dispatch({
        type: CREATE_COMPANY,
        payload: { ...res.data.company },
      });
      closeModal();
    })
    .catch((error) => {
      alert("Something went wrong");
    })
    .finally(() => {
      dispatch({ type: STOP_EDIT_COMPANY_LOADING });
      if (image)
        axios
          .post(`${url}/companyLogo?companyName=${vals.companyName}`, image)
          .then((resp) => {
            dispatch({
              type: SET_COMPANY_LOGO,
              payload: { companyName: vals.companyName, image: resp.data },
            });
          })
          .catch((error) => {
            alert("logo upload failed");
          })
          .finally(() => {
            history.push("/home");
          });
    });
};

export const updateCompany = (vals, companyID, closeModal) => (dispatch) => {
  dispatch({ type: EDIT_COMPANY_LOADING });
  axios
    .post(`${url}/company/${companyID}`, vals)
    .then((res) => {
      dispatch({ type: UPDATE_COMPANY, payload: vals });
      closeModal();
    })
    .catch((err) => {
      alert("something went wrong");
    })
    .finally(() => {
      dispatch({ type: STOP_EDIT_COMPANY_LOADING });
    });
};
