import React, { Component } from 'react';

import './style.scss';

class FooterShowScores extends Component {
  render() {
    return (
      <button onMouseUp={this.props.handleMouseUp}>
        <small>Scores</small>
      </button>
    );
  }
}

export default FooterShowScores;
