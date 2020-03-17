import React, { Component } from 'react';
import { usersFromWorkspace } from './../../services/workspaceUser';

class ApproveUsersForWorkspace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    usersFromWorkspace(this.props.workspaceId).then(users => this.setState({ users }));
  }
  
  render() {
    return (
      <div>
        {this.state.users.map(user => (
          <h3 key={user._id}>{user.name}</h3>
        ))}
      </div>
    );
  }
}
export default ApproveUsersForWorkspace;
