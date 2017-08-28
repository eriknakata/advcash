import advcash from '../src/index'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

const expect = chai.expect
const password = process.env.ADVCASH_PASSWORD
const accountEmail = process.env.ADVCASH_ACCOUNT_EMAIL
const apiName = process.env.ADVCASH_API_NAME

chai.use(chaiAsPromised)

describe('Validation Send Money To Btc-E', () => {

    describe('Validation of Withdrawal to BTC-E', () => {

        it('Should return a null object', async () => {
            const client = await advcash({ password, apiName, accountEmail })

            const promise = client.validationSendMoneyToBtcE({
                amount: 1.10,
                currency: "USD",
                note: "testing"
            })

            return expect(promise).to.eventually.equal(null)
        })
    })
})