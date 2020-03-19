import React, { Component } from 'react';
import {Accordion, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/*IMPORTANTO TRASH ICON*/
import { FaTrashAlt, FaRegCheckSquare } from 'react-icons/fa';

/*Service para deletar*/
import { remove as DeleteTask } from '../../services/task';


/*IMPORTAR FUNÇOES*/
import {handleDoTheTask} from './handleDoTheTask';
import {handleApproveTask} from './handleApproveTask';

import './style.scss';

export default class ItemTask extends Component {
  constructor(props){
    super(props);
    this.state={
      active: false,
      name: '',
      level: '', 
      urgency:'',
      category:'',
      personal:'',
      frequency: '',
      description: '',
      workspace:'',
      approved:'',
      handleToDoTask: false,
    };

    this.toogleWorkspace = this.toogleWorkspace.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleApproveTask = this.handleApproveTask.bind(this);
    this.handleOwnerTask=this.handleOwnerTask.bind(this);
  };

  toogleWorkspace() {
    this.setState(previousState => ({
      active: !previousState.active
    }));
  };

  handleOwnerTask(){
    const id = this.props.taskId;
    const user = this.props.user;

    this.setState( previousState => ({ 
      handleToDoTask: !previousState.handleToDoTask
    }));
    
    const handleToDoTask = this.state.handleToDoTask;

    handleDoTheTask({id, user, handleToDoTask});
  }

  handleDeleteTask(){
    const id = this.props.taskId;
   
    DeleteTask(id)
      .then()
      .catch( error => {
        console.log(error);
      });
  };

  handleApproveTask(){
    const id = this.props.taskId;
    handleApproveTask({id});
  }

 
  render() {

    const taskId = this.props.taskId;
    /*VERIFICAÇÃO SE O USER É O OPERADOR*/
    const operator = this.props.user._id === this.props.workspaceOperator;

    /*Verificar se a tarefa já tem owner*/
    const ownerIsTruth = this.props.owner !== null && this.props.owner !== undefined ;
    console.log('ownerIsTruth',ownerIsTruth);
    console.log('this.props.owner',this.props.owner);
    /*Verificar se o usuário logado é o owner da tarefa*/
    let  userIsOwner;
    console.log('this.props.owner',this.props.owner)
    if(this.props.owner === null || this.props.owner === undefined ){
      userIsOwner = false;
    }else{
      userIsOwner = this.props.owner._id === this.props.user._id;
    };
    
   
    return (
      <Card
      className="p-2 cardTask border border-secondary rounded-lg shadow" 
      onClick={this.toogleWorkspace}>
        <Accordion.Toggle 
          as={Button} 
          variant="link" 
          className="d-flex justify-content-between"
          eventKey={this.props.toggle}>

            <h1>{this.props.name}</h1>
            
            {this.state.active ? 
              <img className="arrow-icon" src="./../images/down.svg" alt="down icon" /> :
              <img className="arrow-icon" src="./../images/up.svg" alt="down icon" /> }
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={this.props.toggle}>
          <Card.Body style={{"color":"#3f3d56"}}>
            <span className="cardTask__paragraph" 
            style={{"textDecoration":"none","textTransform":"none" }}>
              {this.props.description}
            </span>
            <hr   />

            <div className="row">
              <div className="col-3">
                <p>Category</p>
                
              </div>

              <div className="col-3">
                <p>Urgency</p>
              </div>

              <div className="col-3">
                <p>Frequency</p>
                <p>{this.props.frequency}</p>
              </div>

              <div className="col-3 cardTask_col d-flex align-items-center justify-content-center">
                <div>
                  <p className="cardTask_title">Level</p>
                  <p className="cardTask_level" 
                  style={{"color":"#6c63ff", 
                  "fontSize":"25px", 
                  "fontWeight":"300",
                  "textTransform": "uppercase"}}>
                    {this.props.level}
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
            
              <div className="col">
                { operator &&
                <Link  to={`/edit/task/${taskId}`} >Edit Task</Link>
                }
              </div>

              <div className="col">
                { operator && 
                  <button onClick={this.handleDeleteTask}>
                    <FaTrashAlt />
                  </button>
                }
              </div>

              <div className="col">
                { this.props.approved && operator &&
                  <button onClick={this.handleApproveTask}>
                    <FaRegCheckSquare />
                  </button>
                }
              </div>
            </div>
            
            <div className="row">
                <div className="col">
                {
                  ownerIsTruth ? 
                  //FOTO DO OWNER DA TASK
                  <figure>
                    <img className="Task-owner" src={this.props.user.picture} alt={this.props.user.name} />
                  </figure>

                  :

                  //Botão  DO OWNER DA TASK
                  <button onClick={this.handleOwnerTask}>
                    Do the task
                  </button>
                }
                  
                </div>

                <div className="col">
                  {
                    userIsOwner ?
                    <button onClick={this.handleOwnerTask}>
                      Give up the task
                    </button> : ''
                  }  
                </div>
              </div>

          </Card.Body>
        </Accordion.Collapse>
      </Card>
    )
  }
}
