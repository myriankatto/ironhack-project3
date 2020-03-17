import React, { Component } from 'react';

import './style.scss';

class FooterAddTaskButton extends Component {
  render() {
    return (
      <div className="add-task">
        <button onMouseUp={this.props.handleMouseUp}>
          <img className="add-btn" src="./../../../images/add.svg" />
        </button>
        <small>Add Task</small>
    </div>

    );
  }
}

export default FooterAddTaskButton;
