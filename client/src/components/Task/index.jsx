import React, { Component } from 'react';
import {Accordion, Card, Button } from 'react-bootstrap';


import { list as listTasks }  from './../../services/task';
import './style.scss';

import ItemTask from '../ItemTask';

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
      <Accordion defaultActiveKey="0">
        {
          this.state.tasks.map(task => (
            <ItemTask  key={task._id} name={task.name} toggle={task._id}/>
          ))
        }
      </Accordion>
    );
  }
}

export default Tasks;