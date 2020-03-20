import React, { Component } from 'react';

import NavBar from '../../components/NavBar';

import { single as singleWorkspace } from '../../services/workspace';

/*COMPONENTES*/
import FooterWorkspace from '../../components/FooterWorkspace';
import Tasks from '../../components/Task';

import ApproveTasks from '../../components/ApproveTasks';

export default class WorkspaceCreate extends Component {
  //Solucao para erro: Can't perform a React state update on an unmounted component:
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      workspace: [],
      workspaceId: this.props.match.params.id
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchData();
  }

  componentDidUpdate() {
    this.fetchData();
  }

  fetchData() {
    if (this.state.workspaceId !== this.props.match.params.id) {
      this.setState({ workspaceId: this.props.match.params.id });
    }
    singleWorkspace(this.state.workspaceId)
      .then(workspace => {
        this.setState(workspace);
      })
      .catch(error => {
        console.log(error);
      });
  }

  // Warning: Can't perform a React state update on an unmounted component.
  // This is a no-op, but it indicates a memory leak in your application.
  // To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    let workspace;
    if (this.state.workspace !== []) {
      workspace = this.state.workspace;
    }

    const WorkspaceId = this.state.workspaceId;

    return (
      <div className="dashboard">
        <NavBar
          user={this.props.user}
          {...this.props}
          updateUserInformation={this.props.updateUserInformation}
          idWorkspace={WorkspaceId}
          user={this.props.user}
          workspaceOperator={workspace.operator}
          workspace={this.state.workspace}
        />

        <div className="dashboard__content mt-2">
          <Tasks
            idWorkspace={WorkspaceId}
            user={this.props.user}
            workspaceOperator={workspace.operator}
          />

          <h1>TASKS PARA APROVAR:</h1>
          <ApproveTasks
            idWorkspace={WorkspaceId}
            user={this.props.user}
            workspaceOperator={workspace.operator}
          />

          <FooterWorkspace
            idWorkspace={WorkspaceId}
            workspace={workspace}
            user={this.props.user}
            workspaceOperator={workspace.operator}
          />
        </div>
      </div>
    );
  }

}
