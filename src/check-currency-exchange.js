export default (checkCurrencyExchangeResultHolder) => {
    return {
        amountExchanged: parseFloat(checkCurrencyExchangeResultHolder.amountExchanged),
        rate: parseFloat(checkCurrencyExchangeResultHolder.rate),
        from: checkCurrencyExchangeResultHolder.from,
        to: checkCurrencyExchangeResultHolder.to,
        action: checkCurrencyExchangeResultHolder.action,
        amount: parseFloat(checkCurrencyExchangeResultHolder.amount)
    }
}