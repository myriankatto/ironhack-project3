import React, { Component } from 'react';
import NavBar from './../../components/NavBar';

import CreateWorkspace from '../../components/CreateWorkspace';
// import NavBar from '../../components/NavBar';
// import SearchWorkspace from '../../components/serchWorkspace';

class WorkspaceDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }

  render() {
    return (
      <div>
        <NavBar />
        <CreateWorkspace />
      </div>
    );
  }
}

export default WorkspaceDashboard;
