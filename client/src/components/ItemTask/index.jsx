import React, { Component } from 'react';
import {Accordion, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/*IMPORTANTO TRASH ICON*/
import { FaTrashAlt } from 'react-icons/fa';

/*Service para deletar*/
import { remove as DeleteTask } from '../../services/task';

import './style.scss';

export default class ItemTask extends Component {
  constructor(props){
    super(props);
    this.state={
      active: false,
    };

    this.toogleWorkspace = this.toogleWorkspace.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
  };

  toogleWorkspace() {
    this.setState(previousState => ({
      active: !previousState.active
    }));
  };

  handleDeleteTask(){
    const id = this.props.taskId;
    setTimeout(() => {
      DeleteTask(id)
      .then()
      .catch( error => {
        console.log(error);
      });
    }, 3000);
  };


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
            
            { operator &&
              <Link  to={`/edit/task/${taskId}`} >Edit Task</Link>
            }

            { operator && 
              <button onClick={this.handleDeleteTask}>
                <FaTrashAlt />
              </button>
            }
            

          </Card.Body>
        </Accordion.Collapse>
      </Card>
    )
  }
}
