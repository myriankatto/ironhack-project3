import './style.scss';
import React, { Component } from 'react';
import { useSwipeable, Swipeable } from 'react-swipeable';
import QRCode from 'qrcode.react';

import { editWorkspace } from './../../services/workspaceUser';

class ShareWorkspace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workspaces: [],
      qrCode: ''
    };
    this.handleSwipeLeft = this.handleSwipeLeft.bind(this);
  }

  componentDidMount() {
    editWorkspace(this.props.user._id).then(workspaces => this.setState({ workspaces }));
  }

  handleSwipeLeft() {
    return this.props.history.push('./dashboard');
  }

  render() {
    return (
      <Swipeable onSwipedRight={this.handleSwipeLeft}>
        <nav className="navPlusMenu">
          <a href="#" onMouseDown={this.handleSwipeLeft}>
            <img src="./../images/left-white.svg" alt="go back icon" />
          </a>
          <h2>Share Workspace</h2>
        </nav>

        {this.state.workspaces.map(workspace => (
          <div className="workspaceSettings" key={workspace._id}>
            <h3>{workspace.name}</h3>
            <QRCode value={`http://192.168.1.64:3000/forWorkspaceApproval/${workspace._id}`} />
            <a
              href={`https://api.whatsapp.com/send?text=Please follow the link: http://www.localhost:3000/forWorkspaceApproval/${workspace._id} to join the ${workspace.names} workspace`}
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
          </div>
        ))}
        <h1>{this.state.qrCode}</h1>
      </Swipeable>
    );
  }
}

export default ShareWorkspace;
