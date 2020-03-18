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
          <h3>{this.props.workspaceName}'s Scores</h3>
          <img
            style={{ maxWidth: '70%', margin: '1em auto' }}
            src="./../images/winners.svg"
            alt="winner illustration"
          />

          <ol className="users__scores__list">
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
                    <h5>{approvedUser.name}</h5> <small>{approvedUser.score}</small>
                  </div>
                </li>
              </Fragment>
            ))}
          </ol>

          <a onMouseUp={this.props.handleMouseUp}>
            {' '}
            <img className="down-icon" src="./../images/down-white.svg" alt="go down icon" />
          </a>
        </div>
      </Swipeable>
    );
  }
}

export default FooterViewScoresToggle;
