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
        <nav className="navPlusMenu">
          <a href="#" onMouseDown={this.handleSwipeLeft}>
            <img src="./../images/left-white.svg" alt="go back icon" />
          </a>
          <h2>Settings</h2>
        </nav>

        {this.state.workspaces.map(workspace => (
          <div className="workspaceSettings" key={workspace._id}>
            <h3>{workspace.name}</h3>
            <div className="editWorkSpaceName">
              <label htmlFor="workspacename">Edit Name</label>
              <input
                className="workspace__input__form"
                type="text"
                name="workspaceName"
                value={this.state.workspaceName}
                onChange={this.handleInputChange}
                placeholder="Your workspace name"
                autoComplete="off"
              />
              <button
                className="submit__btn"
                onClick={() => this.handleFormSubmission(workspace._id)}
              >
                Submit
              </button>
            </div>
            <ApproveUsersForWorkspace workspaceId={workspace._id} />
            <button className="delete__btn" onClick={() => this.removeWorkspace(workspace._id)}>
              delete workspace
            </button>
          </div>
        ))}
      </Swipeable>
    );
  }
}

export default EditWorkspace;
