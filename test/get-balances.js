import getBalances from '../src/get-balances'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

const expect = chai.expect
const password = process.env.ADVCASH_PASSWORD
const accountEmail = process.env.ADVCASH_ACCOUNT_EMAIL
const apiName = process.env.ADVCASH_API_NAME
const advcashSoapUrl = process.env.ADVCASH_SOAP_URL

chai.use(chaiAsPromised)

describe('Get balances', () => {
    it('Should return an array of object { amount, id }', () => {

        const promise = getBalances({
            password: password,
            apiName: apiName,
            accountEmail: accountEmail,
            advcashSoapUrl: advcashSoapUrl
        })

        return Promise.all([
            expect(promise).to.eventually.be.instanceof(Array)
        ]);
    })
})