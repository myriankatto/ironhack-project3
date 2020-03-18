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
          <nav className="buttonPlusMenu">
            <a href="#" onMouseDown={this.props.handleMouseDown}>
              <img
                style={{
                  width: '2em',
                  float: 'left',
                  position: 'relative',
                  margin: '2em 1em'
                }}
                src="./../images/left-white.svg"
                alt="go back icon"
              />
            </a>

            <h2>
              <img src="./../images/workspaceConfig.svg" alt="go back icon" />
              <Link style={{ color: 'white' }} to={'/editWorkspace'}>
                Edit Workspace
              </Link>
            </h2>
            <h2>
              <img src="./../images/list.svg" alt="go back icon" />
              <Link style={{ color: 'white' }} to={'/listWorkspaceUsers'}>
                List of Users
              </Link>
            </h2>
            <h2>
              <img src="./../images/share-svgrepo-com.svg" alt="go back icon" />
              <Link style={{ color: 'white' }} to={'/'}>
                Share Workspace
              </Link>
            </h2>
            <h2>
              <img src="./../images/premium-svgrepo-com.svg" alt="go back icon" />
              <Link style={{ color: 'white' }} to={'/'}>
                Upgrade
              </Link>
            </h2>
          </nav>
        </div>
      </Swipeable>
    );
  }
}

export default NavBarToggleWorkspace;
