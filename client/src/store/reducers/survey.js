import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SURVEYS:
      return action.payload;

    default:
      return state;
  }
};

export default reducer;
