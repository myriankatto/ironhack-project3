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
    console.log(this.props.user.workspaceApproved);

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

            <h2>
              <Link style={{ color: 'white' }} to={'/editWorkspace'}>
                <img src="./../images/workspaceConfig.svg" alt="go back icon" />
                Edit Workspace
              </Link>
            </h2>

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

            <h2>
              {this.props.user.workspaceApproved.length > 0 ? (
                <Link style={{ color: 'white' }} to={'/listWorkspaceUsers'}>
                  <img src="./../images/list.svg" alt="go back icon" />
                  List of Users
                </Link>
              ) : (
                <Link style={{ color: 'white' }} to={'/'}>
                  <img src="./../images/list.svg" alt="go back icon" />
                  Add Workspace
                </Link>
              )}
            </h2>
            <h2>
              <Link style={{ color: 'white' }} to={'/'}>
                <img src="./../images/share-svgrepo-com.svg" alt="go back icon" />
                Share Workspace
              </Link>
            </h2>
            <h2>
              <Link style={{ color: 'white' }} to={'/'}>
                <img src="./../images/premium-svgrepo-com.svg" alt="go back icon" />
                Upgrade
              </Link>
            </h2>
          </nav>
        </div>
      </Swipeable>
    );
  }
}

export default NavBarToggleWorkspace;
