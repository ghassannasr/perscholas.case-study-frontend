
import React, { useEffect, useContext, useSelector } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import { Container } from 'react-bootstrap';
import Navigate from './components/layout/Navigate';
import About from './components/layout/About';
import Home from './components/layout/Home';
import LoginForm from './components/Login';
import ServiceRequests from './components/ServiceRequests';


const App = () => {

  return (
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
                <Route path="/login" component={LoginForm} />
                <Route path="/servicerequests" content={ServiceRequests} />
              </Switch>
            </Container>
          </div>
        </Router>
  );
};



export default App;
