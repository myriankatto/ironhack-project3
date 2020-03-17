import React, { Component } from 'react';
import {Accordion, Card, Button } from 'react-bootstrap';


import { list as listTasks }  from './../../services/task';
import './style.scss';

import ItemTask from '../ItemTask';

/*COMPONENTE QUE LISTA AS TASKS*/
class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks:[],
      id: this.props.idWorkspace
    };

    
  };

  componentDidMount() {

    this.fetchData();
  }

  fetchData(){
    const id = this.state.id;
    listTasks(id)
      .then( tasks => {
        this.setState({
          tasks
        });
      })
      .catch( error => {
        console.log(error);
      });
  }

 
  

  render() {
   
    return (
      <div>
        <Accordion className="dashboard__task__list" defaultActiveKey="0">
          {
            this.state.tasks.map(task => (
              <ItemTask  
              key={task._id} 
              name={task.name}
              description={task.description} 
              toggle={task._id}
              level={task.level}
              frequency={task.frequency}
              />
            ))
          }
        </Accordion>
      </div>
      
    );
  }
}

export default Tasks;