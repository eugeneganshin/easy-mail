import 'materialize-css/dist/css/materialize.min.css'
import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'

import App from './components/App'
import rootReducer from './store/reducers/index'

const store = createStore(rootReducer, {}, applyMiddleware(reduxThunk))

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root'),
)
