import token from './authentication-token'

export default (apiName, password, accountEmail) => {
    return {
        apiName: apiName,
        accountEmail: accountEmail,
        authenticationToken: token(password)
    }
}