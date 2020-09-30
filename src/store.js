import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';

import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import reducer from './reducers/reducer';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

export default createStore(
  reducer,
  composeEnhancers(applyMiddleware(reduxImmutableStateInvariant()))
);


