
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';

import Navigate from './components/layout/Navigate';
import Header from './components/layout/Header';
import Routes from './components/Routes';


const App = () => {

  return (
    <Router>
      <div className="App">
        <Container>
          <Navigate />
        </Container>
        <Container>
          <Row><Col><div height="30px"></div></Col></Row>
          <Row><Col><Header /></Col></Row>
          <Row>
            <Col>
              <Routes />
            </Col>
            
          </Row>
        </Container>
      </div>
    </Router>
  );
};



export default App;
