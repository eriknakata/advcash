import soap from './soap-client'
import requestArgs from './request-args'

export default async ({ password, apiName, accountEmail, advcashSoapUrl, from, to, action, amount }) => {
    const client = await soap(advcashSoapUrl)
    const response = await client.MerchantWebService.MerchantWebServicePort.checkCurrencyExchange({
        arg0: requestArgs(apiName, password, accountEmail),
        arg1: { from, to, action, amount }
    })

    return response.return
}