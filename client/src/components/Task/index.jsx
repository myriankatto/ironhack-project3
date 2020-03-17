import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

import { list as listTasks }  from './../../services/task';
import './style.scss';


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
        {
          this.state.tasks.map(task => (
            <div>{task.name}</div>
          ))
        }
      </div>
      
    );
  }
}

export default Tasks;