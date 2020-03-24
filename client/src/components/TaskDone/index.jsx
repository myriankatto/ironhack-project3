import React, { Component } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './style.scss';

import ItemTask from '../ItemTask';

/*COMPONENTE QUE LISTA AS TASKS*/
class Tasks extends Component {
  render() {
    //const widthTasks = this.state.tasks.length !== 0;
    return (
      <div>
        <Accordion
          className="dashboard__task__list__done"
          defaultActiveKey="0"
          aria-disabled="true"
        >
          {this.props.tasks.map(task => (
            <ItemTask
              key={task._id}
              name={task.name}
              urgency={task.urgency}
              personal={task.personal}
              category={task.category}
              description={task.description}
              toggle={task._id}
              level={task.level}
              frequency={task.frequency}
              taskId={task._id}
              user={this.props.user}
              owner={task.owner}
              workspaceOperator={this.props.workspaceOperator}
              approved={task.approved}
              done={this.props.done}
              triggerTasksUpdate={this.props.triggerTasksUpdate}

            />
          ))}
        </Accordion>
      </div>
    );
  }
}

export default Tasks;
