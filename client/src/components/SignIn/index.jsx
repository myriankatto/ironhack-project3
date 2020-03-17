import React, { Component } from 'react';

import { signIn } from './../../services/authentication';

import './style.scss';

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
      <div className="signin__container">
        <h3>Welcome to APP</h3>
        <p>Description phrase</p>

        <form onSubmit={this.handleFormSubmission} className="signin__form">
        <h2>Log in to your account to continue</h2>

          <input
            className="signin__input"
            onChange={this.handleInputChange}
            value={this.state.email}
            type="email"
            name="email"
            placeholder="Enter email"
          />
    
          <input
          className="signin__input"
            onChange={this.handleInputChange}
            value={this.state.password}
            type="password"
            name="password"
            placeholder="Password"
          />
        <button className="signin__btn">
          Sign In
        </button>
      </form>
      <img
          className="home__img-signin"
          src="./../../../images/home.svg"
          alt="working space ilustration"
        />
      </div>
    );
  }
}

export default SignIn;
