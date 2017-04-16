import getbalances from './get-balances'
import checkCurrency from './check-currency-exchange'

export default ({ password, apiName, accountEmail, advcashSoapUrl = 'https://wallet.advcash.com/wsm/merchantWebService?wsdl' }) => {
    return {
        getbalances: () => getbalances({ password, apiName, accountEmail, advcashSoapUrl }),

        checkCurrencyExchange: ({ from, to, action, amount }) =>
            checkCurrency({ password, apiName, accountEmail, advcashSoapUrl, from, to, action, amount })
    }
}