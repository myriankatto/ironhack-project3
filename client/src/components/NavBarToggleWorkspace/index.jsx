<<<<<<< HEAD
//it is the pink menu
import './style.scss';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBarToggleWorkspace extends Component {
  render() {
    var visibility = 'hide';

    if (this.props.menuVisibility) {
      visibility = 'show';
    }

    return (
      <div id="flyoutMenu" className={visibility}>
        <h2>
          <a onMouseDown={this.props.handleMouseDown}>Go Back</a>
        </h2>
        <h2>
          <Link to={'/'}>Edit Workspace</Link>
        </h2>
        <h2>
          <a href="#">Share</a>
        </h2>
        <h2>
          <a href="#">List of Users</a>
        </h2>
        <h2>
          <a href="#">Upgrade</a>
        </h2>
      </div>
    );
  }
}
=======
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
      <Nav.Link href="/checkout">Upgrade</Nav.Link>
      
    </div>
  )
};
>>>>>>> main

export default NavBarToggleWorkspace;
