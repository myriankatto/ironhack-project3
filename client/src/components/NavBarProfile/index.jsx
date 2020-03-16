//it is the pink menu
import './style.scss';
import React, { Component } from 'react';
import { signOut } from './../../services/authentication';
import { useSwipeable, Swipeable } from 'react-swipeable';

class NavBarProfile extends Component {
  constructor(props) {
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
  }
  handleSignOut = () => {
    signOut()
      .then(() => {
        console.log(this.props);

        this.props.updateUserInformation(null);
        return this.props.handleMouseDownProfile();
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
      <Swipeable onSwipedRight={this.props.handleMouseDownProfile}>
        <div id="flyoutSidebarProfile" className={visibility}>
          <h2>
            <a href="#" onMouseDown={this.props.handleMouseDownProfile}>
              Go Back
            </a>
          </h2>
          <img src={this.props.user.picture} alt={this.props.user.name} />
          <h2>{this.props.user.name}</h2>
          <button onClick={this.handleSignOut}>Log-Out</button>
        </div>
      </Swipeable>
    );
  }
}

export default NavBarProfile;
