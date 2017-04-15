import soap from './soap-client'
import requestArgs from './request-args'

export default async ({ password, apiName, accountEmail, advcashSoapUrl, emails }) => {
    const client = await soap(advcashSoapUrl)
    const response = await client.validateAccounts({
        arg0: requestArgs(apiName, password, accountEmail),
        arg1: emails
    })

    return response.return.map(item => {
        return { present: item.present, accountEmail: item.systemAccountName }
    })
}