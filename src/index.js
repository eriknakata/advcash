import checkCurrency from './core/check-currency-exchange'

export default ({ password, apiName, accountEmail, advcashSoapUrl = 'https://wallet.advcash.com/wsm/merchantWebService?wsdl' }) => {
    return {
        btcUsd: async () => {
            const response = await checkCurrency({
                password: password,
                apiName: apiName,
                accountEmail: accountEmail,
                advcashSoapUrl: advcashSoapUrl,
                from: 'BTC',
                to: 'USD',
                action: 'SELL',
                amount: 1
            })

            return parseFloat(response.rate)
        },
        btcEur: async () => {
            const response = await checkCurrency({
                password: password,
                apiName: apiName,
                accountEmail: accountEmail,
                advcashSoapUrl: advcashSoapUrl,
                from: 'BTC',
                to: 'EUR',
                action: 'SELL',
                amount: 1
            })

            return parseFloat(response.rate)
        }
    }
}