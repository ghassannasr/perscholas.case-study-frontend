
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './App.css';

import Navigate from './components/layout/Navigate';
import Header from './components/layout/Header';
import Routes from './components/Routes';

const App = () => {

  return (
        <Router>
          <div className="App">
            <Navigate />
            <Container>
              <Header />
              <Routes />
            </Container>
          </div>
        </Router>
  );
};



export default App;
