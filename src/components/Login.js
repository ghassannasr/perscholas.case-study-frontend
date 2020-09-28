
import React, { useState, useEffect } from 'react';
import { Form, Button } from "react-bootstrap";
import axios from 'axios';
import Constants from '../constants';

import { connect } from 'react-redux';

const Login = props => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [refreshLogin, setRefreshLogin] =useState(0);

  function refreshLoginForm() {
    setRefreshLogin(refreshLogin + 1);
  }

  async function fetchData() {
    axios.get(`${Constants.BLOG_DATA_API_URL}:${Constants.BLOG_DATA_API_PORT}/authors/get-authors-of-type/admin`)
      .then(response => {
        let adminList = response.data;
        console.log("ADMIN IS " + adminList[0].firstname);
        props.dispatch({ type: "ADMIN_RETRIEVE", payload: { adminList } });
      })
      .catch(error => {
        console.log(error);// some error handling
      });
  }

  useEffect(() => {
    fetchData();
    //props.dispatch({ type: "SET_LOGIN_REFRESH_HANDLE", payload: { refreshLoginForm } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshLogin]);


  return (
    <div className="row">
      <div className="col-6">
    <Form>
      <h2>Login</h2>
      <hr />
      { 
        props.login.loginMessage !== "" 
        ? 
        <Form.Text>{props.login.loginMessage}<hr /></Form.Text> 
        : <Form.Text>Please enter your administrator credentials:<hr /></Form.Text>
      }
      <Form.Group>
      {/* <Form.Group controlId="formBasicEmail"> */}
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="username"
          placeholder="Enter username"
          //isInvalid={ props.login.adminIndex === "error" }
          //isValid={ props.login.adminIndex !== "" }
          onChange={e => setUsername(e.target.value)}
        />
        {/* <Form.Control.Feedback type="valid">
          {props.login.loginMessage}
        </Form.Control.Feedback> */}
        {/* <Form.Text className="text-muted">
          We'll never share your username with anyone else.
        </Form.Text> */}
      </Form.Group>

      <Form.Group>
      {/* <Form.Group controlId="formBasicPassword"> */}
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          autoComplete="off"
          placeholder="Enter password"
          //isInvalid={ props.login.adminIndex === "error" }
          //isValid={ props.login.adminIndex !== "" }
          onChange={e => setPassword(e.target.value)}
        />
        {/* <Form.Control.Feedback type="invalid">
          {props.login.loginMessage}
        </Form.Control.Feedback>
        <Form.Control.Feedback type="valid">
          {props.login.loginMessage}
        </Form.Control.Feedback> */}
      </Form.Group>
      {/* <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
      <Button
        variant="primary"
        type="button"
        onClick={() =>
          props.dispatch({ type: "FORM_SUBMIT", payload: { username, password } })
        }
      >
        Submit
      </Button>
      <Button onClick={refreshLoginForm}>Refresh</Button>
    </Form>
    </div>
    <div className="col-6"></div>
    </div> /*close top row*/
  );
};


const mapStateToProps = state => ({
  login: state.login,
  admins: state.admins,
  //funcRefreshLogin: state.funcRefreshLogin
});
//const mapDispatchToProps = check

//mapStateToProps specifies what part of the redux store (properties) we want to expose as props to the component
//component will subscribe to that part of the state, and each time the state changes, the component
//will be re-rendered. Each object key will become a prop on the component; e.g., loginForm, this.props.loginForm.
//Component re-renders every time props change, so should only pass in props that the component needs.
//allows only relevant part of state to be exposed to this component
//also, the connect function means don't need to explicitly subscribe or unsubscribe to the store
//mapDispatchToProps specifies what actions we want to expose as props (instead of what state)
export default connect(mapStateToProps)(Login);