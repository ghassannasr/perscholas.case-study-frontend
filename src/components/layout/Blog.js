import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Posts from '../Posts';
// import About from './About';
// import Archives from './Archives';
// import Elsewhere from './Elsewhere';
// import axios from 'axios';

//import { connect } from 'react-redux';


const Blog = (props) => {
  const monthyear = props.match.params.monthyear;
  
  
  
  return (
    <Row>
      <Col sm={9} md={9} >
        <Posts monthyear={monthyear} />
      </Col>
      <Col sm={3} md={3} >
        {/* <Row><Col><About /></Col></Row> */}
        {/* <Row><Col><Archives /></Col></Row> */}
        {/* <Row><Col><Elsewhere /></Col></Row> */}
      </Col>
    </Row>
  );
};

export default Blog;