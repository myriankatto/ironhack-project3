import React, { Component } from 'react';
import './style.scss';
import NavBar from '../../components/NavBar';

import { single as singleWorkspace } from '../../services/workspace';
import { single as CreatorTask } from '../../services/score';

/*COMPONENTES*/
import FooterWorkspace from '../../components/FooterWorkspace';
import Tasks from '../../components/Task';
import TaskDone from '../../components/TaskDone';

import ApproveTasks from '../../components/ApproveTasks';

import {
  listDone as listDoneTasks,
  list as listTasks,
  pending as listPendingTasks
} from '../../services/task';

export default class WorkspaceCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workspace: [],
      workspaceId: this.props.match.params.id,
      scoreUser: 0,
      tasks: [],
      tasksDone: [],
      tasksPending: []
    };
    this.triggerTasksUpdate = this.triggerTasksUpdate.bind(this);
  }

  async componentDidMount() {
    await this.fetchData();
    await this.fetchListData();
    this.props.updateWorkspaceIdInformation(this.props.match.params.id); //this function will send the workspace id info to connect the droppdown menu and the edit/list/share views
  }

  async fetchData() {
    if (this.state.workspaceId !== this.props.match.params.id) {
      this.setState({ workspaceId: this.props.match.params.id });
    }

    const workspace = await singleWorkspace(this.state.workspaceId);
    this.setState(workspace);

    const user = await CreatorTask(this.props.user._id);
    const scoreObjUser = user.scoreUser.find(
      element => element.workspace === this.state.workspaceId
    );

    if (scoreObjUser !== undefined) {
      const scoreUser = scoreObjUser.score;
      this.setState({ scoreUser });
    }
  }

  async fetchListData() {
    const id = this.props.match.params.id;
    const tasks = await listTasks(id);
    const tasksDone = await listDoneTasks(id);
    const tasksPending = await listPendingTasks(id);
    this.setState({
      tasks,
      tasksDone,
      tasksPending
    });
  }

  triggerTasksUpdate() {
    this.fetchListData();
  }

  render() {
    let workspace = this.state.workspace;

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

        <div className="dashboard__content">
          <h1>TASKS TO DO</h1>
          <Tasks
            idWorkspace={WorkspaceId}
            user={this.props.user}
            workspaceOperator={workspace.operator}
            done={false}
            tasks={this.state.tasks}
            triggerTasksUpdate={this.triggerTasksUpdate}
          />
          <hr />

          <h1>TASKS ALREADY DONE</h1>
          <TaskDone
            idWorkspace={WorkspaceId}
            user={this.props.user}
            workspaceOperator={workspace.operator}
            done={true}
            tasks={this.state.tasksDone}
            triggerTasksUpdate={this.triggerTasksUpdate}
          />
          <hr />
          <h1>TASKS TO APROVE</h1>
          <ApproveTasks
            idWorkspace={WorkspaceId}
            user={this.props.user}
            workspaceOperator={workspace.operator}
            tasks={this.state.tasksPending}
            triggerTasksUpdate={this.triggerTasksUpdate}
          />

          <FooterWorkspace
            idWorkspace={WorkspaceId}
            workspace={this.state.workspace}
            user={this.props.user}
            score={this.state.scoreUser}
            workspaceOperator={workspace.operator}
          />
        </div>
      </div>
    );
  }
}
