import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

import { signIn } from './../../services/authentication';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
  }

  handleFormSubmission(event) {
    event.preventDefault();
    const { email, password } = this.state;
    signIn({
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
  }

  render() {
    return (
      <Form onSubmit={this.handleFormSubmission}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={this.handleInputChange}
            value={this.state.email}
            type="email"
            name="email"
            placeholder="Enter email"
          />
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
          Sign In
        </Button>
      </Form>
    );
  }
}

export default SignIn;
