Example of Stripe Checkout (simple) in React. Based on [Joe Blank's repo](https://github.com/joeblank/react-stripe).
Contains some extra notes in the comments taken from Joe's explanation of the process.

<details>
<summary>Details</summary>

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

Tech:
* React
* Stripe Checkout
