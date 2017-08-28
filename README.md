[![Build Status](https://travis-ci.org/eriknakata/advcash.svg?branch=master)](https://travis-ci.org/eriknakata/advcash)
[![Code Climate](https://codeclimate.com/github/eriknakata/advcash/badges/gpa.svg)](https://codeclimate.com/github/eriknakata/advcash)
[![Test Coverage](https://codeclimate.com/github/eriknakata/advcash/badges/coverage.svg)](https://codeclimate.com/github/eriknakata/advcash/coverage)
[![dependencies Status](https://david-dm.org/eriknakata/advcash/status.svg)](https://david-dm.org/eriknakata/advcash)

# Advcash

node.js wrapper for [advcash](http://wallet.advcash.com/referral/d3bd61a9-5950-4d1b-8607-ec4c0f7a3576) cryptocurrency exchange

### Documentation

The official documentation can be found [here](https://advcash.com/files/documents/advcash.merchantapi-1.9_en.pdf)

### Prerequisites


- Node 6.0
- Advcash account ([click here](http://wallet.advcash.com/referral/d3bd61a9-5950-4d1b-8607-ec4c0f7a3576) to register)
- Advcash api key


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
  accountEmail: 'email used to create the advcash account'
};

advcash(options).then(function(client) {
  // client is ready
})

```

### checkCurrencyExchange

Getting the currency exchange rate

#### Arguments

| Name     | Type    | Description                                                         |
|----------|---------|---------------------------------------------------------------------|
| from     | String  | [Transfer currencies](#transfer-currencies)                         |
| to       | String  | [Transfer currencies](#transfer-currencies)                         |
| action   | String  | BUY, SELL                                                           |
| amount   | Float   | Transaction amount (accuracy – up to two digits after decimal point)|

```js

var arguments = {
  from: "BTC",
  to: "USD",
  action: "SELL",
  amount: 0.5
};

client.checkCurrencyExchange(arguments).then(function(response) {
  console.log(response)
})

```

> Response

```json

{
  "amountExchanged": 636.32,
  "rate": 1272.63,
  "from": "BTC",
  "to": "USD",
  "action": "SELL",
  "amount": 0.5
}

```

### getBalances

Get Balance per User’s Wallets

```js

client.getBalances().then(function(balances) {
  console.log(balances)
})

```

> Response

```json

[
  {
    "amount": 0.55,
    "id": "U768564323906"
  },
  {
    "amount": 0.80,
    "id": "E527005319826"
  }
]

```

### validateAccount

Checking matching the  first and last name of the user in the Advanced Cash system with the name and last name in a third-party system

```js

var arguments = {
  email: "email@example.com",
  firstName: "First name example",
  lastName: "Last name example"
};

client.validateAccount(arguments).then(function(response) {
  console.log(response)
})

```

> Response

```json

{
  "firstNameMatchingPercentage": 90.55,
  "rate": 55.56
}

```


### validateAccounts

Validation of Account’s Existence

```js

var emails = ['email1@example.com', 'email2@example.com']

client.validateAccounts(emails).then(function(response) {
  console.log(response)
})

```

> Response

```json

[
  {
    "present": false,
    "accountEmail": "email1@example.com"
  },
  {
    "present": true,
    "accountEmail": "email2@example.com"
  }
]

```

### history

Transaction History

#### Arguments

| Name                | Type    | Description                                                         |
|---------------------|---------|---------------------------------------------------------------------|
| from                | Int     | Ordinal number of transaction to start displaying with              |
| count               | Int     | The number of transactions for disiplaying                          |
| sortOrder           | String  | ASC, DESC                                                           |
| startTimeFrom       | Date    | Start date for transactions to be selected                          |
| startTimeTo         | Date    | End date for transactions to be selected                            |
| transactionName     | String  | [Transaction Names](#transaction-names)                             |
| transactionStatus   | String  | [Transaction Statuses](#transaction-statuses)                       |
| walletId            | String  | Wallet                                                              |

```js

var arguments = {
  from: 1,
  count: 5,
  sortOrder: "ASC",
  startTimeFrom: new Date('2017-01-02'),
  startTimeTo: new Date(),
  transactionName: 'CURRENCY_EXCHANGE',
  transactionStatus: 'COMPLETED'
};

client.history(arguments).then(function(response) {
  console.log(response)
})

```

> Response

```json

{ 
  "id": "8d088e53-462c-4eb5-b596-70060db6b66d",
  "activityLevel": 0,
  "amount": 10.24,
  "comment": "",
  "currency": "EUR",
  "direction": "OUTGOING",
  "fullCommission": 0.00,
  "receiverEmail": "receiver@example.com",
  "sci": false,
  "senderEmail": "sender@example.com",
  "startTime": "2017-03-25T19:46:56.843Z",
  "status": "COMPLETED",
  "transactionName": "CURRENCY_EXCHANGE",
  "walletDestId": "U768564448973",
  "walletSrcId": "E5270053223408"
}

```

### validationSendMoney

Validation of Intrasystem Transfer

#### Arguments

| Name                 | Type    | Description                                                           |
|----------------------|---------|-----------------------------------------------------------------------|
| amount               | Float   | Transaction amount (accuracy – up to two digits after decimal point)  |
| currency             | String  | [Transfer currencies](#transfer-currencies)                           |
| email                | String  | Recipient’s email (Required if “walletId” is empty)                   |
| walletId             | String  | Recipient’s wallet (Required if “email” is empty)                     |
| note                 | String  | Note to transaction                                                   |
| savePaymentTemplate  | Boolean | Indicator of saving the current payment template                      |

If the validation of the expected payment is successful, the response from the server will contain a blank message. If the validation is not successful, a message with an error contained in its body will be returned.

```js

var arguments = {
  amount: 0.10,
  currency: "USD",
  email: "example@example.com",
  note: "testing",
  savePaymentTemplate: true
}

client.validationSendMoney(arguments).then(function(response) {
  console.log(response) // null
})
.catch(function(error) {
  console.log(error)
})

```

> Response

```json

null

```

### validationSendMoneyToAdvcashCard

Validation of Funds Transfer to Advanced Cash Card

#### Arguments

| Name                 | Type    | Description                                                                    |
|----------------------|---------|--------------------------------------------------------------------------------|
| amount               | Float   | Transaction amount (accuracy – up to two digits after decimal point)           |
| currency             | String  | [Transfer currencies](#transfer-currencies)                                    |
| email                | String  | Email of the user that owns the card                                           |
| cardType             | String  | [Card type which will be used for the transfer of funds](#advcash-cards-types) |
| note                 | String  | Note to transaction                                                            |
| savePaymentTemplate  | Boolean | Indicator of saving the current payment template                               |

If the validation of the expected payment is successful, the response from the server will contain a blank message. If the validation is not successful, a message with an error contained in its body will be returned.

```js

var arguments = {
  amount: 0.10,
  currency: "USD",
  email: "example@example.com",
  cardType: "PLASTIC",
  note: "testing",
  savePaymentTemplate: true
}

client.validationSendMoneyToAdvcashCard(arguments).then(function(response) {
  console.log(response) // null
})
.catch(function(error) {
  console.log(error)
})

```

> Response

```json

null

```

### validationSendMoneyToEcurrency

Validation of Withdrawal to a third-party payment system

#### Arguments

| Name                 | Type    | Description                                                                    |
|----------------------|---------|--------------------------------------------------------------------------------|
| amount               | Float   | Transaction amount (accuracy – up to two digits after decimal point). Required if ecurrency is not BITCOIN  |
| btcAmount            | Float   | Transaction amount in BTC currency when you need to withdraw exact BTC amount (accuracy – up to six digits after decimal point). Required if ecurrency is BITCOIN   |
| currency             | String  | [Transfer currencies](#transfer-currencies)                                    |
| ecurrency            | String  | [Ecurrencies](#ecurrencies)                                                    |
| receiver             | String  | ID or wallet of the recipient in the third-party payment system                |
| note                 | String  | Note to transaction                                                            |
| savePaymentTemplate  | Boolean | Indicator of saving the current payment template                               |

If the validation of the expected payment is successful, the response from the server will contain a blank message. If the validation is not successful, a message with an error contained in its body will be returned.

```js

var arguments = {
  amount: 1.00,
  currency: "USD",
  ecurrency: "ECOIN",
  receiver: "1dice8EMZmqKvrGE4Qc9bUFf9PX3xaYDp",
  note: "testing",
  savePaymentTemplate: false  
}

client.validationSendMoneyToEcurrency(arguments).then(function(response) {
  console.log(response) // null
})
.catch(function(error) {
  console.log(error)
})

```

> Response

```json

null

```

### findTransaction

Transaction Search by ID

#### Arguments

| Name           | Type    | Description       |
|----------------|---------|-------------------|
| transactionId  | String  | Transaction ID    |

```js

client.findTransaction("e5383553-f66c-4073-b81d-86e7c3756cdb").then(function(response) {
  console.log(response)
})

```

> Response

```json

{ 
  "id": "e5383553-f66c-4073-b81d-86e7c3756cdb",
  "activityLevel": 0,
  "amount": 10.24,
  "comment": "",
  "currency": "EUR",
  "direction": "OUTGOING",
  "fullCommission": 0.00,
  "receiverEmail": "receiver@example.com",
  "sci": false,
  "senderEmail": "sender@example.com",
  "startTime": "2017-03-25T19:46:56.843Z",
  "status": "COMPLETED",
  "transactionName": "INNER_SYSTEM",
  "walletDestId": "U768564448973",
  "walletSrcId": "E5270053223408"
}

```

### currencyExchange

Intrasystem Currency Exchange

#### Arguments

| Name   | Type    | Description                                                           |
|--------|---------|-----------------------------------------------------------------------|
| from   | String  | [Transfer currencies](#transfer-currencies)                           |
| to     | String  | [Transfer currencies](#transfer-currencies)                           |
| action | String  | BUY, SELL                                                             |
| amount | Float   | Transaction amount (accuracy – up to two digits after decimal point)  |
| note   | String  | Note to transaction                                                   |

```js

var arguments = {
  from: "USD",
  to: "EUR",
  action: "SELL",
  amount: 1.00,
  note: "testing"
}

client.currencyExchange(arguments).then(function(transactionId) {
  console.log(transactionId)
})

```

> Response

```json

"1575948b-6ead-426f-8ecf-ee7 aa3969c"

```

### sendMoneyToEmail

Transfer of Funds to Unregistered User via E-mail

#### Arguments

| Name      | Type    | Description                                                           |
|-----------|---------|-----------------------------------------------------------------------|
| currency  | String  | [Transfer currencies](#transfer-currencies)                           |
| email     | String  | E-mail address of the payment recipient unregistered in Advanced Cash system (Immediate after registration in Advanced Cash system, user will receive funds transfer)  |
| amount    | Float   | Transaction amount (accuracy – up to two digits after decimal point)  |
| note      | String  | Note to transaction                                                   |

```js

var arguments = {
  amount: 0.10,
  currency: 'USD',
  email: 'example@example.com',
  note: "testing"
}

client.sendMoneyToEmail(arguments).then(function(transactionId) {
  console.log(transactionId)
})

```

> Response

```json

"1575948b-6ead-426f-8ecf-ee7 aa3969c"

```

### validationCurrencyExchange

Validation of Currency Exchange

#### Arguments

| Name    | Type    | Description                                                            |
|---------|---------|------------------------------------------------------------------------|
| amount  | Float   | Transaction amount (accuracy – up to two digits after decimal point).  |
| from    | String  | [Outgoing currency](#transfer-currencies)                              |
| to      | String  | [Incoming currency](#transfer-currencies)                              |
| action  | String  | SELL, BUY                                                              |
| note    | String  | Note to transaction                                                    |

If the validation of the expected payment is successful, the response from the server will contain a blank message. If the validation is not successful, a message with an error contained in its body will be returned.

```js

var arguments = {
  amount: 1.10,
  from: "USD",
  to: "EUR",
  action: "SELL",
  note: "testing"
}

client.validationCurrencyExchange(arguments).then(function(response) {
  console.log(response) // null
})
.catch(function(error) {
  console.log(error)
})

```

> Response

```json

null

```
### validationSendMoneyToEmail

Validation of Funds Transfer to Unregistered User via E-mail

#### Arguments

| Name    | Type    | Description                                                             |
|--------- |---------|------------------------------------------------------------------------|
| amount   | Float   | Transaction amount (accuracy – up to two digits after decimal point).  |
| currency | String  | [Transaction currency](#transfer-currencies)                           |
| email    | String  | E-mail address of the payment recipient unregistered in Advanced Cash system (Immediately after registration in Advanced Cash system, user will receive funds transfer) |
| note     | String  | Note to transaction                                                    |

If the validation of the expected payment is successful, the response from the server will contain a blank message. If the validation is not successful, a message with an error contained in its body will be returned.

```js

var arguments = {
  amount: 1.10,
  currency: "USD",
  email: "testing@testing.com",
  note: "testing"
}

client.validationSendMoneyToEmail(arguments).then(function(response) {
  console.log(response) // null
})
.catch(function(error) {
  console.log(error)
})

```

> Response

```json
null
```

### sendMoney

Intrasystem Payment

#### Arguments

| Name                 | Type    | Description                                                           |
|----------------------|---------|-----------------------------------------------------------------------|
| amount               | Float   | Transaction amount (accuracy – up to two digits after decimal point)  |
| currency             | String  | [Transfer currencies](#transfer-currencies)                           |
| email                | String  | Recipient’s email (Required if “walletId” is empty)                   |
| walletId             | String  | Recipient’s wallet (Required if “email” is empty)                     |
| note                 | String  | Note to transaction                                                   |
| savePaymentTemplate  | Boolean | Indicator of saving the current payment template                      |

```js
var arguments = client.sendMoney({
  amount: 10.50,
  currency: "USD",
  email: "sample@sample.com",
  note: "testing",
  savePaymentTemplate: true
})

client.sendMoney(arguments).then(function(response) {
  console.log(response) // null
})
```

> Response

```json
"1575948b-6ead-426f-8ecf-ee7 aa3969c"
```

### sendMoneyToAdvcashCard

Transfer of Funds to Advanced Cash Card

#### Arguments

| Name                 | Type    | Description                                                                    |
|----------------------|---------|--------------------------------------------------------------------------------|
| amount               | Float   | Transaction amount (accuracy – up to two digits after decimal point)           |
| currency             | String  | [Transfer currencies](#transfer-currencies)                                    |
| email                | String  | Email of the user that owns the card                                           |
| cardType             | String  | [Card type which will be used for the transfer of funds](#advcash-cards-types) |
| note                 | String  | Note to transaction                                                            |
| savePaymentTemplate  | Boolean | Indicator of saving the current payment template                               |

```js

var arguments = {
  amount: 5.00,
  currency: "USD",
  email: "sample@sample.com",
  cardType: "PLASTIC",
  note: "testing",
  savePaymentTemplate: true
}

client.sendMoneyToAdvcashCard(arguments).then(function(response) {
  console.log(response)
})

```

> Response

```json

"1575948b-6ead-426f-8ecf-ee7 aa3969c"

```

### validationSendMoneyToBankCard

Validation of Funds Transfer to External Card Not Tied to System

#### Arguments

| Name                 | Type    | Description                                                                             |
|----------------------|---------|-----------------------------------------------------------------------------------------|
| amount               | Float   | Transaction amount (accuracy – up to two digits after decimal point)                    |
| currency             | String  | [Transfer currencies](#transfer-currencies)                                             |
| cardNumber           | String  | External card number for finds withdrawal                                               |
| expiryMonth          | String  | Two digits that signify the month of the card’s expiration date (e.g. 09 for September) |
| expiryYear           | String  | Two last digits of the year of the card’s expiration date (e.g. 17 for year 2017)       |
| note                 | String  | Note to transaction                                                                     |
| savePaymentTemplate  | Boolean | Indicator of saving the current payment template                                        |

If the validation of the expected payment is successful, the response from the server will contain a blank message. If the validation is not successful, a message with an error contained in its body will be returned.

```js

var arguments = {
  amount: 4.00,
  currency: "USD",
  cardNumber: "4532881212776308",
  expiryMonth: "12",
  expiryYear: "18",
  note: "testing",
  savePaymentTemplate: false
}

client.validationSendMoneyToBankCard(arguments).then(function(response) {
  console.log(response)
})

```

> Response

```json

null

```

### sendMoneyToBankCard

Transfer of Funds to External Bank Card

#### Arguments

| Name                 | Type    | Description                                                                             |
|----------------------|---------|-----------------------------------------------------------------------------------------|
| amount               | Float   | Transaction amount (accuracy – up to two digits after decimal point)                    |
| currency             | String  | [Transfer currencies](#transfer-currencies)                                             |
| cardNumber           | String  | External card number for finds withdrawal                                               |
| expiryMonth          | String  | Two digits that signify the month of the card’s expiration date (e.g. 09 for September) |
| expiryYear           | String  | Two last digits of the year of the card’s expiration date (e.g. 17 for year 2017)       |
| note                 | String  | Note to transaction                                                                     |
| savePaymentTemplate  | Boolean | Indicator of saving the current payment template                                        |

```js

var arguments = {
  amount: 4.00,
  currency: "USD",
  cardNumber: "4532881212776308",
  expiryMonth: "12",
  expiryYear: "18",
  note: "testing",
  savePaymentTemplate: false
}

client.sendMoneyToBankCard(arguments).then(function(response) {
  console.log(response)
})

```

> Response

```json

"20931ce4-f4c9-4cc5-84f7-f7efb38c939c"

```

### sendMoneyToEcurrency

Withdrawal to a third-party payment system

#### Arguments

| Name                 | Type    | Description                                                                             |
|----------------------|---------|-----------------------------------------------------------------------------------------|
| amount               | Float   | Transaction amount (accuracy – up to two digits after decimal point)                    |
| btcAmount            | Float   | Transaction amount in BTC currency when you need to withdraw exact BTC amount (accuracy – up to six digits after decimal point)                    |
| currency             | String  | [Transfer currencies](#transfer-currencies)                                             |
| ecurrency            | String  | [Ecurrencies](#ecurrencies)                                                             |
| cardNumber           | String  | External card number for finds withdrawal                                               |
| receiver             | String  | ID or wallet of the recipient in the third-party payment system                         |
| note                 | String  | Note to transaction                                                                     |
| savePaymentTemplate  | Boolean | Indicator of saving the current payment template                                        |

```js

var arguments = {
  amount: 1.00,
  currency: "USD",
  ecurrency: "ECOIN",
  receiver: address,
  note: "testing",
  savePaymentTemplate: false
}

client.sendMoneyToEcurrency(arguments).then(function(response) {
  console.log(response)
})

```

> Response

```json

"d28a6da7-451d-41c4-93f8-cd0084c72f96"

```

### createBitcoinInvoice

Creating bitcoin invoice

#### Arguments

| Name                 | Type    | Description                                                                             |
|----------------------|---------|-----------------------------------------------------------------------------------------|
| amount               | Float   | Transaction amount (accuracy – up to two digits after decimal point)                    |
| currency             | String  | [Transfer currencies](#transfer-currencies)                                             |
| sciName              | String  | Shopping Cart Interface name (optional parameter)                                       |
| orderId              | String  | Id of the order (optional parameter)                                                    |
| note                 | String  | Note to transaction (optional parameter)                                                |

```js

var arguments = {
  amount: 1.0,
  currency: "USD"
}

client.createBitcoinInvoice(arguments).then(function(response) {
  console.log(response)
})

```

> Response

```json

{ 
  "bitcoinAddress": "1C8jQAkHwE87bTmyDXSKdNyf8B8MnGYhpp",
  "bitcoinAmount": 0.001388,
  "amount": 1.00,
  "currency": "USD",
  "sciName": "sci_name",
  "orderId": "12345",
  "note": "Some note"
}

```

### register

Register a new user

#### Arguments

| Name                 | Type    | Description        |
|----------------------|---------|--------------------|
| email                | String  | User's email       |
| firstName            | String  | User's first name  |
| lastName             | String  | User's last name   |
| language             | String  | en, ru             |

If the registration of the user is successful, the response from the server will contain a blank message. If the registration is not successful, a message with an error contained in its body will be returned.

```js

var arguments = {
  email: "test@test.com",
  firstName: "First name",
  lastName: "Last name",
  language: "en"
}

client.register(arguments).then(function(response) {
  console.log(response)
})

```

> Response

```json

null

```

### sendMoneyToExmo

Withdrawal to EXMO

#### Arguments

| Name                 | Type    | Description                                                                             |
|----------------------|---------|-----------------------------------------------------------------------------------------|
| amount               | Float   | Transaction amount (accuracy – up to two digits after decimal point)                    |
| currency             | String  | [Transfer currencies](#transfer-currencies)                                             |
| note                 | String  | Note to transaction (optional parameter)                                                |

```js

var arguments = {
  amount: 1.10,
  currency: "USD",
  note: "testing"
}

client.sendMoneyToExmo(arguments).then(function(response) {
  console.log(response)
})
.catch(function(error) {
  console.log(error)
})

```

> Response

```json

{
  "id": "d28a6da7-451d-41c4-93f8-cd0084c72f96",
  "coupon": "EX-CODE_22562_USD1d7f906bd79cb8e13200aa55c227a2fe9328bf17"
}

```

### validationSendMoneyToBtcE

Validation of Withdrawal to BTC-E

#### Arguments

| Name                 | Type    | Description                                                                             |
|----------------------|---------|-----------------------------------------------------------------------------------------|
| amount               | Float   | Transaction amount (accuracy – up to two digits after decimal point)                    |
| currency             | String  | [Transfer currencies](#transfer-currencies)                                             |
| note                 | String  | Note to transaction (optional parameter)                                                |

If the validation of the expected payment is successful, the response from the server will contain a blank message. If the validation is not successful, a message with an error contained in its body will be returned.

```js

var arguments = {
  amount: 1.10,
  currency: "USD",
  note: "testing"
}

client.validationSendMoneyToBtcE(arguments).then(function(response) {
  console.log(response) // null
})
.catch(function(error) {
  console.log(error)
})
```

> Response

```json

null

```

### validationSendMoneyToExmo

Validation of Withdrawal to EXMO

#### Arguments

| Name                 | Type    | Description                                                                             |
|----------------------|---------|-----------------------------------------------------------------------------------------|
| amount               | Float   | Transaction amount (accuracy – up to two digits after decimal point)                    |
| currency             | String  | [Transfer currencies](#transfer-currencies)                                             |
| note                 | String  | Note to transaction (optional parameter)                                                |

If the validation of the expected payment is successful, the response from the server will contain a blank message. If the validation is not successful, a message with an error contained in its body will be returned.

```js

var arguments = {
  amount: 1.10,
  currency: "USD",
  note: "testing"
}

client.validationSendMoneyToExmo(arguments).then(function(response) {
  console.log(response) // null
})
.catch(function(error) {
  console.log(error)
})

```

> Response

```json

null

```

### sendMoneyToBtcE

Withdrawal to BTC-E

#### Arguments

| Name                 | Type    | Description                                                                             |
|----------------------|---------|-----------------------------------------------------------------------------------------|
| amount               | Float   | Transaction amount (accuracy – up to two digits after decimal point)                    |
| currency             | String  | [Transfer currencies](#transfer-currencies)                                             |
| note                 | String  | Note to transaction (optional parameter)                                                |

```js

var arguments = {
  amount: 1.10,
  currency: "USD",
  note: "testing"
}

client.sendMoneyToBtcE(arguments).then(function(response) {
  console.log(response)
})
.catch(function(error) {
  console.log(error)
})
```

> Response

```json

{
  "id": "d28a6da7-451d-41c4-93f8-cd0084c72f96",
  "coupon": "EX-CODE_22562_USD1d7f906bd79cb8e13200aa55c227a2fe9328bf17"
}

```


### Transaction Statuses

| Value      | Description                        |
|------------|------------------------------------|
| PENDING    | Transaction processing is pending  |
| PROCESS    | Transaction is being processed     |
| COMPLETED  | Transaction is completed           |
| CANCELED   | Transaction is cancelled           |
| CONFIRMED  | Transaction is confirmed           |

### Transaction Names

| Value                       | Description                                |
|-----------------------------|--------------------------------------------|
| ALL                         | All transactions regardless of their type  |
| CHECK_DEPOSIT               | Funds deposit by bank check                |
| WIRE_TRANSFER_DEPOSIT       | Funds deposit from bank account            |
| WIRE_TRANSFER_WITHDRAW      | Funds withdrawal to bank account           |
| INNER_SYSTEM                | Intrasystem funds transfer                 |
| CURRENCY_EXCHANGE           | Currency exchange within account           |
| BANK_CARD_TRANSFER          | Funds withdrawal to external bank card     |
| ADVCASH_CARD_TRANSFER       | Funds transfer to Advanced Cash card       |
| EXTERNAL_SYSTEM_DEPOSIT     | Deposit funds through third-party system   |
| EXTERNAL_SYSTEM_WITHDRAWAL  | Withdrawal through third-party system      |
| REPAYMENT                   | Funds repayment                            |

### Transfer Currencies

| Value | Description        |
|-------|--------------------|
| USD   | US Dollar          |
| EUR   | Euro               |
| RUR   | Russian Rouble     |
| GBP   | Pound Sterling     |
| UAH   | Ukrainian Hryvnia  |
| BTC   | Bitcoin            |

### ADVCash cards Types

| Value    | Description        |
|----------|--------------------|
| VIRTUAL  | Virtual card       |
| PLASTIC  | Plastic card       |

### Ecurrencies

| Value          | Description                   |
|----------------|-------------------------------|
| BITCOIN        | Withdrawal to BTC             |
| CAPITALIST     | Capitalist payment system     |
| ECOIN          | Ecoin payment system          |
| OKPAY          | OkPay payment system          |
| PAXUM          | Paxum payment system          |
| PAYEER         | Payeer payment system         |
| PERFECT_MONEY  | Perfect Money payment system  |
| WEB_MONEY      | WebMoney payment system       |
| QIWI           | QIWI payment system           |
| YANDEX_MONEY   | Yandex.Money payment system   |


## Contributing

- Erik Nakata
- Leonardo Cadastro

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
