import React, { Component } from 'react';

import NavBar from '../../components/NavBar';

import { single as singleWorkspace } from '../../services/workspace';

/*COMPONENTES*/
import FooterWorkspace from '../../components/FooterWorkspace';
import AddTask from '../../components/AddTask';
import Tasks from '../../components/Task';

export default class WorkspaceCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workspace: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const id = this.props.match.params.id;

    singleWorkspace(id)
      .then(workspace => {
        this.setState(workspace);
       
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


        <Tasks idWorkspace={this.props.match.params.id} />
        
        {/* <AddTask idWorkspace={workspace._id} />


        <FooterWorkspace /> */}
      </div>
    );
  }
}
