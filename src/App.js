import React, { Component } from 'react';
import logo from './logo.svg';
import StripeCheckout from 'stripe-checkout';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Stripe Checkout</h1>
        </header>
      </div>
    );
  }
}

export default App;
