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
      workspace: []
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchData();
  }

  fetchData() {
    const id = this.props.match.params.id;

    singleWorkspace(id)
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
    const { workspace } = this.state;
    const WorkspaceId = this.props.match.params.id;

    return (
      <div className="dashboard">
        <NavBar
          user={this.props.user}
          {...this.props}
          updateUserInformation={this.props.updateUserInformation}
        />

        <div className="dashboard__content mt-2">
          <Tasks idWorkspace={WorkspaceId} 
          user={this.props.user} 
          workspaceOperator={workspace.operator}/>

          <h1>TASKS PARA APROVAR:</h1>
          <ApproveTasks idWorkspace={WorkspaceId} />

          <FooterWorkspace 
          idWorkspace={WorkspaceId} 
          workspace={workspace}
          user={this.props.user}
          workspaceOperator={workspace.operator} />
        </div>
      </div>
    );
  }
}
