import advcash from '../src/index'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

const expect = chai.expect
const password = process.env.ADVCASH_PASSWORD
const accountEmail = process.env.ADVCASH_ACCOUNT_EMAIL
const apiName = process.env.ADVCASH_API_NAME
const advcashSoapUrl = process.env.ADVCASH_SOAP_URL

chai.use(chaiAsPromised)

describe('Validation Send Money', () => {
    it('Should return an object { amount, currency, email, walletId, note, savePaymentTemplate }', async () => {
        const client = await advcash({ password, apiName, accountEmail })

        const promise = client.validationSendMoney({
            amount: 0.10,
            currency: "USD",
            email: "leonardocadastro69@gmail.com",
            note: "teste",
            savePaymentTemplate: true
        })

        return Promise.all([
            expect(promise).to.eventually.equal(null)
        ])
    })
})