import './style.scss';
import React, { Component } from 'react';
import { Swipeable } from 'react-swipeable';
import AddTask from '../AddTask';

class FooterAddTasksToggle extends Component {
  constructor(props) {
    super(props);
  }

  showOperatorAddTasks() {}
  render() {
    var visibility = 'hide';

    if (this.props.menuVisibility) {
      visibility = 'show';
    }

    return (
      <Swipeable onSwipedLeft={this.props.handleMouseUp}>
        <div id="flyoutMenu_AddTask" className={visibility}>
       
          <h2>Add Tasks Form</h2>
       <AddTask />

            <a onMouseUp={this.props.handleMouseUp}>
              {' '}
              <img src="./../images/right-white.svg" alt="go back icon" />
            </a>
        </div>
      </Swipeable>
    );
  }
}

export default FooterAddTasksToggle;
