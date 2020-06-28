import 'materialize-css/dist/css/materialize.min.css'
import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'

import App from './components/App'
import store from './store/store'

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root'),
)
