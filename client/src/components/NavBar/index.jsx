import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import NavBarToggleWorkspace from '../NavBarToggleWorkspace';

const NavBar = (props) => {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
       
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavBarToggleWorkspace />
          </Nav>

          <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav>
          
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}


export default NavBar;