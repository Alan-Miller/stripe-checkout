const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , stripe = require('stripe')
    , app = module.exports = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(3001, _ => { console.log(`Listening on ${3001}.`)});