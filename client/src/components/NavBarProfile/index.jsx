//it is the pink menu
import './style.scss';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signOut } from './../../services/authentication';

class NavBarProfile extends Component {
  constructor(props) {
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
  }
  handleSignOut = () => {
    signOut()
      .then(() => {
        this.props.updateUserInformation(null);
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    var visibility = 'hide';

    if (this.props.menuVisibility) {
      visibility = 'show';
    }

    return (
      <div id="flyoutSidebarProfile" className={visibility}>
        <h2>
          <a href="#" onMouseDown={this.props.handleMouseDownProfile}>
            Go Back
          </a>
        </h2>
        <img src="#" alt="profile image" />
        <h2>Name</h2>
        <button onClick={this.handleSignOut}>Log-Out</button>
      </div>
    );
  }
}

export default NavBarProfile;
