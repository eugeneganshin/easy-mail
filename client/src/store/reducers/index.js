import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import authReducer from "./auth";
import surveyReducer from "./survey";

const rootReducer = combineReducers({
  authenticated: authReducer,
  surveys: surveyReducer,
  form: formReducer,
});

export default rootReducer;
