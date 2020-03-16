import React, { Component } from 'react';
import './style.css';

class NavBarProfileButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log(this.state);
    return (
      <img
        id="buttonImg"
        src={this.props.user.picture}
        alt={this.props.user.name}
        onMouseDown={this.props.handleMouseDownProfile}
      />
    );
  }
}

export default NavBarProfileButton;
