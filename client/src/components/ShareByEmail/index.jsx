import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import shareWorkspaceByEmail from './../../services/shareWorkspaceByEmail';

import './style.scss';

class ShareByEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      emailMessage: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.resetEmailMessage = this.resetEmailMessage.bind(this);
  }
  resetEmailMessage() {
    this.setState({ emailMessage: '' });
  }
  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }
  handleEmail() {
    shareWorkspaceByEmail(
      this.props.workspace._id,
      this.props.workspace.name,
      this.state.query
    ).then(message => {
      const resetEmailMessage = this.resetEmailMessage;
      this.setState({ emailMessage: message.msg.toString() });
      setTimeout(function() {
        resetEmailMessage();
      }, 3000);
    });
  }

  render() {
    //not working, doesn't recognize the message
    let messageColor = 'emailMessageRed';
    this.emailMessage === 'success'
      ? (messageColor = 'emailMessageGreen')
      : (messageColor = 'emailMessageRed');
    console.log(messageColor);
    return (
      <React.Fragment>
        <div className="workspace__search__form">
          <form className="workspace__search__form">
            <input
              className="workspace__input__form"
              type="email"
              name="query"
              value={this.state.query}
              onChange={this.handleInputChange}
              placeholder="Insert email to share workspace"
              autoComplete="off"
            />
          </form>
        </div>
        <button className="workspace__btn" onClick={this.handleEmail}>
          Share Workspace
        </button>
        <article id={messageColor}>{this.state.emailMessage}</article>
      </React.Fragment>
    );
  }
}

export default ShareByEmail;
