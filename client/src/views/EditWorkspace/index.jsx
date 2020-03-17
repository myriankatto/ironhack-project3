import './style.scss';

import React, { Component } from 'react';
import { editWorkspace } from './../../services/workspaceUser';

class EditWorkspace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workspaces: []
    };
  }
  componentDidMount() {
    editWorkspace(this.props.user._id).then(workspaces => this.setState({ workspaces }));
  }

  render() {
    console.log(this.state.workspaces);
    return (
      <h3>Workspaces from {this.props.user.name}</h3>
      {this.state.workspaces.map(workspace => <h1 key={workspace._id}>{workspace.name}</h1>)}
    );
  }
}

export default EditWorkspace;
