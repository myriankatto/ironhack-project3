import React, { Component, Fragment } from 'react';

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
      frequencyTrue: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.changePersonal = this.changePersonal.bind(this);
    this.changeUrgency = this.changeUrgency.bind(this);
    this.resetTotal = this.resetTotal.bind(this);
    this.changeFrequency = this.changeFrequency.bind(this);
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

  changeUrgency() {
    this.setState(previousState => ({
      urgency: !previousState.urgency
    }));
  }

  changeFrequency() {
    this.setState(previousState => ({
      frequencyTrue: !previousState.frequencyTrue
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
    const approved = this.props.user._id === this.props.workspaceOperator;

    const id = this.props.idWorkspace;

    //if (!name || !level || !urgency || !category || !personal) return;

    create({ id, name, level, urgency, personal, category, frequency, description, approved })
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
      frequencyTrue: false
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
              onChange={this.changeFrequency}
            />

            <label
              style={{ background: this.state.frequencyTrue && '#06D6A0' }}
              className="react-switch-label"
              htmlFor={`react-switch-03`}
            >
              <span className={`react-switch-button`} style={{ display: 'block' }} />
            </label>
          </div>
          {this.state.frequencyTrue && (
            <Fragment>
              <div className="addTask_form__item">
                <label>Set Frequency:</label>
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
              </div>
            </Fragment>
          )}

          {/* Level */}
          <div className="addTask_form__item">
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
            <label>Urgency: </label>
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
            <label>Category: </label>
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
              placeholder="Task description..."
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
