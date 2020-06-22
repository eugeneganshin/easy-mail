import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  authenticated: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER:
      return updateObject(state, {
        authenticated: action.payload === "" ? false : action.payload,
      });

    case actionTypes.LOGOUT_USER:
      return updateObject(state, {
        authenticated: action.payload,
      });

    default:
      return state;
  }
};

export default reducer;
