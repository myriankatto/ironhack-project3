import React, { Component } from 'react';
import './style.css';

class NavBarProfileButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.state);
    return (
      <h1 onMouseDown={this.props.handleMouseDownProfile}>profile button</h1>
      // <img
      //   href={this.props.user.picture}
      //   id="imgButton"
      //
      //   alt={this.props.user.name}
      // ></img>
    );
  }
}

export default NavBarProfileButton;
