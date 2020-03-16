import React, { Component } from 'react';

import * as workspaceService from './services/workspace';

import CreateWorkspace from '../../components/CreateWorkspace';
// import NavBar from '../../components/NavBar';
// import SearchWorkspace from '../../components/serchWorkspace';

class WorkspaceDashboard extends Component {
  constructor() {
    super();
    this.state = {
      workspaces: [],
      query: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleWorkspaceAddition = this.handleWorkspaceAddition.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  // componentDidMount() {
  //   this.listWorkspaces();
  // }

  // listWorkspaces() {
  //   workspaceService
  //     .list()
  //     .then(workspaces => {
  //       this.setState({
  //         workspaces
  //       });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  handleWorkspaceAddition(workspace) {
    workspaceService
      .create(workspace)
      .then(data => {
        this.setState(previousState => ({
          workspaces: [data, ...previousState.workspace]
        }));
      })
      .catch(error => {
        console.log(error);
      });
  }

  // get filteredWorkspaces() {
  //   const filteredWorkspaces = this.state.workspace.filter(workspace => {
  //     return workspace.name.toLowerCase().includes(this.state.query.toLowerCase());
  //   });
  //   return filteredWorkspaces;
  // }

  render() {
    return (
      <div>
        <CreateWorkspace addWorkspace={this.handleWorkspaceAddition} />
        {/* <WorkspaceList workspaces={this.filteredWorkspaces} removeTask={this.handleTaskRemoval} /> */}
      </div>
    );
  }
}

export default WorkspaceDashboard;
