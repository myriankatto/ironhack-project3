import React, { Component } from 'react';
import { askPermissionWorkspace } from './../../services/workspaceUser';
import { Link } from 'react-router-dom';
import { single } from '../../services/workspace';

class RouteShareWorkpace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workspaceName: ''
    };
  }
  componentDidMount() {
    const workspaceId = this.props.history.location.pathname.split('/')[2];
    askPermissionWorkspace(this.props.user._id, workspaceId).catch(error => console.log(error));
    single(workspaceId).then(workspace =>
      this.setState({ workspaceName: workspace.workspace.name })
    );
  }

  render() {
    return (
      <div>
        <h3>
          {this.props.user.name} been sucessufly added to the {this.state.workspaceName}
        </h3>
        <p>Please wait for administarator approval.</p>
        <Link to={'/'}>Return</Link>
      </div>
    );
  }
}
export default RouteShareWorkpace;
