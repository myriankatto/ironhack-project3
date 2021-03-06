import React, { Component, Fragment } from 'react';
import './style.scss';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import onClickOutside from 'react-onclickoutside';

import { userWorkspacesApproved } from './../../services/workspaceUser';

class WorkspacesDropdownMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userWorkspacesApproved: [],
      listOpen: false,
      workspace: this.props.workspace
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

  handleClickOutside() {
    this.setState({
      listOpen: false
    });
  }
  toggleList() {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }));
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
                  <Fragment key={workspace._id}>
                    <Dropdown.Item
                      style={{ color: 'white' }}
                      className="dropdown-item"
                      href={`/dashboard/${workspace._id}`}
                    >
                      <span>{workspace.name}</span>
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
