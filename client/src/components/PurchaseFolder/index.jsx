import React, { Component } from 'react';

import { list as listPurchase } from '../../services/purchase';


export default class PurchaseItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      listPurchase: []
    };
  };

  // async fetchData() {
  //   //const paymentMethods = await listPaymentMethods();
  //   const listPurchase = await listPurchase();
  //   this.setState( listPurchase );
  // }

  // componentDidMount() {
  //   this.fetchData();
  // }

  render() {
    
    return (
      <div>
        <h1>Plan - Purchase</h1>
        
      </div>
    )
  }
}
