import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";

import { connect } from 'react-redux';

const Login = props => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="row">
      <div className="col-6">
    <Form>
      <h2>Login</h2>
      <hr />
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          isInvalid={props.loginForm.errors.email.length > 0}
          isValid={
            props.loginForm.values.email &&
            props.loginForm.errors.email.length === 0
          }
          onChange={e => setEmail(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          {props.loginForm.errors.email}
        </Form.Control.Feedback>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          isInvalid={props.loginForm.errors.password.length > 0}
          isValid={
            props.loginForm.values.password &&
            props.loginForm.errors.password.length === 0
          }
          onChange={e => setPassword(e.target.value)}
        />
        <Form.Control.Feedback type="invalid">
          {props.loginForm.errors.password}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button
        variant="primary"
        type="button"
        onClick={() =>
          props.dispatch({ type: "FORM_SUBMIT", payload: { email, password } })
        }
      >
        Submit
      </Button>
    </Form>
    </div>
    <div className="col-6"></div>
    </div> /*close top row*/
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
export default connect(mapStateToProps)(Login);