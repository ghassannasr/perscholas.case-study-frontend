
import React, { useEffect, useContext, useSelector } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import { Container } from 'react-bootstrap';
import Navigate from './components/Navigate';
//import BlogHeader from './components/BlogHeader';
import About from './components/About';
import ProductList from './components/ProductList';
import Shop from './components/Shop';
import Home from './components/Home';
import Map from './components/Map';
import Parks from './components/Parks';
import LoginForm from './components/LoginForm';
import Shop2 from './components/Shop2';
import ServiceRequests from './components/ServiceRequests';


import { Provider } from 'react-redux';
//import { createStore } from 'redux';
// import { createStore, applyMiddleware, compose } from 'redux';

// import reducer from './redux/reducer';
// import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';


// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

// const initialState = {
//   loginForm: {
//     values: {
//       email: "",
//       password: ""
//     },
//     errors: {
//       email: "",
//       password: ""
//     }
//   }
// };

// const store = createStore(
//   reducer,
//   initialState,
//   composeEnhancers(applyMiddleware(reduxImmutableStateInvariant()))
// );


const App = ({store}) => {

  return (
    
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navigate />




            <Container>


              <div className="blog-header">
                <h1 className="blog-title">Beirut Good Times</h1>
                <p className="lead blog-description">A city I still call home.</p>
              </div>


              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/about" component={About} />
                <Route path="/products" component={ProductList} />
                <Route path="/shop" component={Shop} />
                <Route path="/shop2" component={Shop2} />
                <Route path="/map" component={Map} />
                <Route path="/parks" component={Parks} />
                <Route path="/login" component={LoginForm} />
                <Route path="/servicerequests" content={ServiceRequests} />
              </Switch>
            </Container>
          </div>
        </Router>
      </Provider>
  
  );
};



export default App;
