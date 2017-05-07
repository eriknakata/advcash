export default transactions => transactions.map(transaction => {
    return {
        id: transaction.id,
        comment: transaction.comment || '',
        startTime: transaction.startTime,
        status: transaction.status,
        transactionName: transaction.transactionName,
        sci: transaction.sci,
        walletSrcId: transaction.walletSrcId || '',
        walletDestId: transaction.walletDestId || '',
        senderEmail: transaction.senderEmail || '',
        receiverEmail: transaction.receiverEmail || '',
        amount: parseFloat(transaction.amount),
        currency: transaction.currency,
        fullCommission: parseFloat(transaction.fullCommission),
        direction: transaction.direction,
        orderId: transaction.orderId || ''
    }
})
