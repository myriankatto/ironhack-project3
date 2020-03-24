import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class LinkToComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workspacesApprovedForCurrentUser: this.props.user.workspaceApproved
    };
  }

  render() {
    return this.state.workspacesApprovedForCurrentUser.find(
      workspaceid => workspaceid === this.props.workspace._id
    ) ? (
      <Link to={`/dashboard/${this.props.workspace._id}`}>{this.props.workspace.name}</Link>
    ) : (
      <Link to={`/dashboard`}>{this.props.workspace.name}</Link>
    );
  }
}

export default LinkToComponent;
