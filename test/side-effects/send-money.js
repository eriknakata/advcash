import advcash from '../src/index'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

const expect = chai.expect
const password = process.env.ADVCASH_PASSWORD
const accountEmail = process.env.ADVCASH_ACCOUNT_EMAIL
const apiName = process.env.ADVCASH_API_NAME
const advcashSoapUrl = process.env.ADVCASH_SOAP_URL

chai.use(chaiAsPromised)

describe('Send Money', () => {

    describe('Intrasystem Payment', () => {
        it('Should return transaction id', async () => {
            const client = await advcash({ password, apiName, accountEmail })

            const promise = client.sendMoney({
                amount: 0.10,
                currency: "USD",
                email: "leonardocadastro69@gmail.com",
                note: "testing",
                savePaymentTemplate: true
            })

            return expect(promise).to.eventually.be.a("string")
        })
    })
})