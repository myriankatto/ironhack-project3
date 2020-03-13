import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

import { signUp } from './../../services/authentication';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
  }

  handleFormSubmission(event) {
    event.preventDefault();
    const { name, email, password } = this.state;
    signUp({
      name,
      email,
      password
    })
      .then(user => {
        this.props.updateUserInformation(user);
        this.props.changeHistory();
      })
      .catch(error => {
        console.log(error);
      });
  }
  handleInputChange(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });

    console.log(value, name);
  }

  render() {
    return (
      <Form onSubmit={this.handleFormSubmission}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={this.handleInputChange}
            value={this.state.name}
            name="name"
            type="text"
            placeholder="Enter name"
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={this.handleInputChange}
            value={this.state.email}
            type="email"
            name="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={this.handleInputChange}
            value={this.state.password}
            type="password"
            name="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create an account
        </Button>
      </Form>
    );
  }
}

export default SignUp;
