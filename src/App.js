
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';

import Navigate from './components/layout/Navigate';
import Header from './components/layout/Header';
import Routes from './components/Routes';
import About from './components/layout/About';
import Archives from './components/layout/Archives';
import Elsewhere from './components/layout/Elsewhere';

const App = () => {

  return (
    <Router>
      <div className="App">
        <Container>
          <Navigate />
        </Container>
        <Container>
          <Row><Col><Header /></Col></Row>
          <Row>
            <Col sm={9} md={9}>
              <Routes />
            </Col>
            <Col sm={3} md={3} >
              <Row><Col><About /></Col></Row>
              <Row><Col><Archives /></Col></Row>
              <Row><Col><Elsewhere /></Col></Row>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
};



export default App;
