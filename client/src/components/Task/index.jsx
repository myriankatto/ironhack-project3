import React, { Component } from 'react';
import {Accordion, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';



import { list as listTasks }  from './../../services/task';
import './style.scss';

import ItemTask from '../ItemTask';

/*COMPONENTE QUE LISTA AS TASKS*/
class Tasks extends Component {
  _isMounted = false;  //Solucao para erro: Can't perform a React state update on an unmounted component

  constructor(props) {
    super(props);
    this.state = {
      tasks:[],
      id: this.props.idWorkspace
    };

    
    
  };

  async componentDidMount() {
    //Solucao para erro: Can't perform a React state update on an unmounted component:
    this._isMounted = true;
    const id = this.props.idWorkspace;
    const tasks = await listTasks(id);
    
    this.fetchData(tasks);
    console.log('this.state.tasks 1 ',this.state.tasks);
 
  };

  async componentDidUpdate(prevProps, prevState, snapshot){
        console.log('PREV STATE',prevState.tasks);
        const id = this.props.idWorkspace;
        const tasks = await listTasks(id);

    if(prevState.tasks !== tasks){
    //    console.log('é diferente');
    //    this.fetchData(this.tasks);
    };

     
   }

  

  // Warning: Can't perform a React state update on an unmounted component. 
  // This is a no-op, but it indicates a memory leak in your application. 
  // To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method
  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchData(tasks){
    
    this.setState({
      tasks
    });

    console.log('this.state.tasks 3 ',this.state.tasks);
       
  }

 
  

  render() {
    //const widthTasks = this.state.tasks.length !== 0;
    return (
      <div>
      
        <Accordion className="dashboard__task__list" defaultActiveKey="0">
          {  
            this.state.tasks.map(task => (
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
              />
            )) 
          }
        </Accordion> 
      </div>
      
    );
  }
}

export default Tasks;