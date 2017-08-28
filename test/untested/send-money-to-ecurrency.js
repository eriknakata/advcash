import advcash from '../src/index'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

const expect = chai.expect
const password = process.env.ADVCASH_PASSWORD
const accountEmail = process.env.ADVCASH_ACCOUNT_EMAIL
const apiName = process.env.ADVCASH_API_NAME
const address = process.env.ECOIN_ADDRESS

chai.use(chaiAsPromised)

describe('Send Money To Ecurrency', () => {

    describe('Withdrawal to a third-party payment system.', () => {
        
        it('Should return a null object', async () => {
            const client = await advcash({ password, apiName, accountEmail })

            const promise = client.sendMoneyToEcurrency({
                amount: 1.00,
                currency: "USD",
                ecurrency: "ECOIN",
                receiver: address,
                note: "testing",
                savePaymentTemplate: false
            })

            return Promise.all([
                expect(promise).to.eventually.equal(null)
            ])
        })
    })
})