import React, { Component } from 'react';

import NavBar from '../../components/NavBar';

import { single as singleWorkspace } from '../../services/workspace';
import { single as CreatorTask } from '../../services/score';

/*COMPONENTES*/
import FooterWorkspace from '../../components/FooterWorkspace';
import Tasks from '../../components/Task';
import TaskDone from '../../components/TaskDone';

import ApproveTasks from '../../components/ApproveTasks';

export default class WorkspaceCreate extends Component {
  //Solucao para erro: Can't perform a React state update on an unmounted component:
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      workspace: [],
      workspaceId: this.props.match.params.id,
      scoreUser: 0
    };
    //this.toggleSelected = this.toggleSelected(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchData();
    this.props.updateWorkspaceIdInformation(this.props.match.params.id); //this function will send the workspace id info to connect the droppdown menu and the edit/list/share views
  }

  componentDidUpdate() {}

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

    CreatorTask(this.props.user._id)
      .then(user => {
        const scoreObjUser = user.scoreUser.find(
          element => element.workspace === this.state.workspaceId
        );

        if (scoreObjUser !== undefined) {
          const scoreUser = scoreObjUser.score;
          this.setState({ scoreUser });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  // //FUNÇÃO PARA SET STATE DO WORKSPACE SINGLE
  // toggleSelected(workspaceId) {
  //   singleWorkspace(workspaceId)
  //     .then(workspace => {
  //       this.setState(workspace);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

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
          // toggleSelected={this.toggleSelected}
        />

        <div className="dashboard__content mt-2">
          <Tasks
            idWorkspace={WorkspaceId}
            user={this.props.user}
            workspaceOperator={workspace.operator}
            done={false}
          />

          <h1>TASKS FEITAS</h1>
          <TaskDone 
            idWorkspace={WorkspaceId}
            user={this.props.user}
            workspaceOperator={workspace.operator}
            done={true}
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
            score={this.state.scoreUser}
            workspaceOperator={workspace.operator}
          />
        </div>
      </div>
    );
  }
}
