import {
  createStore,
  applyMiddleware,
  compose,
  //combineReducers,
} from 'redux';

import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
//import thunk from 'redux-thunk';
import reducer from './reducers/reducer';
import { createBrowserHistory } from 'history';
//import { routerMiddleware } from 'connected-react-router';

export const history = createBrowserHistory();

// const rootReducer = combineReducers({
//   TODO: created several reducers that get called as needed
// });


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

export default createStore(
  reducer,
//  initialState,
  composeEnhancers(applyMiddleware(reduxImmutableStateInvariant()))
);


/* 
Below are two createStore methods that I either used or was privy to.
For this project I decided to keep the functionality simple. See above.
*/


// export default createStore(
//   rootReducer,
//   compose(
//     applyMiddleware(thunk, routerMiddleware(history)),
//     window.__REDUX_DEVTOOLS_EXTENSION__
//       ? window.__REDUX_DEVTOOLS_EXTENSION__()
//       : (f) => f
//   )
// );


