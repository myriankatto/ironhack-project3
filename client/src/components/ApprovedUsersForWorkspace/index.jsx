import React, { Component, Fragment } from 'react';
import { approvedUser, approvedUsersReject } from './../../services/workspaceUser';

class ApprovedUsersForWorkspace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      approvedUsers: []
    };
    this.removeUserFromWorkspace = this.removeUserFromWorkspace.bind(this);
  }

  componentDidMount() {
    approvedUser(this.props.workspaceId).then(users => this.setState({ approvedUsers: users }));
  }
  componentDidUpdate() {
    approvedUser(this.props.workspaceId).then(users => this.setState({ approvedUsers: users }));
  }
  removeUserFromWorkspace(userId) {
    approvedUsersReject(userId, this.props.workspaceId);
  }

  render() {
    return (
      <div>
        <h3>Users from {this.props.workspaceName}</h3>
        {this.state.approvedUsers.map(approvedUsers => (
          <Fragment key={approvedUsers._id}>
            <h3>{approvedUsers.name}</h3>
            <button onClick={() => this.removeUserFromWorkspace(approvedUsers._id)}>X</button>
          </Fragment>
        ))}
      </div>
    );
  }
}
export default ApprovedUsersForWorkspace;
