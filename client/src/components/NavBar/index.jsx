// components/navbar/Navbar.js

import React, { Component } from 'react';
import NavBarToggleWorkspace from './../NavBarToggleWorkspace';
import NavBarProfile from './../NavBarProfile';
import NavBarProfileButton from './../NavBarProfileButton';
import MenuButton from '../NavBarMenuButton';
import './style.scss';
import { loadUserInformation } from './../../services/authentication';

// import { Swipeable } from 'react-swipeable';

class Navbar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      visibleWorkspace: false,
      sidebarWorkspace: false,
      visibleProfile: false,
      sidebarProfile: false
    };
    this.handleMouseDownWorkspace = this.handleMouseDownWorkspace.bind(this);
    this.toggleMenuWorkspace = this.toggleMenuWorkspace.bind(this);
    this.toggleSwipeWorkspace = this.toggleSwipeWorkspace.bind(this);
    this.handleMouseDownProfile = this.handleMouseDownProfile.bind(this);
    this.toggleMenuProfile = this.toggleMenuProfile.bind(this);
    this.toggleSwipeProfile = this.toggleSwipeProfile.bind(this);
  }
  //for the Toggle Workshop Menu
  handleMouseDownWorkspace() {
    this.toggleMenuWorkspace();
    // e.stopPropagation();
  }

  toggleMenuWorkspace() {
    this.setState({
      visibleWorkspace: !this.state.visibleWorkspace
    });
  }
  toggleSwipeWorkspace() {
    this.setState({
      sidebarWorkspace: !this.state.sidebarWorkspace
    });
  }
  //for the profile Menu
  handleMouseDownProfile() {
    this.toggleMenuProfile();
    // e.stopPropagation();
  }

  toggleMenuProfile() {
    this.setState({
      visibleProfile: !this.state.visibleProfile
    });
  }
  toggleSwipeProfile() {
    this.setState({
      sidebarProfile: !this.state.sidebarProfile
    });
  }
  render() {
    return (
      <nav
        className="nav-style"
        // style={{ display: 'flex', justifyContent: 'space-between', width: '100' }}
      >
        <MenuButton handleMouseDown={this.handleMouseDownWorkspace} />
        <NavBarToggleWorkspace
          handleMouseDown={this.handleMouseDownWorkspace}
          menuVisibility={this.state.visibleWorkspace}
        />
        <NavBarProfile
          handleMouseDownProfile={this.handleMouseDownProfile}
          menuVisibility={this.state.visibleProfile}
        />
        <NavBarProfileButton
          handleMouseDownProfile={this.handleMouseDownProfile}
          user={this.props.updateUserInformation}
        />
      </nav>
    );
  }
}

export default Navbar;
