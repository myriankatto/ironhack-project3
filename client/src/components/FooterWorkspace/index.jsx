// components/navbar/Navbar.js

import React, { Component } from 'react';
import AddTask from '../AddTask';
import FooterAddTaskButton from '../FooterAddTaskButton';
import FooterShowScores from '../FooterShowScores';
import FooterAddTasksToggle from '../FooterAddTasksToggle';
import './style.scss';
// import { loadUserInformation } from './../../services/authentication';

// import { Swipeable } from 'react-swipeable';

class FooterWorkspacce extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      visibleAddTasks: false,
      sidebarAddTasks: false,
      
    };
    this.handleMouseUpAddTasks = this.handleMouseUpAddTasks.bind(this);
    this.toggleAddTasks = this.toggleAddTasks.bind(this);
    this.toggleSwipeAddTasks = this.toggleSwipeAddTasks.bind(this);
  }
  //for the Toggle AddTask Form
  handleMouseUpAddTasks() {
    this.toggleAddTasks();
  }

  toggleAddTasks() {
    this.setState({
      visibleAddTasks: !this.state.visibleAddTasks
    });
  }
  toggleSwipeAddTasks() {
    this.setState({
      sidebarAddTasks: !this.state.sidebarAddTasks
    });
  }

  render() {
    //console.log('FOOTER WORKSPACE PROP', this.props.idWorkspace);
    return (
      <footer className="footer-style">
        <FooterShowScores />
        
        <FooterAddTasksToggle
          handleMouseUp={this.handleMouseUpAddTasks}
          menuVisibility={this.state.visibleAddTasks}
          idWorkspace={this.props.idWorkspace}
        />
        <FooterAddTaskButton
          handleMouseUp={this.handleMouseUpAddTasks}
          menuVisibility={this.state.visibleAddTasks}
          user={this.props.user}
          updateUserInformation={this.props.updateUserInformation}
         
        />
        
      </footer>
    );
  }
}

export default FooterWorkspacce;
