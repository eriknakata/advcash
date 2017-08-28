import advcash from '../src/index'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

const expect = chai.expect
const password = process.env.ADVCASH_PASSWORD
const accountEmail = process.env.ADVCASH_ACCOUNT_EMAIL
const apiName = process.env.ADVCASH_API_NAME
const advcashSoapUrl = process.env.ADVCASH_SOAP_URL

chai.use(chaiAsPromised)

describe('Send Money To Exmo', () => {

    describe('Withdrawal to EXMO', () => {

        it('Should return a null object', async () => {
            const client = await advcash({ password, apiName, accountEmail })

            const promise = client.sendMoneyToExmo({
                amount: 1.10,
                currency: "USD",
                note: "testing"
            })

            return Promise.all([
                expect(promise).to.eventually.have.property('id').with.a("string"),
                expect(promise).to.eventually.have.property('coupon').with.a("string"),
            ]);
        })
    })
})