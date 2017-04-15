import soap from './soap-client'
import requestArgs from './request-args'

export default async ({ password, apiName, accountEmail, advcashSoapUrl }) => {
    const client = await soap(advcashSoapUrl)
    const response = await client.getBalances({
        arg0: requestArgs(apiName, password, accountEmail),
    })

    return response.return.map(balance => {
        return { amount: parseFloat(balance.amount), id: balance.id }
    })
}