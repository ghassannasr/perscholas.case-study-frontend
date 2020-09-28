import React from 'react';

//import { Container } from 'react-bootstrap';
import { Navbar, Nav, Button, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//import {NavLink} from 'react-router-bootstrap'



const Navigate = (props) => {

  function logOut() {
    //console.log("REFRESH FUNCTION: " + props.funcRefreshLogin);
    props.dispatch({ type: "LOG_OUT", payload: {} });
  }
  /*
     with Navbar: 
        when replacing expand with sm or md the breakpoint for collapsing changes, and true never collapses
        can do stick with top or bottom, and navbar moves with scrolling
        otherwise do fixed top or bottom
        See how collapseOnSelect works when added to Navbar, the menu items make the selections disappear
        when an item is selected
    with Nav:
        can use variant to make options into tabs or pills, etc.
        tried this below:
        <Nav.Link><NavLink to="/about">About</NavLink></Nav.Link>
    */
  // const currMonth = new Date().getMonth() + 1;
  // const currYear = new Date().getFullYear();
  // const monthyear = { month: currMonth, year: currYear };
  return (
    <Navbar fixed="top" bg="light" expand="sm">
      <Navbar.Brand href="/">LoremIpsum</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav >
          <Nav.Link as={Link} to='/blog/current'>Blog</Nav.Link>
        </Nav>
        {/* <Link className="link-anchor-nav" to='/blog/current'>Blog</Link> */}
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
          {/* <Navbar.Text className="mr-auto">
            { 
              props.login.adminIndex !== "" && props.login.adminIndex !== "error"
              ? "Logged in as: " + (props.admins)[0].firstname + " " + (props.admins)[0].lastname
              : ""
            }
            
            <Button onClick={logOut} variant="secondary" size="sm">Logout</Button>
        </Navbar.Text> */}
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = state => ({
  login: state.login,
  admins: state.admins,
  //funcRefreshLogin: state.funcRefreshLogin
});

export default connect(mapStateToProps)(Navigate);
