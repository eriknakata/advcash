import getbalances from './get-balances'
import checkCurrency from './check-currency-exchange'
import validateAccount from './validate-account'
import validateAccounts from './validate-accounts'

export default ({ password, apiName, accountEmail, advcashSoapUrl = 'https://wallet.advcash.com/wsm/merchantWebService?wsdl' }) => {
    return {
        getbalances: () => getbalances({ password, apiName, accountEmail, advcashSoapUrl }),

        checkCurrencyExchange: ({ from, to, action, amount }) =>
            checkCurrency({ password, apiName, accountEmail, advcashSoapUrl, from, to, action, amount }),

        validateAccount: ({ email, firstName, lastName }) =>
            validateAccount({ password, apiName, accountEmail, advcashSoapUrl, email, firstName, lastName }),

        validateAccounts: emails => validateAccounts({ password, apiName, accountEmail, advcashSoapUrl, emails })
    }
}