import React, { Component } from 'react';
import {Accordion, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/*IMPORTANTO TRASH ICON*/
import { FaTrashAlt, FaRegCheckSquare } from 'react-icons/fa';

/*Service para deletar*/
import { remove as DeleteTask } from '../../services/task';
import { edit } from '../../services/task';
import { single } from '../../services/task';

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
      workspace:''
    };

    this.toogleWorkspace = this.toogleWorkspace.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleApproveTask = this.handleApproveTask.bind(this);
  };

  toogleWorkspace() {
    this.setState(previousState => ({
      active: !previousState.active
    }));
  };

  handleDeleteTask(){
    const id = this.props.taskId;
   
    DeleteTask(id)
      .then()
      .catch( error => {
        console.log(error);
      });
  };

  async handleApproveTask(){
    const id = this.props.taskId;
    console.log(id);

    const beforeTask = await single(id);
    console.log('BEFORE TASK',beforeTask);

    this.setState({ 
       name: beforeTask.name,
       level: beforeTask.level,
       urgency: beforeTask.urgency,
       category: beforeTask.category,
       personal: beforeTask.personal,
       frequency: beforeTask.frequency,
       description: beforeTask.description,
       workspace:beforeTask.workspace
    });

    const name = this.state.name;
    const level = this.state.level;
    const urgency = this.state.urgency;
    const personal = this.state.personal;
    const category = this.state.category;
    const frequency = Number(this.state.frequency);
    const description = this.state.description;
    const approved = true;


    await edit({id,name, level, urgency, personal, category, frequency, description, approved });
   

  }


  // className={ this.state.active ? 
  //   "p-2 cardTask border border-secondary rounded-lg shadow" :
  //   "p-2 cardTask border border-secondary rounded-pill shadow"}
  render() {

    const taskId = this.props.taskId;
    /*VERIFICAÇÃO SE O USER É O OPERADOR*/
    const operator = this.props.user._id === this.props.workspaceOperator;
    
   
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
            

            
            

          </Card.Body>
        </Accordion.Collapse>
      </Card>
    )
  }
}
