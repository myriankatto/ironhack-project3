import React, { Component } from 'react';
import {Accordion, Card, Button } from 'react-bootstrap';

import './style.scss';

export default class ItemTask extends Component {
  constructor(props){
    super(props);
    this.state={
      active: false,
    };

    this.toogleWorkspace = this.toogleWorkspace.bind(this);
  };

  toogleWorkspace() {
    this.setState(previousState => ({
      active: !previousState.active
    }));
  };


  render() {
    return (
      <Card className="cardTask border border-secondary rounded-pill" onClick={this.toogleWorkspace}>
        <Accordion.Toggle as={Button} variant="link" eventKey={this.props.toggle}>
            {this.props.name}

            {this.state.active ? 
              <img className="arrow-icon" src="./../images/down.svg" alt="down icon" /> :
              <img className="arrow-icon" src="./../images/up.svg" alt="down icon" /> }
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={this.props.toggle}>
          <Card.Body>{this.props.name}</Card.Body>
        </Accordion.Collapse>
      </Card>
    )
  }
}
