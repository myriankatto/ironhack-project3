import React, { Component } from 'react';

import SignUp from './../../components/SignUp';
import SignIn from './../../components/SignIn';

import { loadUserInformation } from './../../services/authentication';

import { Button } from 'react-bootstrap';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // loaded: false,
      // user: null,
      signIn: true
    };

    // this.updateUserInformation = this.updateUserInformation.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.changeHistory = this.changeHistory.bind(this);
  }

  // componentDidMount() {
  //   loadUserInformation()
  //     .then(user => {
  //       this.props.updateUserInformation(user); //here we need to pass the user that comes from the promise to the app.js
  //       this.setState({
  //         loaded: true
  //       });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  // updateUserInformation(user) {
  //   this.setState({
  //     user
  //   });
  // }

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
        <Button variant="secondary" onClick={this.handleAuthentication}>
          {this.state.signIn ? 'Create an Account' : 'Sign-In'}
        </Button>
      </div>
    );
  }
}

export default Home;
