import React, { Component, Redirect } from 'react';
import ApprovedUsersForWorkspace from './../../components/ApprovedUsersForWorkspace';
import { editWorkspace } from './../../services/workspaceUser';
import { useSwipeable, Swipeable } from 'react-swipeable';

class ListWorkspaceUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workspaces: [],
      approvedUsers: []
    };
    this.handleSwipeLeft = this.handleSwipeLeft.bind(this);
  }

  componentDidMount() {
    editWorkspace(this.props.user._id).then(workspaces => this.setState({ workspaces }));
  }
  handleSwipeLeft() {
    return this.props.history.push('./dashboard');
  }
  render() {
    return (
      <Swipeable onSwipedRight={this.handleSwipeLeft}>
        <button onClick={this.handleSwipeLeft}>go back or swipe right</button>
        {this.state.workspaces.map(workspace => (
          <ApprovedUsersForWorkspace
            key={workspace._id}
            workspaceId={workspace._id}
            workspaceName={workspace.name}
          />
        ))}
      </Swipeable>
    );
  }
}
export default ListWorkspaceUsers;
