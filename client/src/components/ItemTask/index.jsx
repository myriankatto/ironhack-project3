import React, { Component } from 'react';
import {Accordion, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/*IMPORTANTO TRASH ICON*/
import { FaTrashAlt, FaRegCheckSquare } from 'react-icons/fa';

/*Service para deletar*/
import { remove as DeleteTask } from '../../services/task';
import { single as SingleTask } from '../../services/task';
import { single as SingleUser } from '../../services/score';



/*IMPORTAR FUNÇOES*/
import {handleDoTheTask} from './handleDoTheTask';
import {handleApproveTask} from './handleApproveTask';
import {handleTaskComplete} from './handleTaskComplete';

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
      ownerTaskPic:''
      
    };

    
    this.toogleWorkspace = this.toogleWorkspace.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleApproveTask = this.handleApproveTask.bind(this);
    this.handleOwnerTask=this.handleOwnerTask.bind(this);
    this.handleTaskComplete= this.handleTaskComplete.bind(this);
  };

  async componentDidMount(){
    const id = this.props.taskId;
    const singleTask = await SingleTask(id);
    

    if(singleTask.owner !== null){
      const singleUser = await SingleUser(singleTask.owner._id);
      
      this.setState({
        ownerTaskPic: singleUser.picture
      });
    } 
  
  }

 handleTaskComplete(){
    const id = this.props.taskId;
    const user = this.props.user;

    handleTaskComplete({id, user});
  }

  toogleWorkspace() {
    this.setState(previousState => ({
      active: !previousState.active
    }));
  };

  async handleOwnerTask(){
    const id = this.props.taskId;
    const user = this.props.user;

    await this.setState( previousState => ({ 
      handleToDoTask: !previousState.handleToDoTask
    }));

    
    const handleToDoTask = this.state.handleToDoTask;

    await handleDoTheTask({id, user, handleToDoTask});

    const singleTask = await SingleTask(id);
    console.log('singleTask',singleTask);
    const singleUser = await SingleUser(singleTask.owner._id);

    console.log('singleUser',singleUser);

    this.setState({
      ownerTaskPic: singleUser.picture
    });
    
    
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
    
    /*Verifica se a task não tem owner ou o owner é o usuário logado:*/
    //const doTheTask = this.props.owner === null || operator

    /*Verificar se a tarefa já tem owner*/
    const ownerIsTruth = this.props.owner !== null && this.props.owner !== undefined ;
    
    /*Verificar se o usuário logado é o owner da tarefa*/
    let  userIsOwner;
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
              <img className="arrow-icon" src="./../images/up.svg" alt="up" /> :
              <img className="arrow-icon" src="./../images/down.svg" alt="down" /> }
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
                  <button  onClick={this.handleDeleteTask}>
                    <FaTrashAlt />
                  </button>
                }
              </div>

              <div className="col">
                { !this.props.approved && operator &&
                  <button  onClick={this.handleApproveTask}>
                    <FaRegCheckSquare />
                  </button>
                }
              </div>
            </div>
            
            <div className="row">
            
              {this.props.approved &&
                <div className="col">
                
                  {
                    ownerIsTruth ?
                    //FOTO DO OWNER DA TASK
                    <figure>
                      <img className="Task-owner" 
                      src={this.state.ownerTaskPic}  alt={this.state.ownerTaskPic}/>
                    </figure> :

                    <button  onClick={this.handleOwnerTask}>
                      I am responsible for this task
                    </button>
                  }
                </div>
              } 

                <div className="col">
                  {
                    userIsOwner ?
                    <button  onClick={this.handleOwnerTask}>
                      Give up the task
                    </button> : ''
                  }  
                </div>

            </div>

            <div className="row">
                <div className="col">
                {(this.props.owner === null || userIsOwner) &&
                  <button type="button" onClick={this.handleTaskComplete}>Task Done</button>
                }
                </div>
            </div>

          </Card.Body>
        </Accordion.Collapse>
      </Card>
    )
  }
}
