//it is the pink menu
import './style.scss';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useSwipeable, Swipeable } from 'react-swipeable';
import { editWorkspace } from './../../services/workspaceUser';

class NavBarToggleWorkspace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workspace: []
    };
  }

  showOperatorWorkSpace() {}
  render() {
    var visibility = 'hide';

    if (this.props.menuVisibility) {
      visibility = 'show';
    }

    return (
      <Swipeable onSwipedLeft={this.props.handleMouseDown}>
        <div id="flyoutMenu" className={visibility}>
          <h2>
            <a onMouseDown={this.props.handleMouseDown}>Go Back by click or swipe left</a>
          </h2>
          <h2>
            <Link to={'/editWorkspace'}>Edit Workspace</Link>
          </h2>
          <h2>
            <Link to={'/listWorkspaceUsers'}>List of Users</Link>
          </h2>
          <h2>
            <a href="#">Share Workspace</a>
          </h2>
          <h2>
            <a href="#">Upgrade</a>
          </h2>
        </div>
      </Swipeable>
    );
  }
}

export default NavBarToggleWorkspace;
