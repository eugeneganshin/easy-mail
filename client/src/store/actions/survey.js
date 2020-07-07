import * as actionTypes from "./actionTypes";
import axios from "axios";

export const submitSurvey = (values, history) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/api/surveys", values);
      history.push("/surveys");

      dispatch({
        type: actionTypes.FETCH_USER,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.ERROR_MODAL,
        error: error
      })
    }
  };
};

export const fetchSurveys = () => {
  return async (dispatch) => {
    const res = await axios.get("/api/surveys");
    dispatch({
      type: actionTypes.FETCH_SURVEYS,
      payload: res.data,
    });
  };
};
