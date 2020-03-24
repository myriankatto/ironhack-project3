import React, { Component } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';

import './style.scss';

import ItemTask from '../ItemTask';

export default class ApproveTasks extends Component {
  render() {
    return (
      <div>
        <Accordion className="dashboard__task__list" defaultActiveKey="0">
          {this.props.tasks.map(task => (
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
              triggerTasksUpdate={this.props.triggerTasksUpdate}
            />
          ))}
        </Accordion>
      </div>
    );
  }
}
