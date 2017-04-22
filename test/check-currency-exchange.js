import advcash from '../src/index'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

const expect = chai.expect
const password = process.env.ADVCASH_PASSWORD
const accountEmail = process.env.ADVCASH_ACCOUNT_EMAIL
const apiName = process.env.ADVCASH_API_NAME
const advcashSoapUrl = process.env.ADVCASH_SOAP_URL

chai.use(chaiAsPromised)

describe('Check currency exchange', () => {
    it('Should return a object { amountExchanged, rate, from, to, action, amount }', async () => {

        const client = await advcash({ password, apiName, accountEmail })

        const promise = client.checkCurrencyExchange({
            from: 'BTC',
            to: 'USD',
            action: 'SELL',
            amount: 1
        })

        return Promise.all([
            expect(promise).to.eventually.have.property("amountExchanged").with.a("number"),
            expect(promise).to.eventually.have.property("rate").with.a("number"),
            expect(promise).to.eventually.have.property("from").with.a("string"),
            expect(promise).to.eventually.have.property("to").with.a("string"),
            expect(promise).to.eventually.have.property("action").with.a("string"),
            expect(promise).to.eventually.have.property("amount").with.a("number"),
        ]);
    })
})