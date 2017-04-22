export default (balances) => balances.map(balance => {
    return { amount: parseFloat(balance.amount), id: balance.id }
})