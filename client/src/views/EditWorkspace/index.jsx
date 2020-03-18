import './style.scss';

import React, { Component, Fragment } from 'react';
import { useSwipeable, Swipeable } from 'react-swipeable';

import { editWorkspace } from './../../services/workspaceUser';
import { remove, edit } from './../../services/workspace';

import ApproveUsersForWorkspace from './../../components/ApproveUsersForWorkspace';

class EditWorkspace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workspaces: [],
      workspaceName: ''
    };
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSwipeLeft = this.handleSwipeLeft.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleFormSubmission(workspaceId) {
    const name = this.state.workspaceName;
    if (!name) return;
    const workspace = {
      name
    };
    edit(workspaceId, name)
      .catch(error => console.log(error))
      .then(() =>
        editWorkspace(this.props.user._id).then(workspaces =>
          this.setState({ workspaces, workspaceName: '' })
        )
      );
  }
  componentDidMount() {
    editWorkspace(this.props.user._id).then(workspaces => this.setState({ workspaces }));
  }
  removeWorkspace(workspaceId) {
    remove(workspaceId).then(() =>
      editWorkspace(this.props.user._id).then(workspaces => this.setState({ workspaces }))
    );
  }
  handleSwipeLeft() {
    return this.props.history.push('./dashboard');
  }
  render() {
    return (
      <Swipeable onSwipedRight={this.handleSwipeLeft}>
        <button onClick={this.handleSwipeLeft}>go back or swipe right</button>
        <h3>Workspaces from {this.props.user.name}</h3>
        {this.state.workspaces.map(workspace => (
          <Fragment key={workspace._id}>
            <h1>{workspace.name}</h1>
            <input
              className="form__input"
              type="text"
              name="workspaceName"
              value={this.state.workspaceName}
              onChange={this.handleInputChange}
              placeholder="Your workspace name"
              autoComplete="off"
            />
            <button onClick={() => this.handleFormSubmission(workspace._id)}>Submit</button>
            <button onClick={() => this.removeWorkspace(workspace._id)}>delete workspace</button>
            <h3>Pending Users</h3>
            <ApproveUsersForWorkspace workspaceId={workspace._id} />
          </Fragment>
        ))}
      </Swipeable>
    );
  }
}

export default EditWorkspace;
