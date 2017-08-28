export default invoice => {
    return {
        bitcoinAddress: invoice.bitcoinAddress,
        bitcoinAmount: parseFloat(invoice.bitcoinAmount),
        amount: parseFloat(invoice.amount),
        currency: invoice.currency,
        sciName: invoice.sciName || '',
        orderId: invoice.orderId || '',
        note: invoice.note || ''
    }
}