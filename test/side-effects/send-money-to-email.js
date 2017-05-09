import advcash from '../src/index'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

const expect = chai.expect
const password = process.env.ADVCASH_PASSWORD
const accountEmail = process.env.ADVCASH_ACCOUNT_EMAIL
const apiName = process.env.ADVCASH_API_NAME
const advcashSoapUrl = process.env.ADVCASH_SOAP_URL

chai.use(chaiAsPromised)

describe('Send Money To Email', () => {
    describe('Transfer of Funds to Unregistered User via E-mail', () => {
        it('Should return a string', async () => {

            const client = await advcash({ password, apiName, accountEmail })

            const promise = client.sendMoneyToEmail({
                amount: 0.10,
                currency: 'USD',
                email: 'adv.wrapper@gmail.com',
                note: "testing currency exchange"
            })

            return expect(promise).to.eventually.be.a("string")
        })
    })

})