import soap from './soap-client'
import requestArgs from './request-args'

export default async ({ password, apiName, accountEmail, advcashSoapUrl, email, walletId, firstName, lastName }) => {
    const client = await soap(advcashSoapUrl)
    const response = await client.validateAccount({
        arg0: requestArgs(apiName, password, accountEmail),
        arg1: {
            email,
            walletId,
            firstName,
            lastName
        }
    })

    return {
        firstNameMatchingPercentage: parseFloat(response.return.firstNameMatchingPercentage),
        lastNameMatchingPercentage: parseFloat(response.return.lastNameMatchingPercentage)
    }
}