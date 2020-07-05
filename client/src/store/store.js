import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { reducer as formReducer } from "redux-form";
import createSocketIoMiddleware from 'redux-socket.io';
import thunk from 'redux-thunk'
import io from 'socket.io-client';

import authReducer from "./reducers/auth";
import surveyReducer from "./reducers/survey";
import socketReducer from './middleware/socket'
import logger from './middleware/logger'


let socket = io('http://localhost:5000');

let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

const rootReducer = combineReducers({
    authenticated: authReducer,
    surveys: surveyReducer,
    form: formReducer,
    socket: socketReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(socketIoMiddleware, thunk)))
export default store