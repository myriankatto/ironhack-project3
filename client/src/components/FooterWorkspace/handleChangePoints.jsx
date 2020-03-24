import React, { Component } from 'react';
/*SERVICES PARA USER */
import { single as SingleUser } from '../../services/score';

/*SERVICE PARA WORKSPACE*/
import { single as SingleWorkspace } from '../../services/workspace';

export default class gePoints extends Component {
  componentDidMount() {
    this.props.triggerScoreUpdate();

    // this.fecthData();
  }

  // async fecthData() {
  //   const idWorkspace = this.props.idWorkspace;
  //   const idUSer = this.props.user._id;

  //   try {
  //     const singleWorkspace = await SingleWorkspace(idWorkspace);
  //     const singleUser = await SingleUser(idUSer);
  //     let userScore;
  //     if (singleUser.scoreUser.find(element => element.workspace === idWorkspace) !== undefined) {
  //       userScore = singleUser.scoreUser.find(element => element.workspace === idWorkspace).score;
  //     }

  //     const workspaceScore = singleWorkspace.workspace.score;

  //     this.setState({
  //       workspaceScore,
  //       userScore
  //     });
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  render() {
    return (
      <h5>
        <small>Your Score: </small>
        {this.props.scoreUser}
        <br></br>
        <small>Workspace Score: </small>
        {this.props.workspace.score}
      </h5>
    );
  }
}
