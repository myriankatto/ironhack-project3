import React, { Component } from 'react';


//import { create as paymentMethodCreate } from '../../services/payment-method';


import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/payment-method'
});


class PaymentMethodView extends Component {
  constructor(props){
    super(props);
    this.state = {
      token: '',
      expirationDateYear:'',
      expirationDateMonth:''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
  }


  handleInputChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  
  handleFormSubmission(event) {
    event.preventDefault();

    instance.post("/create", { 
      token:this.state.token,
      expirationDateYear: this.state.expirationDateYear,
      expirationDateMonth: this.state.expirationDateMonth 
    });

    this.props.history.push('/payment-method/list');

    
  }

  render() {
    
    return (
      <div>
       <form onSubmit={this.handleFormSubmission}>

        <input type="Number" 
        placeholder="Numero do cartão"
        name="token"
        value={this.state.token}
        onChange={this.handleInputChange}/>

        <input type="Number" 
        placeholder="expirationDateYear"
        name="expirationDateYear"
        value={this.state.expirationDateYear}
        onChange={this.handleInputChange}/>

        <input type="number" 
        placeholder="expirationDateMonth" 
        name="expirationDateMonth"
        value={this.state.expirationDateMonth}
        onChange={this.handleInputChange}/>

        
        <button>Add card</button>
      </form>
      </div>
    );
  }
}

export default PaymentMethodView;
