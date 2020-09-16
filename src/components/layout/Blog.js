import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Posts from '../Posts';
import About from './About';
import Archives from './Archives';
import Elsewhere from './Elsewhere';

import { connect } from 'react-redux';


const Blog = props => {
  return (
    <Row>
      <Col sm={9} md={9} >
        <Posts />
      </Col>
      <Col sm={3} md={3} >
        <Row><Col><About /></Col></Row>
        <Row><Col><Archives /></Col></Row>
        <Row><Col><Elsewhere /></Col></Row>
      </Col>
    </Row>
  );
};


const mapStateToProps = state => ({
  loginForm: state.loginForm
});

//const mapDispatchToProps = check

//mapStateToProps specifies what part of the redux store (properties) we want to expose as props to the component
//component will subscribe to that part of the state, and each time the state changes, the component
//will be re-rendered. Each object key will become a prop on the component; e.g., loginForm, this.props.loginForm.
//Component re-renders every time props change, so should only pass in props that the component needs.
//allows only relevant part of state to be exposed to this component
//also, the connect function means don't need to explicitly subscribe or unsubscribe to the store
//mapDispatchToProps specifies what actions we want to expose as props (instead of what state)
export default connect(mapStateToProps)(Blog);
//export default Home;