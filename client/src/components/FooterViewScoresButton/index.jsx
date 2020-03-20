import React, { Component } from 'react';

import './style.scss';

class FooterViewScoresButton extends Component {
  render() {
    return (
      <div className="scores-task">
        <button onMouseUp={this.props.handleMouseUp}>
          <img className="scores-btn" src="./../../../images/score.svg" alt="score" />
        </button>
        <small>Scores</small>
      </div>
    );
  }
}

export default FooterViewScoresButton;
