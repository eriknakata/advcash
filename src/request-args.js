import token from './authentication-token'

export default (apiName, password, accountEmail) => {
    return {
        apiName,
        accountEmail,
        authenticationToken: token(password)
    }
}