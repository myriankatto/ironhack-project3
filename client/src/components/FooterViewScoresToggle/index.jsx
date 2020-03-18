import './style.scss';
import React, { Component, Fragment } from 'react';
import { Swipeable } from 'react-swipeable';

import { approvedUser } from './../../services/workspaceUser';

class FooterViewScoresToggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      approvedUsers: []
    };
  }

  componentDidMount() {
    approvedUser(this.props.idWorkspace).then(users => this.setState({ approvedUsers: users }));
  }

  componentDidUpdate() {
    approvedUser(this.props.idWorkspace).then(users => this.setState({ approvedUsers: users }));
  }

  showOperatorViewScores() {}

  render() {
    //console.log('PROP NO FOOTER ADD', this.props.idWorkspace)
    var visibility = 'hide';
    if (this.props.menuVisibility) {
      visibility = 'show';
    }

    return (
      <Swipeable onSwipedDown={this.props.handleMouseUp}>
        <div id="flyoutMenu_ViewScores" className={visibility}>
          <h2>Users Scores for</h2>
          <h3>{this.props.workspaceName}</h3>

          <ol className="users__scores__list">
            {this.state.approvedUsers.map(approvedUser => (
              <Fragment key={approvedUser._id}>
                <li className="userScore_Single">
                  {' '}
                  <strong>{approvedUser.name}</strong>: {approvedUser.score}

        
                </li>
              </Fragment>
            ))}
          </ol>

          <a onMouseUp={this.props.handleMouseUp}>
            {' '}
            <img src="./../images/down-white.svg" alt="go down icon" />
          </a>
        </div>
      </Swipeable>
    );
  }
}

export default FooterViewScoresToggle;
