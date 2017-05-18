import advcash from '../src/index'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

const expect = chai.expect
const password = process.env.ADVCASH_PASSWORD
const accountEmail = process.env.ADVCASH_ACCOUNT_EMAIL
const apiName = process.env.ADVCASH_API_NAME
const advcashSoapUrl = process.env.ADVCASH_SOAP_URL

chai.use(chaiAsPromised)

describe('Validation Send Money To Email', () => {

    describe('Validation of Funds Transfer to Unregistered User via E-mail', () => {

        it('Should return a null object', async () => {
            const client = await advcash({ password, apiName, accountEmail })

            const promise = client.validationSendMoneyToEmail({
                amount: 1.10,
                currency: "USD",
                email: "testing@testing.com",
                note: "testing"
            })

            return expect(promise).to.eventually.equal(null)
        })
    })
})