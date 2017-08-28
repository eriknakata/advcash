import getbalances from './get-balances'
import checkCurrencyMap from './check-currency-exchange'
import validateAccountMap from './validate-account'
import validateAccountsMap from './validate-accounts'
import requestArgs from './request-args'
import soap from './soap-client'
import historyMap from './history'
import findTransactionMap from './find-transaction'
import createBitcoinInvoice from './create-bitcoin-invoice'

export default async ({ password, apiName, accountEmail, advcashSoapUrl = 'https://wallet.advcash.com/wsm/merchantWebService?wsdl' }) => {
    const arg0 = requestArgs(apiName, password, accountEmail)
    const advcashClient = await soap(advcashSoapUrl)

    return {
        getbalances: () => advcashClient("getBalances", { arg0 }, getbalances),

        checkCurrencyExchange: (arg1) => advcashClient("checkCurrencyExchange", {
            arg0,
            arg1
        }, checkCurrencyMap),

        validateAccount: (arg1) => advcashClient("validateAccount", {
            arg0,
            arg1
        }, validateAccountMap),

        validateAccounts: (arg1) => advcashClient("validateAccounts", {
            arg0,
            arg1
        }, validateAccountsMap),

        validationSendMoney: (arg1) => advcashClient("validationSendMoney", {
            arg0,
            arg1
        }),

        history: (arg1) => advcashClient("history", {
            arg0,
            arg1
        }, historyMap),

        validationSendMoneyToAdvcashCard: (arg1) => advcashClient("validationSendMoneyToAdvcashCard", {
            arg0,
            arg1
        }),

        validationSendMoneyToEcurrency: (arg1) => advcashClient("validationSendMoneyToEcurrency", {
            arg0,
            arg1
        }),

        currencyExchange: (arg1) => advcashClient("currencyExchange", {
            arg0,
            arg1
        }),

        sendMoneyToEmail: (arg1) => advcashClient("sendMoneyToEmail", {
            arg0,
            arg1
        }),

        findTransaction: transactionId => advcashClient("findTransaction", {
            arg0,
            arg1: transactionId
        }, findTransactionMap),

        validationCurrencyExchange: (arg1) => advcashClient("validationCurrencyExchange", {
            arg0,
            arg1
        }),

        validationSendMoneyToEmail: (arg1) => advcashClient("validationSendMoneyToEmail", {
            arg0,
            arg1
        }),

        sendMoney: (arg1) => advcashClient("sendMoney", {
            arg0,
            arg1
        }),

        sendMoneyToAdvcashCard: (arg1) => advcashClient("sendMoneyToAdvcashCard", {
            arg0,
            arg1
        }),

        validationSendMoneyToBankCard: (arg1) => advcashClient("validationSendMoneyToBankCard", {
            arg0,
            arg1
        }),

        sendMoneyToEcurrency: (arg1) => advcashClient("sendMoneyToEcurrency", {
            arg0,
            arg1
        }),

        validationSendMoneyToBtcE: (arg1) => advcashClient("validationSendMoneyToBtcE", {
            arg0,
            arg1
        }),

        sendMoneyToBtcE: (arg1) => advcashClient("sendMoneyToBtcE", {
            arg0,
            arg1
        }),

        validationSendMoneyToExmo: (arg1) => advcashClient("validationSendMoneyToExmo", {
            arg0,
            arg1
        }),

        sendMoneyToExmo: (arg1) => advcashClient("sendMoneyToExmo", {
            arg0,
            arg1
        }),

        createBitcoinInvoice: (arg1) => advcashClient("createBitcoinInvoice", {
            arg0,
            arg1
        }, createBitcoinInvoice),
    }
}