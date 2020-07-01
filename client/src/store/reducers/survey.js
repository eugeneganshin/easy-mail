import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SURVEYS:
      console.log('reducerSurvey')
      console.log(action.payload)
      return action.payload;

    default:
      return state;
  }
};

export default reducer;
