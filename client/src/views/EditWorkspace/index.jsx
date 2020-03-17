import './style.scss';

import React, { Component, Fragment } from 'react';
import { editWorkspace } from './../../services/workspaceUser';
import ApproveUsersForWorkspace from './../../components/ApproveUsersForWorkspace';

class EditWorkspace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workspaces: [],
      active: false
    };
    this.toogleWorkspace = this.toogleWorkspace.bind(this);
  }

  toogleWorkspace() {
    this.setState(previousState => ({
      active: !previousState.active
    }));
  }
  componentDidMount() {
    editWorkspace(this.props.user._id).then(workspaces => this.setState({ workspaces }));
  }

  render() {
    // console.log(this.state.workspaces);
    return (
      <div>
        <h3>Workspaces from {this.props.user.name}</h3>
        {this.state.workspaces.map(workspace => (
          <Fragment>
            <h1 key={workspace._id}>{workspace.name}</h1>
            {this.state.active && <ApproveUsersForWorkspace workspaceId={workspace._id} />}
            <button onClick={this.toogleWorkspace}>Show Users for Approval</button>
          </Fragment>
        ))}
      </div>
    );
  }
}

export default EditWorkspace;
