import React, { Component } from 'react';
import pants from './imgs/pants.png';
import shirt from './imgs/shirt.png';
import pantsW from './imgs/pants-w.png';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import './App.css';
const stripePublicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

class App extends Component {

  constructor() {
    super()
    this.state = {
      amount: 0,
      product: ''
    }
  }

  onToken = token => {
    console.log('token', token);
    token.card = void 0;
    const amount = this.state.amount;
    axios.post('/api/payment', { token: token, amount: amount })
      .then(charge => { console.log('charge', charge.data) });
  }

  render() {
    return (
      <div className="App">
        <header className="header">
          <img src={pantsW} className="logo" alt="logo" />
          <h1 className="welcome">Stripe Checkout</h1>
        </header>


        <div className="products">{/* BUY MY PANTS */}

          <div className="pants" 
            style={{ backgroundImage: `url(${pants})` }}
            onClick={() => this.setState({ amount: 1700, product: 'Pants' })}>
            <span>Pants: $24</span>
          </div>

          <div className="shirt"
            style={{ backgroundImage: `url(${shirt})` }}
            onClick={() => this.setState({ amount: 1000, product: 'Shirt' })}>
            <span>Shirt: $11</span>
          </div>

        </div>

        {
          !this.state.amount || !this.state.product
            ? null
            : <StripeCheckout
              token={this.onToken} // Token from Stripe used for charge
              stripeKey={stripePublicKey} // Public key
              label={`Pay for ${this.state.product}`} // Main button text
              panelLabel="Charge Me" // Panel button text
              zipCode={false} // Collect zip code
              billingAddress={false} // Collect billing address
              amount={this.state.amount} // Amount shown to user on panel
            />
        }
      </div>
    );
  }
}

export default App;
