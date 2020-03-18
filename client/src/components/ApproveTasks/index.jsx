import React, { Component } from 'react';

import {pending as PendingTasks } from '../../services/task';



export default class ApproveTasks extends Component {
  constructor(props){
    super(props);
    this.state={
      tasksPending:[]
    }
  };

  componentDidMount(){
    this.fetchData();
  };

  fetchData(){
    const id = this.props.idWorkspace;
    // PendingTasks(id)
    // .then
  }
  render() {
    return (
      <div>
        <h1>APPROVE TASKS</h1>
      </div>
    )
  }
}
