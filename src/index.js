import getbalances from './get-balances'
import checkCurrencyMap from './check-currency-exchange'
import validateAccountMap from './validate-account'
import validateAccountsMap from './validate-accounts'
import requestArgs from './request-args'
import soap from './soap-client'

export default async ({ password, apiName, accountEmail, advcashSoapUrl = 'https://wallet.advcash.com/wsm/merchantWebService?wsdl' }) => {
    const arg0 = requestArgs(apiName, password, accountEmail)
    const advcashClient = await soap(advcashSoapUrl)

    return {
        getbalances: () => advcashClient("getBalances", { arg0 }, getbalances),

        checkCurrencyExchange: ({ from, to, action, amount }) => advcashClient("checkCurrencyExchange", {
            arg0,
            arg1: { from, to, action, amount }
        }, checkCurrencyMap),

        validateAccount: ({ email, firstName, lastName }) => advcashClient("validateAccount", {
            arg0,
            arg1: { email, firstName, lastName }
        }, validateAccountMap),

        validateAccounts: (emails) => advcashClient("validateAccounts", {
            arg0,
            arg1: emails
        }, validateAccountsMap)
    }
}