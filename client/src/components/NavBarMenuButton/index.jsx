import React, { Component } from 'react';
import './style.scss';

class MenuButton extends Component {
  render() {
    return (
      <div className="menu-btn">
        <button onMouseDown={this.props.handleMouseDown}>
          <img src="./../images/menu-white.svg" alt="menu" />
        </button>
      </div>
    );
  }
}

export default MenuButton;
