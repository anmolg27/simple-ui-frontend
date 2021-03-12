import axios from "axios";
import { url } from "../../utils/url";
import history from "../../utils/history";
import {
  LOADING_ROOM,
  STOP_LOADING_ROOM,
  SET_ROOM,
  CREATE_ROOM,
} from "../actionTypes";

export const createRoom = (vals, phistory) => (dispatch) => {
  dispatch({ type: LOADING_ROOM });

  axios
    .post(`${url}/room`, vals)
    .then((res) => {
      dispatch({
        type: CREATE_ROOM,
        payload: { ...res.data },
      });
      history.push("/home");
    })
    .catch((error) => {
      alert("Something went wrong");
    });
};

export const updateAndGetRooms = () => (dispatch) => {
  let roomsData = [];
  dispatch({ type: LOADING_ROOM });
  axios
    .get(`${url}/rooms`)
    .then((res) => {
      res.data.forEach((iv) => {
        roomsData.push({ ...iv, message: "recently fetched" });
      });
      localStorage.setItem("rooms", JSON.stringify(roomsData));
      dispatch({ type: SET_ROOM, payload: roomsData });
    })
    .catch((error) => {
      alert("Something went wrong");
      dispatch({ type: STOP_LOADING_ROOM });
    });
};
