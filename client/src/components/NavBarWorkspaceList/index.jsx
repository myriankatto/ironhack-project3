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
          <a href="#" onMouseDown={this.props.handleMouseDown}>
            Go Back
          </a>
        </h2>
        <h2>
          <Link to={}>Edit Workspace</Link>to {}{' '}
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

export default NavBarToggleWorkspace;
