import React, { Component, Fragment } from 'react';
import { edit, single } from './../../services/task';
import { Form, Button } from 'react-bootstrap';
import './style.scss';
import { Link } from 'react-router-dom';

export default class EditTaskOperator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      level: 'easy',
      urgency: false,
      category: 'Kitchen',
      personal: false,
      frequency: '',
      description: '',
      workspace: '',
      howlong: '',
      repetition: '',
      forever: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.changePersonal = this.changePersonal.bind(this);
    this.changeUrgency = this.changeUrgency.bind(this);
    this.resetTotal = this.resetTotal.bind(this);
    this.handleRepeatChange = this.handleRepeatChange.bind(this);
    this.changeRepetition = this.changeRepetition.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const id = this.props.match.params.idTask;

    single(id)
      .then(beforeTask => {
        this.setState({
          name: beforeTask.name,
          level: beforeTask.level,
          urgency: beforeTask.urgency,
          category: beforeTask.category,
          personal: beforeTask.personal,
          frequency: beforeTask.frequency,
          description: beforeTask.description,
          workspace: beforeTask.workspace,
          howlong: beforeTask.beforeTask,
          repetition: beforeTask.repetition
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });

    console.log(this.state);
  }

  handleRepeatChange() {
    this.setState(previousState => ({
      forever: !previousState.forever,
      howlong: 10000
    }));
  }

  changePersonal() {
    this.setState(previousState => ({
      personal: !previousState.personal
    }));
  }

  changeRepetition() {
    this.setState(previousState => ({
      repetition: !previousState.repetition
    }));
  }

  changeUrgency() {
    this.setState(previousState => ({
      urgency: !previousState.urgency
    }));
  }

  async handleFormSubmission(event) {
    event.preventDefault();
    const id = this.props.match.params.idTask;

    const name = this.state.name;
    const level = this.state.level;
    const urgency = this.state.urgency;
    const personal = this.state.personal;
    const category = this.state.category;
    const frequency = Number(this.state.frequency);
    const description = this.state.description;
    const howlong = this.state.howlong;
    const repetition = this.state.repetition;

    edit({
      id,
      name,
      level,
      urgency,
      personal,
      category,
      frequency,
      description,
      howlong,
      repetition
    })
      .then()
      .catch(error => {
        console.log(error);
      });

    single(id)
      .then(beforeTask => {
        this.setState({
          name: beforeTask.name,
          level: beforeTask.level,
          urgency: beforeTask.urgency,
          category: beforeTask.category,
          personal: beforeTask.personal,
          frequency: beforeTask.frequency,
          description: beforeTask.description,
          workspace: beforeTask.workspace,
          howlong: beforeTask.howlong,
          repetition: beforeTask.repetition
        });
      })
      .catch(error => {
        console.log(error);
      });

    this.props.history.push(`/dashboard/${this.state.workspace}`);
  }

  resetTotal() {
    const id = this.props.match.params.idTask;

    single(id)
      .then(beforeTask => {
        this.setState({
          name: beforeTask.name,
          level: beforeTask.level,
          urgency: beforeTask.urgency,
          category: beforeTask.category,
          personal: beforeTask.personal,
          frequency: beforeTask.frequency,
          description: beforeTask.description,
          workspace: beforeTask.workspace,
          howlong: beforeTask.howlong,
          repetition: beforeTask.repetition
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="edit_task">
         <Link to="/dashboard">
          <img className="exit-icon" src="./../../images/close.svg" alt="close icon" />
        </Link>
        <h2>Edit your task</h2>
        <div className="editTask__form">
          <form onSubmit={this.handleFormSubmission}>
            {/*Task's name */}
            <div className="editTask_form__item">
              <label>Name:</label>
              <input
                className="input"
                type="text"
                id="fname"
                name="name"
                value={this.state.name}
                onChange={this.handleInputChange}
                placeholder="Your task name"
                autoComplete="off"
              ></input>
            </div>
            {/* Frequency */}
            <div className="editTask_form__item">
              <label>Frequent task?</label>
              <input
                className="react-switch-checkbox "
                id={`react-switch-02`}
                type="checkbox"
                onChange={this.changeRepetition}
      
              />
              <label
                style={{ background: this.state.repetition && '#06D6A0' }}
                className="react-switch-label"
                htmlFor={`react-switch-02`}
              >
                <span className={`react-switch-button`} />
              </label>
            </div>
            {this.state.repetition && (
              <div className="editTask_form__frequency">
                <Fragment>
                  <label>Frequency</label>
                  <input
                    className="input_frequency"
                    type="number"
                    name="frequency"
                    min="1"
                    max="20"
                    value={this.state.frequency}
                    onChange={this.handleInputChange}
                    placeholder="Set frequency"
                    autoComplete="off"
                  ></input>

                  {/* until when */}
                  <label>Repeat</label>
                  {!this.state.forever ? (
                    <input
                      className="input_frequency"
                      type="number"
                      name="howlong"
                      min="1"
                      value={this.state.howlong}
                      onChange={this.handleInputChange}
                      placeholder="How many times?"
                      autoComplete="off"
                    ></input>
                  ) : (
                    ''
                  )}

                  <Form.Group controlId="formBasicCheckbox" onClick={this.handleRepeatChange}>
                    <Form.Check
                      type="checkbox"
                      label="Forever"
                      onClick={this.handleRepeatChange}
                    />
                  </Form.Group>
                </Fragment>
              </div>
            )}

            {/* Level */}
            <div className="editTask_form__item">
              <label>Level:</label>
              <select
                as="select"
                name="level"
                value={this.state.level}
                onChange={this.handleInputChange}
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
            {/* Pessoal ou Geral*/}
            <div className="editTask_form__item">
              <label>Personal:</label>
              <input
                className="react-switch-checkbox"
                id={`react-switch-02`}
                type="checkbox"
                onChange={this.changePersonal}
              />
              <label
                style={{ background: this.state.personal && '#06D6A0' }}
                className="react-switch-label"
                htmlFor={`react-switch-02`}
              >
                <span className={`react-switch-button`} />
              </label>
            </div>
            {/* Checkbox para Urgência*/}
            <div className="editTask_form__item">
              <label>Urgency:</label>
              <input
                className="react-switch-checkbox"
                id={`react-switch-01`}
                type="checkbox"
                onChange={this.changeUrgency}
              />
              <label
                style={{ background: this.state.urgency && '#06D6A0' }}
                className="react-switch-label"
                htmlFor={`react-switch-01`}
              >
                <span className={`react-switch-button`} />
              </label>
            </div>
            {/*Category*/}
            <div className="editTask_form__item">
              <label>Category:</label>
              <select
                as="select"
                name="category"
                value={this.state.category}
                onChange={this.handleInputChange}
              >
                <option>Kitchen</option>
                <option>Laundry</option>
                <option>Clean up</option>
              </select>
            </div>
            {/*Description*/}
            <div className="editTask_form__item">
              <textarea
                id="w3mission"
                rows="4"
                cols="50"
                type="text"
                name="description"
                value={this.state.description}
                onChange={this.handleInputChange}
                placeholder="Your description"
                autoComplete="off"
              ></textarea>
            </div>
            <button type="reset" onClick={this.resetTotal}>
              Reset form
            </button>
            <input className="input-btn" type="submit" value="Edit Task"></input>
          </form>
        </div>
      </div>
    );
  }
}
