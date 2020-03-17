import React, { Component, Fragment } from 'react';
import { approvedUser } from './../../services/workspaceUser';

class ApprovedUsersForWorkspace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      approvedUsers: []
    };
  }

  componentDidMount() {
    approvedUser(this.props.workspaceId).then(users => this.setState({ approvedUsers: users }));
  }
  componentDidUpdate() {
    approvedUser(this.props.workspaceId).then(users => this.setState({ approvedUsers: users }));
  }

  render() {
    return (
      <div>
        <h3>Users</h3>
        {this.state.approvedUsers.map(approvedUsers => (
          <h3 key={approvedUsers._id}>{approvedUsers.name}</h3>
        ))}
      </div>
    );
  }
}
export default ApprovedUsersForWorkspace;
