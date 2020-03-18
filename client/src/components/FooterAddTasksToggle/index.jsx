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
    //console.log('PROP NO FOOTER ADD', this.props.idWorkspace)
    var visibility = 'hide';

    if (this.props.menuVisibility) {
      visibility = 'show';
    }

    
    return (
      <Swipeable onSwipedRight={this.props.handleMouseUp}>
        <div id="flyoutMenu_AddTask" className={visibility}>
       
          <h2>Add Tasks Form</h2>
          <AddTask 
          idWorkspace={this.props.idWorkspace}
          user={this.props.user}
          workspaceOperator={this.props.workspaceOperator}
          />

            <a onMouseUp={this.props.handleMouseUp}>
              {' '}
              <img src="./../images/right.svg" alt="go back icon" />
            </a>
        </div>
      </Swipeable>
    );
  }
}

export default FooterAddTasksToggle;
