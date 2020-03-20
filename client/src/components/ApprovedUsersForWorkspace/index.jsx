import React, { Component } from 'react';
import { approvedUser, approvedUsersReject } from './../../services/workspaceUser';
import './style.scss';
import { Link } from 'react-router-dom';

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
        <Link to="/dashboard">
          <img className="icon-img" src="./../images/close-white.svg" alt="close" />
        </Link>
        <h2>{this.props.workspaceApproved.workspaceApproved[0].name}'s Team</h2>

        <img className="team__img__list" src="./../images/undraw_team_spirit_hrr4.svg" alt="team" />

        {this.state.approvedUsers.map(approvedUsers => (
          <div className="singleUserFlex" key={approvedUsers._id}>
            <div className="singleUser">
              <div className="container">
                <img className="img_user" src={approvedUsers.picture} alt={approvedUsers.name} />
                <h3>{approvedUsers.name}</h3>
              </div>
              {this.props.workspaceApproved.workspaceApproved[0].operator ===
              this.props.workingUser ? (
                <button onClick={() => this.removeUserFromWorkspace(approvedUsers._id)}>
                  <img className="remove__img__list" src="./../images/bin.svg" alt="remove" />
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
