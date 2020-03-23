import React, { Component, Fragment } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/*IMPORTANTO TRASH ICON*/
import { FaTrashAlt, FaRegCheckSquare } from 'react-icons/fa';

/*Service para deletar*/
import { remove as DeleteTask } from '../../services/task';
import { single as SingleTask } from '../../services/task';
import { single as SingleUser } from '../../services/score';

/*IMPORTAR FUNÇOES*/
import { handleDoTheTask } from './handleDoTheTask';
import { handleApproveTask } from './handleApproveTask';
import { handleTaskComplete } from './handleTaskComplete';
import { handleRepetition } from './handleRepetition';

import './style.scss';

export default class ItemTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      name: '',
      level: '',
      urgency: '',
      category: '',
      personal: '',
      frequency: '',
      description: '',
      workspace: '',
      approved: '',
      handleToDoTask: false,
      ownerTaskPic: ''
    };

    this.toogleWorkspace = this.toogleWorkspace.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleApproveTask = this.handleApproveTask.bind(this);
    this.handleOwnerTask = this.handleOwnerTask.bind(this);
    this.handleTaskComplete = this.handleTaskComplete.bind(this);
  }

  async componentDidMount() {
    const id = this.props.taskId;

    const singleTask = await SingleTask(id);
    await handleRepetition({ singleTask });

    if (singleTask.owner !== null) {
      const singleUser = await SingleUser(singleTask.owner._id);

      this.setState({
        ownerTaskPic: singleUser.picture
      });
    }
  }

  handleTaskComplete() {
    const id = this.props.taskId;
    const user = this.props.user;

    handleTaskComplete({ id, user });
  }

  toogleWorkspace() {
    this.setState(previousState => ({
      active: !previousState.active
    }));
  }

  async handleOwnerTask() {
    const id = this.props.taskId;
    const user = this.props.user;

    await this.setState(previousState => ({
      handleToDoTask: !previousState.handleToDoTask
    }));

    const handleToDoTask = this.state.handleToDoTask;

    await handleDoTheTask({ id, user, handleToDoTask });

    const singleTask = await SingleTask(id);

    const singleUser = await SingleUser(singleTask.owner._id);

    this.setState({
      ownerTaskPic: singleUser.picture
    });
  }

  handleDeleteTask() {
    const id = this.props.taskId;

    DeleteTask(id)
      .then()
      .catch(error => {
        console.log(error);
      });
  }

  handleApproveTask() {
    const id = this.props.taskId;

    handleApproveTask({ id });
  }

  render() {
    const taskId = this.props.taskId;
    /*VERIFICAÇÃO SE O USER É O OPERADOR*/
    const operator = this.props.user._id === this.props.workspaceOperator;

    /*Verifica se a task não tem owner ou o owner é o usuário logado:*/
    //const doTheTask = this.props.owner === null || operator

    /*Verificar se a tarefa já tem owner*/
    const ownerIsTruth = this.props.owner !== null && this.props.owner !== undefined;

    /*Verificar se o usuário logado é o owner da tarefa*/
    let userIsOwner;
    if (this.props.owner === null || this.props.owner === undefined) {
      userIsOwner = false;
    } else {
      userIsOwner = this.props.owner._id === this.props.user._id;
    }

    return (
      // <Card
      //   className="p-2 cardTask border border-secondary rounded-lg "
      <div className="card__task" onClick={this.toogleWorkspace}>
        <Accordion.Toggle
          as={Button}
          variant="link"
          className="d-flex justify-content-between"
          eventKey={this.props.toggle}
        >
          <h1>{this.props.name}</h1>

          {this.state.active ? (
            <img className="arrow-icon" src="./../images/up.svg" alt="up" />
          ) : (
            <img className="arrow-icon" src="./../images/down.svg" alt="down" />
          )}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={this.props.toggle}>
          <Card.Body style={{ color: '#3f3d56' }}>
            <h6 className="cardTask__paragraph">{this.props.description}</h6>
            <hr />
            <h6>Task Info</h6>

            <div className="task_row">
              {this.props.urgency && (
                <div className="col  task_item_1">
                  <h6>Urgent Task</h6>
                </div>
              )}

              {this.props.personal && (
                <div className="col  task_item_1">
                  <h6>Personal Task</h6>
                </div>
              )}
            </div>
            <div className="row">
              <div className="col task_item">
                <h5>Category </h5>
                <span>{this.props.category}</span>
              </div>

              <div className="col  task_item">
                <h5>Frequency </h5>
                <span>{this.props.frequency}</span>
              </div>

              <div className="col task_item">
                <div>
                  <h5>Level</h5>
                  <span
                  // className="cardTask_level"
                  // style={{
                  //   color: '#6c63ff',
                  //   fontSize: '25px',
                  //   fontWeight: '300',
                  //   textTransform: 'uppercase'
                  // }}
                  >
                    {this.props.level}
                  </span>
                </div>
              </div>
            </div>

            {/* BOTÕES DE CONTROLE De QUALQUER USUÁRIO */}
            {!this.props.done /*CASO A TASK JÁ FOI FEITO NÃO VAI APARECER OS CONTROLES*/ && (

              <div className="user_task">
              <hr />
              <h6>Manage Task</h6>

                <div className="row">
                  {' '}
                  {/*ROW 2*/}
                  {this.props.approved && (
                    <div className="col">
                      {ownerIsTruth ? (
                        //FOTO DO OWNER DA TASK
                        <figure>
                          <img
                            className="Task-owner"
                            src={this.state.ownerTaskPic}
                            alt={this.state.ownerTaskPic}
                          />
                        </figure>
                      ) : (
                        <button className="btn-task" onClick={this.handleOwnerTask}>
                          I am responsible for this task
                        </button>
                      )}
                    </div>
                  )}
                  {userIsOwner ? (
                    <Fragment>
                      <div className="col">
                        <button className="btn-task" onClick={this.handleOwnerTask}>
                          Give up the task
                        </button>{' '}
                      </div>
                    </Fragment>
                  ) : (
                    ''
                  )}
                </div>
                {/* FINAL DA ROW 2*/}

                <div className="row">
                  {/*  ROW 3 */}
                  <div className="col">
                    {(this.props.owner === null || userIsOwner) && (
                      <button className="btn-task" onClick={this.handleTaskComplete}>Task Done</button>
                    )}
                  </div>
                </div>
                {/* FINAL DA ROW 3*/}
                {/* BOTÕES DE CONTROLE DO OPERADOR */}
                <div className="row manage__task">
                <hr />
                  <div className="col">
                    {operator && (
                      <Link to={`/edit/task/${taskId}`}>
                        {' '}
                        <img src="./../images/edit.svg" alt="edit" />
                      </Link>
                    )}
                  </div>

                  <div className="col">
                    {operator && (
                      <button onClick={this.handleDeleteTask}>
                        <img src="./../images/remove.svg" alt="remove" />
                      </button>
                    )}
                  </div>

                  {!this.props.approved && operator && (
                    <Fragment>
                      <div className="col">
                        <button onClick={this.handleApproveTask}>
                          <img src="./../images/approve.svg" alt="approve" />
                        </button>
                      </div>
                    </Fragment>
                  )}
                </div>
              </div>
            )}
          </Card.Body>
        </Accordion.Collapse>
      </div>
    );
  }
}
