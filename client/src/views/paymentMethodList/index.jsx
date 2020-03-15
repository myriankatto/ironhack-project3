import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { list as listPaymentMethods } from '../../services/payment-method';

import { list as listPurchase } from '../../services/purchase';


import { Button, Form, Col } from 'react-bootstrap';




export default class PaymentMethodView extends Component {
  constructor(props){
    super(props);
    this.state = {
      paymentMethods: [],
      listPurchase: []
    };
  };

  async fetchData() {
    const paymentMethods = await listPaymentMethods();
    //const listPurchase = await listPurchase();
    this.setState( paymentMethods);
    
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    
    return (
      <div>
        <h1>Plan - Purchase</h1>

        <h1>Payment Method LIST</h1>
        <Form>
            <Form.Group controlId="cards">

            <fieldset>
              {this.state.paymentMethods.map(card => (
                <Form.Check type="radio" label={card.token} name="formHorizontalRadios"/>
              ))}
            </fieldset>

            </Form.Group>
            <Button variant="primary" type="submit">
              Purchase
            </Button>
        </Form>


        


        
        
        <Link to="/payment-method/create">Add new Payment Method</Link>
      </div>
    )
  }
}
