import React, { Component } from 'react';

import SignUp from './../../components/SignUp';
import SignIn from './../../components/SignIn';

import { loadUserInformation } from './../../services/authentication';

import './style.scss'

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
        {this.state.signIn ? (
          
          <SignIn updateUserInformation={this.updateUserInformation} changeHistory={this.changeHistory}/>
        ) : (
         
          <SignUp updateUserInformation={this.updateUserInformation} changeHistory={this.changeHistory}/>
        )}
        <span onClick={this.handleAuthentication}> 
          {this.state.signIn ? <React.Fragment><span className="span-home">Don’t have an account?</span><button className="home-btn">Create an Account</button></React.Fragment> : <React.Fragment><span className="span-home">Already have an account?</span> <button className="home-btn">Sign In</button></React.Fragment>}
        </span>
      </div>
    );
  }
}

export default Home;
