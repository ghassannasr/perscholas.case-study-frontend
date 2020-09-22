import React from 'react';

import { Container } from 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//import {NavLink} from 'react-router-bootstrap'


const Navigate = () => {
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
    const currMonth = new Date().getMonth() + 1;
    const currYear = new Date().getFullYear();
    const monthyear = {month: currMonth, year: currYear};
    console.log("THE MONTH IS: " + monthyear.month);
        return (
    <Navbar fixed="top" bg="light" expand="sm">
      <Navbar.Brand href="/">Shopper</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link className="link-anchor-nav" to='/blog/current'>Blog
          </Link>
          {/* <Link to="/servicerequests">Service</Link> */}
          <Link className="link-anchor-nav" to="/about">About</Link>
          <Link className="link-anchor-nav" to="/login">Login</Link>
          {/* <Link to="/test">Test</Link> */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    );

  
    };

export default Navigate;


{/* <Row>
          <Col className="col-6">
            <h1>Home Page</h1>
            <div>
              <h2>Welcome {props.loginForm.values.email}</h2>
            This is a blog post that is long enough to illustrate the layout and the use of Bootstrap to optimize the responsive design</div>
          </Col>
        </Row> */}