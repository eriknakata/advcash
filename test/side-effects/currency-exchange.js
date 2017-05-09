import advcash from '../src/index'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

const expect = chai.expect
const password = process.env.ADVCASH_PASSWORD
const accountEmail = process.env.ADVCASH_ACCOUNT_EMAIL
const apiName = process.env.ADVCASH_API_NAME
const advcashSoapUrl = process.env.ADVCASH_SOAP_URL

chai.use(chaiAsPromised)

describe('Currency exchange', () => {
    describe('Intrasystem Currency Exchange', () => {
        it('Should return a string', async () => {

            const client = await advcash({ password, apiName, accountEmail })

            const promise = client.currencyExchange({
                from: 'USD',
                to: 'EUR',
                action: 'SELL',
                amount: 0.10,
                note: "testing currency exchange"
            })

            return expect(promise).to.eventually.be.a("string")
        })
    })
})