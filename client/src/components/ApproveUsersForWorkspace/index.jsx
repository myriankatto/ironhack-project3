import React, { Component, Fragment } from 'react';
import { usersFromWorkspace, usersApproved, usersReject } from './../../services/workspaceUser';
import './style.scss';

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
      <div className="usersForApprovalDiv">
        <h3>Pending Users</h3>
        {this.state.users.map(user => (
          <div className="usersForApproval" key={user._id}>
            <h3>{user.name}</h3>
            <button className="approve__btn" onClick={() => this.approve(user._id)}>
              Approve
            </button>
            <button className="reject__btn" onClick={() => this.reject(user._id)}>
              Reject
            </button>
          </div>
        ))}
      </div>
    );
  }
}
export default ApproveUsersForWorkspace;
