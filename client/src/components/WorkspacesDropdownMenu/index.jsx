import React, { Component, Fragment } from 'react';

import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { userWorkspacesApproved } from './../../services/workspaceUser';

class WorkspacesDropdownMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userWorkspacesApproved: []
    };
  }

  componentDidMount() {
    userWorkspacesApproved(this.props.user._id)
      .then(userWorkspacesApproved => {
        this.setState({
          userWorkspacesApproved
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    // if (this.state.userWorkspacesApproved[0] !== undefined) {
    //   console.log(this.state.userWorkspacesApproved[0].workspaceApproved);
    // }

    return (
      <div>
        <Dropdown>
          <Dropdown.Toggle
            style={{
              backgroundColor: '#544bd8ee',
              color: 'white',
              border: 'none'
            }}
            variant="secondary"
            id="dropdown-basic"
          >
            {this.props.workspace.name}
          </Dropdown.Toggle>
          <Dropdown.Menu
            style={{
              backgroundColor: '#544bd8ee',
              border: 'none'
            }}
          >
            {this.state.userWorkspacesApproved.map(workspaceApproved => (
              <span key={workspaceApproved._id}>
                {workspaceApproved.workspaceApproved.map(workspace => (
                  <Fragment>
                    <Dropdown.Item
                      style={{ color: 'white' }}
                      key={workspace._id}
                      href={`#`}
                    >
                      <Link to={`/dashboard/${workspace._id}`}>{workspace.name}</Link>
                    </Dropdown.Item>
                  </Fragment>
                ))}
              </span>
            ))}

            <Dropdown.Divider />
            <Dropdown.Item
              style={{
                backgroundColor: '#544bd8ee',
                color: 'white',
                border: 'none'
              }}
              href="/dashboard"
            >
              {' '}
              Add Workspace
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}

export default WorkspacesDropdownMenu;
