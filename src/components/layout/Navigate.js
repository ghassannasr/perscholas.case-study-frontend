import React from 'react';

import { Container } from 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {NavLink} from 'react-router-bootstrap'


const Navigate = () => (
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
  
    <Navbar fixed="top" bg="light" expand="sm">
      <Navbar.Brand href="/">Shopper</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/">Home</Link>
          <Link to="/servicerequests">Service</Link>
          <Link to="/about">About</Link>
          <Link to="/login">Login</Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

  
);

export default Navigate;
