import React, { Component } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';

import { pending as PendingTasks } from '../../services/task';

import ItemTask from '../ItemTask';

export default class ApproveTasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasksPending: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate() {
    // this.fetchData();
  }

  fetchData() {
    const id = this.props.idWorkspace;
    // console.log('hello: ', id);
    PendingTasks(id)
      .then(tasksPending => {
        if (tasksPending != this.state.tasksPending) {
          this.setState({
            tasksPending
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <Accordion defaultActiveKey="0">
          {this.state.tasksPending.map(task => (
            <ItemTask
              key={task._id}
              name={task.name}
              description={task.description}
              toggle={task._id}
              level={task.level}
              frequency={task.frequency}
              taskId={task._id}
              user={this.props.user}
              workspaceOperator={this.props.workspaceOperator}
              approved={task.approved}
              // updateTotalTasks={this.fetchData}
            />
          ))}
        </Accordion>
      </div>
    );
  }
}
