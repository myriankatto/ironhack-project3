import React, { Component, Fragment } from 'react';
import { usersFromWorkspace, usersApproved, usersReject } from './../../services/workspaceUser';

class ApproveUsersForWorkspace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    this.approve = this.approve.bind(this);
    this.reject = this.reject.bind(this);
  }

  componentDidMount() {
    usersFromWorkspace(this.props.workspaceId).then(users => this.setState({ users }));
  }

  approve(userId) {
    usersApproved(userId, this.props.workspaceId).then(() =>
      usersFromWorkspace(this.props.workspaceId).then(users => this.setState({ users }))
    );
  }
  reject(userId) {
    usersReject(userId, this.props.workspaceId).then(() =>
      usersFromWorkspace(this.props.workspaceId).then(users => this.setState({ users }))
    );
  }

  render() {
    return (
      <div>
        {this.state.users.map(user => (
          <Fragment key={user._id}>
            <h3>{user.name}</h3>
            <button onClick={() => this.approve(user._id)}>Approve</button>
            <button onClick={() => this.reject(user._id)}>Reject</button>
          </Fragment>
        ))}
      </div>
    );
  }
}
export default ApproveUsersForWorkspace;
