import soap from './soap-client'
import requestArgs from './request-args'

export default async ({ password, apiName, accountEmail, advcashSoapUrl, from, to, action, amount }) => {
    const client = await soap(advcashSoapUrl)
    const response = await client.checkCurrencyExchange({
        arg0: requestArgs(apiName, password, accountEmail),
        arg1: { from, to, action, amount }
    })

    return {
        amountExchanged: parseFloat(response.return.amountExchanged),
        rate: parseFloat(response.return.rate),
        from: response.return.from,
        to: response.return.to,
        action: response.return.action,
        amount: parseFloat(response.return.amount)
    }
}