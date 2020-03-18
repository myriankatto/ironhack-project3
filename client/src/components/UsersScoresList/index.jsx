import React, { Component, Fragment } from 'react';

class UsersScoresList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      approvedUsers: this.props.approvedUsers
    };

    console.log(this.props.approvedUsers);
  }

  render() {
    return (
      <div>
        <h3>List of users and scores</h3>

        {this.state.approvedUsers.map(approvedUser => (
          <Fragment key={approvedUser._id}>
            <span>{approvedUser.name}</span> <span>{approvedUser.score}</span>
          </Fragment>
        ))}
      </div>
    );
  }
}
export default UsersScoresList;
