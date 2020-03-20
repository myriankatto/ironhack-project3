import React, { Component } from 'react';

import SignUp from './../../components/SignUp';
import SignIn from './../../components/SignIn';

import { loadUserInformation } from './../../services/authentication';

import './style.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signIn: true
    };
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.changeHistory = this.changeHistory.bind(this);
  }

  handleAuthentication() {
    this.setState({
      signIn: !this.state.signIn
    });
  }

  changeHistory() {
    this.props.history.push('/dashboard');
  }

  render() {
    return (
      <div>
        {this.state.signIn ? (
          <SignIn
            updateUserInformation={this.props.updateUserInformation}
            changeHistory={this.changeHistory}
          />
        ) : (
          <SignUp
            updateUserInformation={this.props.updateUserInformation}
            changeHistory={this.changeHistory}
          />
        )}
        <span onClick={this.handleAuthentication}>
          {this.state.signIn ? (
            <React.Fragment>
              <span className="span-home">Don’t have an account?</span>
              <button className="home-btn">Create an Account</button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <span className="span-home">Already have an account?</span>{' '}
              <button className="home-btn">Sign In</button>
            </React.Fragment>
          )}
        </span>
      </div>
    );
  }
}

export default Home;
