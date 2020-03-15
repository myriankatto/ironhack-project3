import React, { Component } from 'react';

import SignUp from './../../components/SignUp';
import SignIn from './../../components/SignIn';

import { loadUserInformation } from './../../services/authentication';

import { Button } from 'react-bootstrap';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      user: null,
      signIn: true
    };

    
    this.updateUserInformation = this.updateUserInformation.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.changeHistory = this.changeHistory.bind(this);

  }

  componentDidMount() {
    loadUserInformation()
      .then(user => {
        this.updateUserInformation(user);
        this.setState({
          loaded: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateUserInformation(user) {
    this.setState({
      user
    });
  }

  handleAuthentication() {
    this.setState({
      signIn: !this.state.signIn
    });
  }


  changeHistory(){
    this.props.history.push('/dashboard');
  }
  
  render() {
    return (
      <div>
        <Button variant="secondary" onClick={this.handleAuthentication}>
          {this.state.signIn ? 'Create an Account' : 'Sign-In'}
        </Button>
        {this.state.signIn ? (
          <SignIn updateUserInformation={this.updateUserInformation} changeHistory={this.changeHistory}/>
        ) : (
          <SignUp updateUserInformation={this.updateUserInformation} changeHistory={this.changeHistory}/>
        )}
      </div>
    );
  }
}

export default Home;
