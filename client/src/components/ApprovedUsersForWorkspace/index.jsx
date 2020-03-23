import React, { Component, Fragment } from 'react';
import { single } from './../../services/workspace';
import { approvedUser, approvedUsersReject } from './../../services/workspaceUser';
import './style.scss';
import { Link } from 'react-router-dom';

class ApprovedUsersForWorkspace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      approvedUsers: [],
      userWorkspacesApprovedName: []
    };
    this.removeUserFromWorkspace = this.removeUserFromWorkspace.bind(this);
  }

  componentDidMount() {
    approvedUser(this.props.workspaceId)
      .then(users => this.setState({ approvedUsers: users }))
      .then(() =>
        single(this.props.workspaceId).then(userWorkspacesApprovedName =>
          this.setState({ userWorkspacesApprovedName })
        )
      );
  }

  removeUserFromWorkspace(userId) {
    approvedUsersReject(userId, this.props.workspaceId).then(() =>
      approvedUser(this.props.workspaceId).then(users => this.setState({ approvedUsers: users }))
    );
  }

  render() {
    // console.log(this.state.userWorkspacesApprovedName.workspace.name);
    return (
      <div className="approvedUser">
        <Link to="/dashboard">
          <img className="icon-img" src="./../images/close-white.svg" alt="close" />
        </Link>
        {this.state.userWorkspacesApprovedName.workspace && (
          <h2>{this.state.userWorkspacesApprovedName.workspace.name}'s Team</h2>
        )}

        <img className="team__img__list" src="./../images/undraw_team_spirit_hrr4.svg" alt="team" />
        {this.state.approvedUsers.map(approvedUsers => (
          <div className="singleUserFlex" key={approvedUsers._id}>
            {this.props.workspaceApproved.workspaceApproved.map(
              userWorkspacesApproved =>
                userWorkspacesApproved._id === this.props.workspaceId && (
                  <div className="singleUser" key={userWorkspacesApproved._id}>
                    <div className="container">
                      <img
                        className="img_user"
                        src={approvedUsers.picture}
                        alt={approvedUsers.name}
                      />
                      <h3>{approvedUsers.name}</h3>
                    </div>
                    {userWorkspacesApproved.operator === this.props.workingUser ? (
                      <button onClick={() => this.removeUserFromWorkspace(approvedUsers._id)}>
                        <img className="remove__img__list" src="./../images/bin.svg" alt="remove" />
                      </button>
                    ) : (
                      ''
                    )}
                  </div>
                )
            )}
          </div>
        ))}
      </div>
    );
  }
}
export default ApprovedUsersForWorkspace;
