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
    this.handleWorkspaceFromDropDownMenu = this.handleWorkspaceFromDropDownMenu.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  //this will edit the workspace name
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

  //this search all the workpsaces that the user is the operator
  componentDidMount() {
    editWorkspace(this.props.user._id, this.props.workspaceId).then(workspaces =>
      this.setState({ workspaces })
    );
  }

  removeWorkspace(workspaceId) {
    remove(workspaceId).then(() =>
      editWorkspace(this.props.user._id, this.props.workspaceId).then(workspaces =>
        this.setState({ workspaces })
      )
    );
  }

  //this will update this state with the workspace that is selected in the dropdaown menu from the component WorkspaceDropdownMenu
  handleWorkspaceFromDropDownMenu(workspaceFromDropDownMenu) {
    this.setState({
      workspaceFromDropDownMenu
    });
  }

  handleSwipeLeft() {
    return this.props.history.push('./dashboard');
  }
  render() {
    return (
      <Swipeable onSwipedRight={this.handleSwipeLeft}>
        <nav className="navPlusMenu">
          <h2>Workspace Settings</h2>
          <a href="#" onMouseDown={this.handleSwipeLeft}>
            <img src="./../images/close-white.svg" alt="close" />
          </a>
        </nav>
        {this.state.workspaces.map(workspace => (
          <div className="workspaceSettings" key={workspace._id}>
            <h3>{workspace.name}</h3>
            <Fragment>
              <div className="editWorkSpaceName">
                <input
                  className="workspace__input__form"
                  type="text"
                  name="workspaceName"
                  value={this.state.workspaceName}
                  onChange={this.handleInputChange}
                  placeholder="Edit workspace name"
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
              <div className="delete__container">
                <button className="delete__btn" onClick={() => this.removeWorkspace(workspace._id)}>
                  delete workspace
                </button>
              </div>
            </Fragment>
          </div>
        ))}
      </Swipeable>
    );
  }
}

export default EditWorkspace;
