import React, { Component } from 'react';
import {  Swipeable } from 'react-swipeable';
import QRCode from 'qrcode.react';
<<<<<<< HEAD
import {Link} from 'react-router-dom'
=======
import './style.scss';

import ShareByEmail from './../../components/ShareByEmail';
>>>>>>> 474acdbf87e1957fd4b2ce9ee41a2caca3d1159a

import { editWorkspace } from './../../services/workspaceUser';

class ShareWorkspace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workspaces: [],
      qrCode: '',
      emailToggle: false
    };
    this.handleSwipeLeft = this.handleSwipeLeft.bind(this);
    this.handleEmailToggle = this.handleEmailToggle.bind(this);
  }

  componentDidMount() {
    editWorkspace(this.props.user._id, this.props.workspaceId).then(workspaces =>
      this.setState({ workspaces })
    );
  }

  handleSwipeLeft() {
    return this.props.history.push('./dashboard');
  }

  handleEmailToggle() {
    this.setState({
      emailToggle: !this.state.emailToggle
    });
  }

  render() {
    return (
      <Swipeable onSwipedRight={this.handleSwipeLeft}>
        <nav className="navPlusMenu">
          <Link to="#" onMouseDown={this.handleSwipeLeft}>
            <img src="./../images/left-white.svg" alt="go back icon" />
          </Link>
          <h2>Share Workspace</h2>
        </nav>
        <div className="shareMenu">
          {this.state.workspaces.map(workspace => (
            <div className="workspaceShare" key={workspace._id}>
              <h3>{workspace.name}</h3>
              <QRCode
                value={`https://ironhack-project3-teste.herokuapp.com/forWorkspaceApproval/${workspace._id}`}
              />
              <article>
                <a
                  href={`https://api.whatsapp.com/send?text=Please follow the link: https://ironhack-project3-teste.herokuapp.com/forWorkspaceApproval/${workspace._id} to join the ${workspace.names} workspace`}
                  target="_blank"
                >
                  <img
                    src="./../images/IcWhatsApp.svg"
                    width="35"
                    height="35"
                    border="0"
                    alt="Recomende este produto pelo WhatsApp"
                  />
                </a>
                <a href={`#`} onClick={this.handleEmailToggle}>
                  <img
                    src="./../images/envelope-email.png"
                    width="35"
                    height="35"
                    border="0"
                    alt="Recomende este produto pelo WhatsApp"
                  />
                </a>
              </article>
              {this.state.emailToggle && <ShareByEmail workspace={workspace} />}
            </div>
          ))}
          <h1>{this.state.qrCode}</h1>
        </div>
      </Swipeable>
    );
  }
}

export default ShareWorkspace;
