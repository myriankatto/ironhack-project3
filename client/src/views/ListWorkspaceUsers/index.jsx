import React, { Component } from 'react';
import ApprovedUsersForWorkspace from './../../components/ApprovedUsersForWorkspace';
import { editWorkspace, userWorkspacesApproved } from './../../services/workspaceUser';
import { Swipeable } from 'react-swipeable';
import './style.scss';

class ListWorkspaceUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workspaces: [], // if the user is the same as the operator we will have workspaces
      userWorkspacesApproved: []
    };
    this.handleSwipeLeft = this.handleSwipeLeft.bind(this);
  }

  componentDidMount() {
    userWorkspacesApproved(this.props.user._id)
      .then(userWorkspacesApproved => this.setState({ userWorkspacesApproved }))
      .then(
        () =>
          editWorkspace(this.props.user._id, this.props.workspaceId).then(workspaces =>
            this.setState({ workspaces })
          ) // if the user is the same as the operator we will have workspaces
      );
  }
  handleSwipeLeft() {
    return this.props.history.push('./dashboard');
  }
  render() {
    return (
      <Swipeable onSwipedRight={this.handleSwipeLeft}>
        {this.state.userWorkspacesApproved.map(workspaceApproved => (
          <ApprovedUsersForWorkspace
            key={workspaceApproved._id}
            workingUser={this.props.user._id}
            workspaceApproved={workspaceApproved}
            workspaceId={this.props.workspaceId}
            workspaces={this.state.workspaces}
          />
        ))}
      </Swipeable>
    );
  }
}
export default ListWorkspaceUsers;
