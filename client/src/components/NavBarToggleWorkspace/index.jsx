//it is the pink menu
import './style.scss';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useSwipeable, Swipeable } from 'react-swipeable';
import { editWorkspace } from './../../services/workspaceUser';
import { Accordion, Card, Button } from 'react-bootstrap';

//import ApproveTasks from '../ApproveTasks';

class NavBarToggleWorkspace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workspace: []
    };
  }

  showOperatorWorkSpace() {}

  render() {
    var visibility = 'hide';

    if (this.props.menuVisibility) {
      visibility = 'show';
    }

    return (
      <Swipeable onSwipedLeft={this.props.handleMouseDown}>
        <div id="flyoutMenu" className={visibility}>
          <nav className="buttonPlusMenu">
            <a href="#" onMouseDown={this.props.handleMouseDown}>
              <img
                style={{
                  width: '2em',
                  float: 'left',
                  position: 'relative',
                  margin: '2em 1em'
                }}
                src="./../images/left-white.svg"
                alt="go back icon"
              />
            </a>
            <div className="menu-item">
              <Link style={{ color: 'white' }} to={'/editWorkspace'}>
                <img
                  className="menu-icon"
                  src="./../images/config.svg"
                  alt="configuration"
                />
                <span>Workspace Configuration</span>
              </Link>
            </div>
            {/* ESSA PARTE ENTRA COM O WORKSPACE CONFIG */}
            {/* PARTE PARA APROVAR TASKS: */}
            {/* <h2>
              <img src="./../images/workspaceConfig.svg" alt="go back icon" />
                <Accordion defaultActiveKey="0">
                  <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        Pending Tasks
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <ApproveTasks 
                          idWorkspace={this.props.idWorkspace}
                          user={this.props.user}
                          workspaceOperator={this.props.workspaceOperator}
                        />
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
            </h2>    */}
            {/*FINAL PARTE PARA APROVAR TASKS */}
            <div className="menu-item">
              <Link style={{ color: 'white' }} to={'/listWorkspaceUsers'}>
                <img className="menu-icon" src="./../images/list-white.svg" alt="list" />
                <span>List of Users</span>
              </Link>
            </div>
            <div className="menu-item">
              <Link style={{ color: 'white' }} to={'/'}>
                <img className="menu-icon" src="./../images/share-white.svg" alt="share" />
                <span>Share Workspace</span>
              </Link>
            </div>

            <div className="menu-item">
              <Link style={{ color: 'white' }} to={'/'}>
                <img
                  className="menu-icon"
                  style={{width:"2.2em"}}
                  src="./../images/reward.svg"
                  alt="upgrade"
                />
                <span>Upgrade</span>
              </Link>
            </div>
          </nav>
        </div>
      </Swipeable>
    );
  }
}

export default NavBarToggleWorkspace;
