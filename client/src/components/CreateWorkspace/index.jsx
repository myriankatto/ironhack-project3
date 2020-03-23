import React, { Component } from 'react';

import { create } from './../../services/workspace';
import { usersApproved } from './../../services/workspaceUser';
import { editUSerPush as EditUser } from './../../services/score';

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

  async handleFormSubmission(event) {
    event.preventDefault();
    const name = this.state.workspaceName;
    const creatorId = this.props.user._id;
    const score = 0;
    

    if (!name) return;
    
    const newWorkspace = await create({name});

    //console.log('newWorkspace Operator', newWorkspace.data.operator);
    const userId = newWorkspace.data.operator;
    const userWorkspaceId = newWorkspace.data._id;

    await usersApproved(userId, userWorkspaceId);
    
    //Operador recebe score igual à 0 quando é criado o Workspace:
    const workspace =  userWorkspaceId;
    await EditUser({creatorId, workspace, score});
    
    this.setState({
      workspaceName: ''
    });

  };
  
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
