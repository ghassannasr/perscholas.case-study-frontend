import React from 'react';
import { Navbar, Nav, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Navigate = (props) => {

  function logOut() {
    props.dispatch({ type: "LOG_OUT", payload: {} });
  }

  return (
    <Navbar fixed="top" bg="light" expand="sm">
      <Navbar.Brand href="/">LoremIpsum</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav >
          <Nav.Link as={Link} to='/blog/current'>Blog</Nav.Link>
        </Nav>
        <Nav className="mr-auto"> <Nav.Link as={Link} to="/login">Login</Nav.Link></Nav>
        {
          props.login.adminIndex !== "" && props.login.adminIndex !== "error"
            ?
            <Form inline>
              <Form.Label className="mr-sm-2">Logged in as: Ghassan Nasr</Form.Label>
              <Button onClick={logOut} variant="outline-primary" size="sm">Logout</Button>
            </Form>
            :
            ""
        }
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = state => ({
  login: state.login,
  admins: state.admins,
});

export default connect(mapStateToProps)(Navigate);
