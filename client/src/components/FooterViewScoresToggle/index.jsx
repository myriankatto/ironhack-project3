import './style.scss';
import React, { Component } from 'react';
import { Swipeable } from 'react-swipeable';

class FooterViewScoresToggle extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
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
