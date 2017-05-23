import advcash from '../src/index'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

const expect = chai.expect
const password = process.env.ADVCASH_PASSWORD
const accountEmail = process.env.ADVCASH_ACCOUNT_EMAIL
const apiName = process.env.ADVCASH_API_NAME
const advcashSoapUrl = process.env.ADVCASH_SOAP_URL

chai.use(chaiAsPromised)

describe('Send Money To Advcash Card', () => {

    describe('Transfer of Funds to Advanced Cash Card', () => {

        it('Should return transaction id', async () => {
            const client = await advcash({ password, apiName, accountEmail })

            const promise = client.sendMoneyToAdvcashCard({
                amount: 0.10,
                currency: "USD",
                email: "erik.nakata5@gmail.com",
                cardType: "PLASTIC",
                note: "testing",
                savePaymentTemplate: true
            })

            return expect(promise).to.eventually.be.a("string")
        })
    })

})