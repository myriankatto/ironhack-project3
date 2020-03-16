//it is the pink menu
import './style.scss';
import React, { Component } from 'react';

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
          <a href="#">Components</a>
        </h2>
        <h2>
          <a href="#">Others</a>
        </h2>
      </div>
    );
  }
}

export default NavBarToggleWorkspace;
