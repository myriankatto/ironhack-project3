import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

import {create} from './../../services/workspace'

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
    .then()
    .catch(error => {
      console.log(error);
    })
    this.setState({
      workspaceName: ''
    });
  }
  render() {
    return (
      <Form onSubmit={this.handleFormSubmission}>
        <Form.Group controlId="formBasicName">
          <Form.Control
            type="text"
            name="workspaceName"
            value={this.state.workspaceName}
            onChange={this.handleInputChange}
            placeholder="Create a new Workspace..."
            autoComplete="off"
          />
          <Button variant="primary" type="submit">
            +
          </Button>
        </Form.Group>
      </Form>
    );
  }
}

export default CreateWorkspace;
