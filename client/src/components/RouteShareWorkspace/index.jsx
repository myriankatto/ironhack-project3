import React, { Component } from 'react';
import { askPermissionWorkspace } from './../../services/workspaceUser';

class RouteShareWorkpace extends Component {
  // componentDidMount() {
  //   console.log(this.props.user._Id, this.props.workspaceId);
  //   askPermissionWorkspace(this.props.user._Id, this.props.workspaceId)
  //     .then(x => console.log(x))
  //     .catch(error => console.log(error));
  // }

  render() {
    console.log('share: ' + this.props.user);
    return (
      <div>
        {/* <h3>{this.props.user.name} been sucessufly added to the {this.props.user._Id}, {this.props.workspaceId}</h3> */}
        <p>Please wait for administarator approval.</p>
      </div>
    );
  }
}
export default RouteShareWorkpace;
