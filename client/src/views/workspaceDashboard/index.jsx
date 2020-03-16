import React, { Component } from 'react';
import NavBar from './../../components/NavBar';

class WorkspaceDashboard extends Component {
  render() {
    return (
      <div>
        <NavBar user={this.props.user} />
        <h1>DASHBOARD</h1>
      </div>
    );
  }
}

export default WorkspaceDashboard;
