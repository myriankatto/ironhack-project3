import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

import { create }  from './../../services/task';

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      level: '', 
      urgency:'', 
      category:'',
      personal:''
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

    const name = this.state.name;
    const level = this.state.level;
    const urgency = this.state.urgency;
    const personal = this.state.personal;
    const category = this.state.category;
    
    //const { name, level, urgency, category, personal  } = this.state;
    const id = this.props.idWorkspace;
    console.log(id, name);

    //if (!name || !level || !urgency || !category || !personal) return;
    
    create({id,name})
      .then()
      .catch(error => {
        console.log(error);
      });

      this.setState({
        name: '',
        level: '', 
        urgency:'', 
        category:'',
        personal:''
      });
  };

  render() {
    return (
      <Form onSubmit={this.handleFormSubmission}>
        <Form.Group controlId="formBasicName">

          <Form.Control
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
            placeholder="Your task name"
            autoComplete="off"
          />

          {/* <Form.Control
            type="text"
            name="level"
            value={this.state.level}
            onChange={this.handleInputChange}
            placeholder="Your level"
            autoComplete="off"
          /> */}

          {/* <Form.Control
            type="text"
            name="personal"
            value={this.state.personal}
            onChange={this.handleInputChange}
            placeholder="Personal"
            autoComplete="off"
          /> */}

          {/* <Form.Label>Description</Form.Label>
          <Form.Control 
          as="textarea" 
          rows="3"
          type="text"
          name="description"
          value={this.state.description}
          onChange={this.handleInputChange}
          placeholder="Your description"
          autoComplete="off" /> */}
          

          


          <Button variant="primary" type="submit">
            Create
          </Button>
        </Form.Group>
      </Form>
    );
  }
}

export default AddTask;