import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';


const NavBarToggleWorkspace = (props) => {
  return (
    <div>
      <Nav.Link href="#features">Configuration</Nav.Link>
      <Nav.Link href="#pricing">Users</Nav.Link>
      <NavDropdown title="Share" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
      <Nav.Link href="/upgrade">Upgrade</Nav.Link>
      <Nav.Link href="#pricing">Left</Nav.Link>
    </div>
  )
};

export default NavBarToggleWorkspace;
