import React from 'react';
import { connect } from 'react-redux';
//import Test from './Test';

const About = props => (

  <div className="sidebar-module sidebar-module-inset">
    <h4>About</h4>
    <h4>Welcome {props.loginForm.values.username}</h4>
    <p>Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.</p>
    <h4>A BLOG POST {props.blogPosts.length}</h4>
  </div>
);

const mapStateToProps = state => ({
  loginForm: state.loginForm,
  blogPosts: state.blogPosts
  //loginReducer: state.loginForm
});

export default connect(mapStateToProps)(About);

