import React, { Component, Fragment } from 'react';
import { approvedUser, approvedUsersReject } from './../../services/workspaceUser';
import './style.scss';

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
      <div className="approvedUser">
        <h3>{this.props.workspaceName}'s Team</h3>
        <img className="team__img__list" src="./../images/undraw_team_spirit_hrr4.svg" alt="team" />
        {this.state.approvedUsers.map(approvedUsers => (
          <div className="singleUserFlex" key={approvedUsers._id}>
            <div className="singleUser">
              <h3>{approvedUsers.name}</h3>
              <button onClick={() => this.removeUserFromWorkspace(approvedUsers._id)}>
                <img className="remove__img__list" src="./../images/close-white.svg" alt="team" />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default ApprovedUsersForWorkspace;
