import React, { Component } from 'react';

import NavBar from './../../components/NavBar';
import CreateWorkspace from '../../components/CreateWorkspace';
import SearchWorkspace from '../../components/SearchWorkspace';

import './style.scss';

class WorkspaceDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      active: false
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
      <div className="dashboard">
        <NavBar
          user={this.props.user}
          {...this.props}
          updateUserInformation={this.props.updateUserInformation}
        />
        <div className="dashboard__content">
          <figure>
            <img className="team-image" src="./../images/team.svg" alt="workspace image" />
          </figure>
          <div className="dashboard__workspace__create">
            <button onClick={this.toogleWorkspace}>
              <h1>Create a new Workspace</h1>{' '}
              <img className="arrow-icon" src="./../images/down.svg" alt="down icon" />
            </button>
            {this.state.active && <CreateWorkspace />}
          </div>
          <p>
            <span>or</span>
          </p>
          <SearchWorkspace />
        </div>
      </div>
    );
  }
}

export default WorkspaceDashboard;
