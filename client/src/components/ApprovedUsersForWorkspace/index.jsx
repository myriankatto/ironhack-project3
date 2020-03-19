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
    approvedUser(this.props.workspaceApproved.workspaceApproved[0]._id).then(users =>
      this.setState({ approvedUsers: users })
    );
  }
  componentDidUpdate() {
    approvedUser(this.props.workspaceApproved.workspaceApproved[0]._id).then(users =>
      this.setState({ approvedUsers: users })
    );
  }
  removeUserFromWorkspace(userId) {
    approvedUsersReject(userId, this.props.workspaceApproved.workspaceApproved[0]._id);
  }

  render() {
    // console.log(this.props.workspaceApproved.workspaceApproved[0]);
    return (
      <div className="approvedUser">
        <h3>{this.props.workspaceApproved.workspaceApproved[0].name}'s Team</h3>
        {this.state.approvedUsers.map(approvedUsers => (
          <div className="singleUserFlex" key={approvedUsers._id}>
            <div className="singleUser">
              <h3>{approvedUsers.name}</h3>
              {this.props.workspaceApproved.workspaceApproved[0].operator ===
              this.props.workingUser ? (
                <button onClick={() => this.removeUserFromWorkspace(approvedUsers._id)}>
                  <img className="remove__img__list" src="./../images/close-white.svg" alt="team" />
                </button>
              ) : (
                ''
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default ApprovedUsersForWorkspace;
