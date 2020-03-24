import './style.scss';
import React, { Component, Fragment } from 'react';
import { Swipeable } from 'react-swipeable';

import { approvedUser } from './../../services/workspaceUser';

class FooterViewScoresToggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      approvedUsers: [],
      approvedUsersOrganized: []
    };

    this.OrganizedByScores = this.OrganizedByScores.bind(this);
  }

  componentDidMount() {
    approvedUser(this.props.idWorkspace).then(users => this.setState({ approvedUsers: users }));
  }

  //FUNÇÃO QUE IRÁ ORGANIZAR OS SCORES DE ORDEM DECRESCENTE
  async OrganizedByScores() {
    const approvedUser = await approvedUser(this.props.idWorkspace);

    console.log('approvedUser', approvedUser);
    const OrganizedByScores = this.state.approvedUsers;
    //console.log('OrganizedByScores',this.state.approvedUsers);

    OrganizedByScores.sort(function(a, b) {
      if (
        a.scoreUser.find(element => element.workspace == this.props.idWorkspace).score >
        b.scoreUser.find(element => element.workspace == this.props.idWorkspace).score
      ) {
        return 1;
      }
      if (
        a.scoreUser.find(element => element.workspace == this.props.idWorkspace).score <
        b.scoreUser.find(element => element.workspace == this.props.idWorkspace).score
      ) {
        return -1;
      }

      return 0;
    });

    this.setState({
      approvedUsersOrganized: OrganizedByScores
    });
  }

  componentDidUpdate() {
    //approvedUser(this.props.idWorkspace).then(users => this.setState({ approvedUsers: users }));
  }

  showOperatorViewScores() {}

  render() {
    //console.log('PROP NO FOOTER ADD', this.props.idWorkspace)
    var visibility = 'hide';
    if (this.props.menuVisibility) {
      visibility = 'show';
    }

    //console.log('approvedUsersOrganized',this.state.approvedUsersOrganized)

    return (
      <Swipeable onSwipedDown={this.props.handleMouseUp}>
        <div id="flyoutMenu_ViewScores" className={visibility}>
          <a onMouseUp={this.props.handleMouseUp}>
            {' '}
            <img className="down-icon" src="./../images/down-white.svg" alt="go down icon" />
          </a>
          <h3>{this.props.workspaceName}'s Scores</h3>
          <img
            style={{ maxWidth: '70%', margin: '1em auto' }}
            src="./../images/winners.svg"
            alt="winner illustration"
          />

          <ul className="users__scores__list">
            {this.state.approvedUsers.map(approvedUser => (
              <Fragment key={approvedUser._id}>
                <li className="userScore_Single">
                  <div className="scores_picture">
                    {' '}
                    <img
                      className="picture__scores"
                      src={approvedUser.picture}
                      alt={approvedUser.name}
                    />
                  </div>
                  <div className="scores_name">
                    <h5>{approvedUser.name}</h5>
                    <small>
                      {approvedUser.scoreUser.find(
                        element => element.workspace == this.props.idWorkspace
                      ) !== undefined
                        ? approvedUser.scoreUser.find(
                            element => element.workspace == this.props.idWorkspace
                          ).score
                        : 0}
                    </small>
                  </div>
                </li>
              </Fragment>
            ))}
          </ul>
        </div>
      </Swipeable>
    );
  }
}

export default FooterViewScoresToggle;
