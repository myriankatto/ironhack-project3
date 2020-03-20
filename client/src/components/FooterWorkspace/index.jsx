// components/navbar/Navbar.js

import React, { Component } from 'react';
import AddTask from '../AddTask';
import FooterAddTasksToggle from '../FooterAddTasksToggle';
import FooterAddTaskButton from '../FooterAddTaskButton';
import FooterViewScoresToggle from '../FooterViewScoresToggle';
import FooterViewScoresButton from '../FooterViewScoresButton';
import './style.scss';
// import { loadUserInformation } from './../../services/authentication';

// import { Swipeable } from 'react-swipeable';

class FooterWorkspace extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      visibleAddTasks: false,
      sidebarAddTasks: false,
      visibleViewScores: false,
      sidebarViewScores: false
    };

    this.handleMouseUpAddTasks = this.handleMouseUpAddTasks.bind(this);
    this.toggleAddTasks = this.toggleAddTasks.bind(this);
    this.toggleSwipeAddTasks = this.toggleSwipeAddTasks.bind(this);
    this.handleMouseUpViewScores = this.handleMouseUpViewScores.bind(this);
    this.toggleViewScores = this.toggleViewScores.bind(this);
    this.toggleSwipeViewScores = this.toggleSwipeViewScores.bind(this);
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

  //for the Toggle View Scores
  handleMouseUpViewScores() {
    this.toggleViewScores();
  }

  toggleViewScores() {
    this.setState({
      visibleViewScores: !this.state.visibleViewScores
    });
  }
  toggleSwipeViewScores() {
    this.setState({
      sidebarViewScores: !this.state.sidebarViewScores
    });
  }

  componentWillUnmount() {}

  render() {
    // console.log('FOOTER WORKSPACE PROP', this.props.idWorkspace);
    return (
      <footer className="footer-style">
        <FooterViewScoresButton
          handleMouseUp={this.handleMouseUpViewScores}
          menuVisibility={this.state.visibleViewScores}
        />
        <FooterViewScoresToggle
          handleMouseUp={this.handleMouseUpViewScores}
          menuVisibility={this.state.visibleViewScores}
          idWorkspace={this.props.idWorkspace}
          workspaceName={this.props.workspace.name}
          score={this.props.score}
        />

        <h5>
          <small>Your Score:</small> {this.props.score} <br/>
          <small>Workspace Score:</small> {this.props.workspace.score}
        </h5>
        <FooterAddTasksToggle
          handleMouseUp={this.handleMouseUpAddTasks}
          menuVisibility={this.state.visibleAddTasks}
          idWorkspace={this.props.idWorkspace}
          user={this.props.user}
          workspaceOperator={this.props.workspaceOperator}
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

export default FooterWorkspace;
