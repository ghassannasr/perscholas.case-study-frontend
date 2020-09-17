import React from 'react';
import { connect } from 'react-redux';

const About = props => (
  <div className="sidebar-module sidebar-module-inset">
    <h4>About</h4>
    <h4>Welcome {props.loginForm.values.email}</h4>
    <p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>
  </div>
);

const mapStateToProps = state => ({
  loginForm: state.loginForm
});

export default connect(mapStateToProps)(About);

