import React, { Component } from 'react';
/*SERVICES PARA USER */
import { single as SingleUser } from '../../services/score';

/*SERVICE PARA WORKSPACE*/
import { single as SingleWorkspace } from '../../services/workspace';

export default class gePoints extends Component {
  constructor(props) {
    super(props);

    this.state = {
      workspaceScore: '',
      userScore: ''
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const workspace = await SingleWorkspace(this.props.idWorkspace);
    const workspaceScore = workspace.workspace.score;
    const creatorId = this.props.user._id;
    const idWorkspace = this.props.idWorkspace;
    const user = await SingleUser(creatorId);
    
    let userScore;
    if(user.scoreUser.find(element => element.workspace === idWorkspace) !== undefined){
      userScore = user.scoreUser.find(element => element.workspace === idWorkspace).score;
    }else{
      userScore = 0;
    }
    
    this.setState({
      workspaceScore,
      userScore
    });
  }

  render() {
    return (
      <h5>
        <small>Your Score:</small>{this.state.userScore}
        <br></br>
        <small>Workspace Score:</small> {this.state.workspaceScore}
      </h5>
    );
  }
}
