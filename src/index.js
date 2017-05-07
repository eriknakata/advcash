import getbalances from './get-balances'
import checkCurrencyMap from './check-currency-exchange'
import validateAccountMap from './validate-account'
import validateAccountsMap from './validate-accounts'
import requestArgs from './request-args'
import soap from './soap-client'
import historyMap from './history'

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
        }, validateAccountsMap),

        validationSendMoney: ({ amount, currency, email, walletId, note, savePaymentTemplate }) => advcashClient("validationSendMoney", {
            arg0,
            arg1: { amount, currency, email, walletId, note, savePaymentTemplate }
        }),

        history: ({ from, count, sortOrder, startTimeFrom, startTimeTo, transactionName, transactionStatus, walletId }) => advcashClient("history", {
            arg0,
            arg1: { from, count, sortOrder, startTimeFrom, startTimeTo, transactionName, transactionStatus, walletId }
        }, historyMap),
    }
}