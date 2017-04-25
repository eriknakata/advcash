[![Build Status](https://travis-ci.org/eriknakata/advcash.svg?branch=master)](https://travis-ci.org/eriknakata/advcash)
[![Code Climate](https://codeclimate.com/github/eriknakata/advcash/badges/gpa.svg)](https://codeclimate.com/github/eriknakata/advcash)
[![Test Coverage](https://codeclimate.com/github/eriknakata/advcash/badges/coverage.svg)](https://codeclimate.com/github/eriknakata/advcash/coverage)
[![dependencies Status](https://david-dm.org/eriknakata/advcash/status.svg)](https://david-dm.org/eriknakata/advcash)

# Advcash

node.js wrapper for [advcash](http://wallet.advcash.com/referral/d3bd61a9-5950-4d1b-8607-ec4c0f7a3576) cryptocurrency exchange

### Documentation

The official documentation can be found [here](https://advcash.com/files/documents/advcash.merchantapi-1.9_en.pdf)

### Prerequisites

```
Node 6.0
Advcash account
Advcash api key
```

### Installing

```
npm install --save advcash
```

## Examples

All methods returns a promise as result

### client

```js
var advcash = require('advcash');

var options = {
  password: 'password created previously',
  apiName: 'api created previously',
  email: 'email used to create the advcash account'
};

advcash(options).then(function(client) {
  // client is ready
})

```

### checkCurrencyExchange

Getting the currency exchange rate

```js

var params = {
  from: "BTC",
  to: "USD",
  action: "SELL",
  amount: 1.0
};

client.checkCurrencyExchange(params).then(function(response) {
  console.log(response)
})

```

### getBalances

Get Balance per User’s Wallets

```js

client.getBalances().then(function(balances) {
  console.log(balances)
})

```

### validateAccount

Checking matching the  first and last name of the user in the Advanced Cash system with the name and last name in a third-party system

```js

var params = {
  email: "email@example.com",
  firstName: "First name example",
  lastName: "Last name example"
};

client.validateAccount(params).then(function(response) {
  console.log(response)
})

```

### validateAccounts

Validation of Account’s Existence

```js

var emails = ['email1@example.com', 'email2@example.com']

client.validateAccounts(emails).then(function(response) {
  console.log(response)
})

```


## Contributing

- Erik Nakata
- Leonardo Cadastro

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
