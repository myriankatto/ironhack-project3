import React, { Component } from 'react';


import NavBar from './../../components/NavBar';
import CreateWorkspace from '../../components/CreateWorkspace';
import SearchWorkspace from '../../components/SearchWorkspace';

class WorkspaceDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      active: false,
    };
    this.toogleWorkspace = this.toogleWorkspace.bind(this);
  }

  toogleWorkspace() {
    this.setState(previousState => ({
      active: !previousState.active
    }));
  }

 

  render() {
    return (
      <div>
        <NavBar />
        <button onClick={this.toogleWorkspace}>Create a new Workspace</button>
        {this.state.active && <CreateWorkspace />}
        <p>______or______</p>
        <SearchWorkspace />
      </div>
    );
  }
}

export default WorkspaceDashboard;
