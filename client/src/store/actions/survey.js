import * as actionTypes from "./actionTypes";
import axios from "axios";

export const submitSurvey = (values, history) => {
  return async (dispatch) => {
    const res = await axios.post("/api/surveys", values);

    history.push("/surveys");

    dispatch({
      type: actionTypes.FETCH_USER,
      payload: res.data,
    });
  };
};

export const fetchSurveys = () => {
  return async (dispatch) => {
    const res = await axios.get("/api/surveys");
    console.log(res.data);
    dispatch({
      type: actionTypes.FETCH_SURVEYS,
      payload: res.data,
    });
  };
};

// TODO: socket io action to get feedback from users.

export const initialData = (data) => ({
  type: actionTypes.TEST,
  payload: data
})

export const test = (socket) => {
  return async dispatch => {
    socket.on('news', data => {
      console.log(data)
      dispatch(initialData(data))
    })
  }
}