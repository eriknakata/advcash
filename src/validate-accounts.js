export default (accounts) => accounts.map(account => {
    return { present: account.present, accountEmail: account.systemAccountName }
})