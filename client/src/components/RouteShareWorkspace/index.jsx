import React, { Component } from 'react';
import { askPermissionWorkspace } from './../../services/workspaceUser';

class RouteShareWorkpace extends Component {
  // componentDidMount() {
  //   askPermissionWorkspace(this.props.user._Id, this.props.workspaceId);
  // }

  render() {
    console.log(this.props);
    return <h1>You've been sucessufly added to the</h1>;
  }
}
export default RouteShareWorkpace;
