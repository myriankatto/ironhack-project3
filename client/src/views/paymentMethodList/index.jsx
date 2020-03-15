import React, { Component } from 'react';

import { list as listPaymentMethods } from '../../services/payment-method';


export default class PaymentMethodView extends Component {
  constructor(props){
    super(props);
    this.state = {
      paymentMethods: []
    };
  };

  async fetchData() {
    const paymentMethods = await listPaymentMethods();
    this.setState({ paymentMethods });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div>
        <h1>Payment Method LIST</h1>
      </div>
    )
  }
}
