import React, { Component, Redirect } from 'react';
import ApprovedUsersForWorkspace from './../../components/ApprovedUsersForWorkspace';
import { editWorkspace, userWorkspacesApproved } from './../../services/workspaceUser';
import { useSwipeable, Swipeable } from 'react-swipeable';
import './style.scss';

class ListWorkspaceUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workspaces: [],
      approvedUsers: [],
      userWorkspacesApproved: []
    };
    this.handleSwipeLeft = this.handleSwipeLeft.bind(this);
  }

  componentDidMount() {
    userWorkspacesApproved(this.props.user._id).then(userWorkspacesApproved =>
      this.setState({ userWorkspacesApproved })
    );
    editWorkspace(this.props.user._id).then(workspaces => this.setState({ workspaces }));
  }
  handleSwipeLeft() {
    return this.props.history.push('./dashboard');
  }
  render() {
    return (
      <Swipeable onSwipedRight={this.handleSwipeLeft}>
        <nav className="navPlusMenu">
          <a href="#" onMouseDown={this.handleSwipeLeft}>
            <img src="./../images/left-white.svg" alt="go back icon" />
          </a>
        </nav>
        <div className="div__team__img__list">
          <img
            className="team__img__list"
            src="./../images/undraw_team_spirit_hrr4.svg"
            alt="team"
          />
        </div>
        {this.state.userWorkspacesApproved.map(workspaceApproved => (
          <ApprovedUsersForWorkspace
            key={workspaceApproved._id}
            workingUser={this.props.user._id}
            workspaceApproved={workspaceApproved}
          />
        ))}
      </Swipeable>
    );
  }
}
export default ListWorkspaceUsers;

{
  /* {this.state.workspaces.map(workspace => (
  <ApprovedUsersForWorkspace
    key={workspace._id}
    workspaceId={workspace._id}
    workspaceName={workspace.name}
    workspaceOperator={workspace.operator}
    workingUser={this.props.user._id}
  />
))} */
}
