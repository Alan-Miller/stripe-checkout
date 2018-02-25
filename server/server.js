require('dotenv').config();
const { SERVER_PORT, STRIPE_PRIVATE_KEY } = process.env;
const express = require('express')
    , bodyParser = require('body-parser')
    , stripe = require('stripe')(STRIPE_PRIVATE_KEY);
const { joesPennyFunction } = require('./pennyConverter');
const app = module.exports = express();

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../build`));

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
            else return res.status(200).send(charge);
        }
    );
});

// const path = require('path');
// app.get('*', (req, res) => { res.sendFile(path.join(__dirname, '../build/index.html')); });

app.listen(SERVER_PORT, () => { console.log(`Listening on ${SERVER_PORT}.`) });