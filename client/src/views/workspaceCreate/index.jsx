
import React, { Component, Fragment } from 'react';

import NavBar from '../../components/NavBar';

import {single as singleWorkspace } from '../../services/workspace';

//import createWorkspace from '../../components/CreateWorkspace';
//import searchWorkspace from '../../components/serchWorkspace';

import AddTask from '../../components/AddTask';

export default class WorkspaceCreate extends Component {
  constructor(props){
    super(props);
    this.state = {
      workspace: []
    };
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const id = this.props.match.params.id;
    
    singleWorkspace(id)
      .then(workspace => {
        this.setState( workspace );
        //console.log(this.state.workspace)
      })
      .catch(error => {
        console.log(error);
      });
  }

  
  render() {

    const { workspace } = this.state;

    return (
      <div>
        <NavBar
          user={this.props.user}
          {...this.props}
          updateUserInformation={this.props.updateUserInformation}
        />
        <AddTask idWorkspace={workspace._id}/>
      </div>
    );
  }
}
