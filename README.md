# Stripe Checkout
## Overview
Example of Stripe Checkout (simple) in React based on [Joe Blank's repo](https://github.com/joeblank/react-stripe).
Tech: React and Stripe Checkout.

<details>
<summary>Summary of how it works</summary>

* Pay With Card button opens form, which gets token back from Stripe. Token can be console logged.
* When the token arrives, a POST request is sent with the token id to the server to make a charge, and a response comes back (if it is an error, the charge failed).
* Summary of Stripe process:
  * User clicks button and completes form.
  * Stripe receives payment information securely.
  * Stripe sends back token to app.
  * Token contains email and other information.
  * Token is stripped of credit card information and send to app server via POST request.
</details>
<br/>

## Install Stripe
- Install `stripe` and `react-stripe-checkout` along with the other dependencies needed for our Express server and .env files.
  ```sh
  npm install stripe react-stripe-checkout
  ```

## Sign up for Stripe account
- The account is free. If you are just testing, do not activate the account. You can test payments with the test credit card number: 4242-4242-4242-4242.
- In the API settings, copy both the Publishable Key and the Secret Key.

## Protect your keys
- Store the Publishable Key and the Secret Key in a file that is .gitignored, like a .env file or a config.js file.
- React only allows environment variables that start with REACT_APP_. Our Publishable Key will be used in our React front end, so name it something like REACT_APP_STRIPE_PUBLIC_KEY.
- The Secret Key will be used on the back end, so it does not need REACT_APP_. I named it STRIPE_PRIVATE_KEY.

## Import and render Stripe Checkout
- Import `react-stripe-checkout`: 
  ```js
  import StripeCheckout from 'react-stripe-checkout';
  ```
- Render the component. 
  - In the `stripeKey` prop, pass in the Publishable Key stored in the .env file.
  - Pass in a charge amount to the `amount` prop. In the App.js file, we are passing in 999 cents ($9.99) every time, but the example below shows how you might store the amount in a variable which you then pass in.
  - In the `token` prop, pass in a method that will be called when the used click the Pay button. This method will accept a token from Stripe and the post a payment.
  ```js
  <StripeCheckout
    token={this.onToken}
    stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
    amount={this.state.amount}
  />
  ```

## Write the POST method
- Write a method to accept a token from Stripe.
- Use axios to make a POST request to our server, passing back the token and the payment amount in the request body.
- Notice the two console.logs here. When the user clicks the button and enters information for a payment, two logs should appear in the console. The first is the token created after the used finished with the Stripe form. The second log appears a few moments later after the charge is approved; this charge is logged in the console when it gets back from our server.
  ```js
  onToken = token => {
    console.log('token', token);
    token.card = void 0;
    const { amount } = this.state
    axios.post('/api/payment', { token, amount })
      .then(charge => { console.log('charge response', charge.data) }););
  }
  ```

## Require Stripe in the server
- Require Stripe and invoke it with your Secret Key.
  ```js
  const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
  ```

## Write the POST endpoint function
- In the function, you may need to convert the amount from the request body using something like the penny converter function used in this sample app.
- Invoke Stripe's .create() method to create a charge, passing in a configuration objection with `amount`, `currency`, `source`, and `description` properties.
- The `source` property takes the `id` value on the token we sent in the request body.
- The .create() method takes a callback. Handle the error parameter.
- This example sends the entire charge back to the front, where our app logs it to the console.

  ```js
  app.post('/api/payment', (req, res, next) => {
      const amountArray = req.body.amount.toString().split('');
      const convertedAmt = joesPennyFunction(amountArray);
      const charge = stripe.charges.create(
          {
              amount: convertedAmt,
              currency: 'usd',
              source: req.body.token.id,
              description: 'Stripe Checkout test charge'
          },
          function(err, charge) {
              if (err) return res.sendStatus(500);
              else return res.sendStatus(200);
          }
      );
  });
  ```

  Stripe Checkout docs: https://www.npmjs.com/package/react-stripe-checkout

  NPM docs for `react-stripe-checkout`: https://www.npmjs.com/package/react-stripe-checkout