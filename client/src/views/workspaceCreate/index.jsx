
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
         <NavBar user={this.props.user} workspace={workspace.name}/>

          {workspace.name}:
          

          <AddTask idWorkspace={workspace._id}/>




          {/* NOME DO USUÁRIO: <br></br>

          {
            this.props.user ? this.props.user.name : 'NADA'
          }<br></br>
           */}
          {/* {
            workspace.operator === this.props.user._id ? 'ele é operador' : 'não é operador' 
          } */}


         
          
         
      </div>
    )
  }
}
