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
          <h2>Create a new task
            <a onMouseUp={this.props.handleMouseUp}>
              {' '}
              <img  className="arrow-icon" src="./../images/right.svg" alt="go back icon" />
            </a></h2>
       
          <AddTask 
          idWorkspace={this.props.idWorkspace}
          user={this.props.user}
          workspaceOperator={this.props.workspaceOperator}
          />

        </div>
      </Swipeable>
    );
  }
}

export default FooterAddTasksToggle;
