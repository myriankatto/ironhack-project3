import React, { Component, Fragment } from 'react';
import { Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

import { create, single } from './../../services/task';
import './style.scss';

class AddTask extends Component {
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
      repetition: false,
      forever: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.changePersonal = this.changePersonal.bind(this);
    this.changeUrgency = this.changeUrgency.bind(this);
    this.resetTotal = this.resetTotal.bind(this);
    this.changeRepetition = this.changeRepetition.bind(this);
    this.handleRepeatChange = this.handleRepeatChange.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  changePersonal() {
    this.setState(previousState => ({
      personal: !previousState.personal
    }));
  }

  handleRepeatChange() {
    this.setState(previousState => ({
      forever: !previousState.forever,
      howlong: 10000
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

  handleFormSubmission(event) {
    event.preventDefault();

    const name = this.state.name;
    const level = this.state.level;
    const urgency = this.state.urgency;
    const personal = this.state.personal;
    const category = this.state.category;
    const frequency = Number(this.state.frequency);
    const description = this.state.description;
    const howlong = this.state.howlong;
    const repetition = this.state.repetition;
    const approved = this.props.user._id === this.props.workspaceOperator;

    const id = this.props.idWorkspace;

    //if (!name || !level || !urgency || !category || !personal) return;

    create({
      id,
      name,
      level,
      urgency,
      personal,
      category,
      frequency,
      description,
      approved,
      howlong,
      repetition
    })
      .then()
      .catch(error => {
        console.log(error);
      });

    this.setState({
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
    });
  }

  resetTotal() {
    this.setState({
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
    });
  }

  resetTotal() {
    this.setState({
      name: '',
      level: 'easy',
      urgency: false,
      category: 'Kitchen',
      personal: false,
      frequency: '',
      description: '',
      workspace: '',
      frequencyTrue: false
    });
  }

  render() {
    return (
    
      <div className="addTask__form">
        <form onSubmit={this.handleFormSubmission}>
          {/*Task's name */}
          <div className="addTask_form__item">
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
              required
            ></input>
          </div>
          {/* Frequency */}
          <div className="addTask_form__item">
            <label>Frequent task?</label>
            <input
              className="react-switch-checkbox"
              id={`react-switch-03`}
              type="checkbox"
              onChange={this.changeRepetition}
              required
            />
            <label
              style={{ background: this.state.repetition && '#06D6A0' }}
              className="react-switch-label"
              htmlFor={`react-switch-03`}
            >
              <span className={`react-switch-button`} />
            </label>
          </div>
          {this.state.repetition && (
            <div className="addTask_form__frequency">
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
                  placeholder="Days"
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
                  <Form.Check type="checkbox" label="Forever" onClick={this.handleRepeatChange} />
                </Form.Group>
              </Fragment>
            </div>
          )}

          {/* Level */}
          <div className="addTask_form__item">
            <label>Level:</label>
            <select
              as="select"
              name="level"
              value={this.state.level}
              onChange={this.handleInputChange}
              required
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>
          {/* Pessoal ou Geral*/}
          <div className="addTask_form__item">
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
          <div className="addTask_form__item">
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
          <div className="addTask_form__item">
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
          <div className="addTask_form__item">
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
          <input className="input-btn" type="submit" value="Submit"></input>

          <button type="reset" onClick={this.resetTotal}>
            Reset form
          </button>
        </form>
      </div>
    );
  }
}

export default AddTask;
