import React, { Component } from 'react';

import createWorkspace from '../../components/CreateWorkspace';
import searchWorkspace from '../../components/searchWorkspace';
import NavBar from './../../components/NavBar'

class workspaceCreate extends Component {
  render() {
    return (
      <div>
        <NavBar
          user={this.props.user}
          {...this.props}
          updateUserInformation={this.props.updateUserInformation}
        />
      </div>
    );
  }
}

export default workspaceCreate;
