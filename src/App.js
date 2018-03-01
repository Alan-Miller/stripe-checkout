import React, { Component } from 'react';
import logo from './logo.svg';
import BuyMyPants from 'react-stripe-checkout';
import axios from 'axios';
import './App.css';
const stripePublicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

class App extends Component {

  constructor() {
    super()
    this.state = {
      amount: 0
    }
  }

  myTokenFunction = token => {
    console.log('token', token);
    token.card = void 0;
    const amount = this.state.amount;
    axios.post('/api/payment', { token: token, amount: amount })
      .then(charge => { console.log('charge response', charge.data) });
  }

  render() {
    return (
      <div className="App">
        <header className="header">
          <img src={logo} className="logo" alt="logo" />
          <h1 className="welcome">Welcome to Stripe Checkout</h1>
        </header>

        <BuyMyPants
          token={this.myTokenFunction}
          stripeKey={stripePublicKey}
          amount={this.state.amount}
        />
        <button onClick={() => this.setState({ amount: 1000 })}>Shirt: $10</button>
        <button onClick={() => this.setState({ amount: 1700 })}>Pants: $17</button>

      </div>
    );
  }
}

export default App;
