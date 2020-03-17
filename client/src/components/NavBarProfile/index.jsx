//it is the pink menu
import './style.scss';
import React, { Component } from 'react';
import { signOut } from './../../services/authentication';
import { useSwipeable, Swipeable } from 'react-swipeable';
import { Link } from 'react-router-dom';

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
      <Swipeable onSwipedRight={this.props.handleMouseDownProfile}>
        <div id="flyoutSidebarProfile" className={visibility}>
          <a href="#" onMouseDown={this.props.handleMouseDownProfile}>
            <img
              style={{
                width: '2em',
                float: 'right',
                position: 'relative',
                margin: '2em 1em'
              }}
              src="./../images/right-white.svg"
              alt="go back icon"
            />
          </a>
          <img
            style={{ width: '10em', height: '10em', margin: '0 auto', borderRadius: '50%' }}
            src={this.props.user.picture}
            alt={this.props.user.name}
          />
          <h2 style={{ color: 'white', fontWeight: '500', marginTop: '1em' }}>
            {this.props.user.name}
          </h2>
          <p style={{ color: 'white', fontWeight: '200' }}>{this.props.user.email}</p>

          <Link
            style={{
              backgroundColor: '#3f3d56',
              fontWeight: '200',
              color: 'white',
              margin: '3em 6em 7em 6em',
              borderRadius: '2em',
              padding: '0.3em 1em'
            }}
            to="/edit"
          >
            Edit Profile
          </Link>

          <button style={{ color: 'white'}} onClick={this.handleSignOut}>
            <img
              style={{ width: '1.6em', margin: '1em' }}
              src="./../images/logout.svg"
              alt="logout icon"
            />
            Logout
          </button>
          <h2></h2>
        </div>
      </Swipeable>
    );
  }
}

export default NavBarProfile;
