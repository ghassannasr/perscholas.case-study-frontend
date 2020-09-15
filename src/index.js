
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './redux/reducer';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

import { Provider } from 'react-redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

const initialState = {
  loginForm: {
    values: {
      email: "",
      password: ""
    },
    errors: {
      email: "",
      password: ""
    }
  }
};

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(reduxImmutableStateInvariant()))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
