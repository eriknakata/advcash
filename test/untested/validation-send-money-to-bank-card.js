import advcash from '../src/index'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

const expect = chai.expect
const password = process.env.ADVCASH_PASSWORD
const accountEmail = process.env.ADVCASH_ACCOUNT_EMAIL
const apiName = process.env.ADVCASH_API_NAME

chai.use(chaiAsPromised)

describe('Validation Send Money To Bank Card', () => {
    
    describe('Validation of Funds Transfer to External Card Not Tied to System', () => {
        
        it('Should return a null object', async () => {
            const client = await advcash({ password, apiName, accountEmail })

            const promise = client.validationSendMoneyToBankCard({
                amount: 4.00,
                currency: "USD",
                cardNumber: "4532881212776308",
                expiryMonth: "12",
                expiryYear: "18",
                note: "testing",
                savePaymentTemplate: false
            })

            return Promise.all([
                expect(promise).to.eventually.equal(null)
            ])
        })
    })

})