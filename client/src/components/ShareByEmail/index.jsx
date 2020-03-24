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
    ).then(message => this.setState({ emailMessage: message.msg }));
  }

  render() {
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
        <article>{this.state.emailMessage}</article>
        <button className="workspace__btn" onClick={this.handleEmail}>
          Share Workspace
        </button>
      </React.Fragment>
    );
  }
}

export default ShareByEmail;
