import advcash from '../src/index'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

const expect = chai.expect
const password = process.env.ADVCASH_PASSWORD
const accountEmail = process.env.ADVCASH_ACCOUNT_EMAIL
const apiName = process.env.ADVCASH_API_NAME
const advcashSoapUrl = process.env.ADVCASH_SOAP_URL

chai.use(chaiAsPromised)

describe('Validate accounts', () => {
    describe('Validation of Account’s Existence', () => {
        it('Should return an array of object { present, accountEmail }', async () => {
            const client = await advcash({
                password: password,
                apiName: apiName,
                accountEmail: accountEmail,
            })

            const email = 'teste12345@teste.com'

            const promise = client.validateAccounts([email])

            return Promise.all([
                expect(promise).to.eventually.be.instanceof(Array),
                expect(promise).to.eventually.have.deep.property('[0].present', false),
                expect(promise).to.eventually.have.deep.property('[0].accountEmail', email)
            ]);
        })
    })
})