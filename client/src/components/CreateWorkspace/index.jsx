import React, { Component } from 'react';

import { create } from './../../services/workspace';
import { usersApproved } from './../../services/workspaceUser';

import './style.scss';

class CreateWorkspace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workspaceName: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleFormSubmission(event) {
    event.preventDefault();
    const name = this.state.workspaceName;
    if (!name) return;
    const workspace = {
      name
    };
    create(name)
      .then(newWorkspace => usersApproved(newWorkspace.operator, newWorkspace._id))
      .catch(error => {
        console.log(error);
      });
    this.setState({
      workspaceName: ''
    });
  }
  render() {
    return (
      <form className="form" onSubmit={this.handleFormSubmission}>
        <input
          className="form__input"
          type="text"
          name="workspaceName"
          value={this.state.workspaceName}
          onChange={this.handleInputChange}
          placeholder="Your workspace name"
          autoComplete="off"
        />
        <button className="form__btn">Create</button>
      </form>
    );
  }
}

export default CreateWorkspace;
