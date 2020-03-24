import React, { Component } from 'react';
import { askPermissionWorkspace } from './../../services/workspaceUser';
import { Link } from 'react-router-dom';
import { single } from '../../services/workspace';
import './style.scss';
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
      <div className="success-msg">
        <img src="./../images/success.svg" alt="succes" />
        <h2>{this.props.user.name} </h2>
        <p> has been sucessufly added to the </p>

        <h2> {this.state.workspaceName} </h2>

        <span>Please wait for administarator approval.</span>
        <Link to={'/'}>Return</Link>
      </div>
    );
  }
}
export default RouteShareWorkpace;
