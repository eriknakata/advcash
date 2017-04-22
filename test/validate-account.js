import advcash from '../src/index'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

const expect = chai.expect
const password = process.env.ADVCASH_PASSWORD
const accountEmail = process.env.ADVCASH_ACCOUNT_EMAIL
const apiName = process.env.ADVCASH_API_NAME
const advcashSoapUrl = process.env.ADVCASH_SOAP_URL

chai.use(chaiAsPromised)

describe('Validate account', () => {
    it('Should return an object { firstNameMatchingPercentage, lastNameMatchingPercentage }', async () => {
        const client = await advcash({ password, apiName, accountEmail })

        const promise = client.validateAccount({
            email: accountEmail,
            firstName: "Test first name",
            lastName: "Test last name"
        })

        return Promise.all([
            expect(promise).to.eventually.have.property("firstNameMatchingPercentage").with.a("number"),
            expect(promise).to.eventually.have.property("lastNameMatchingPercentage").with.a("number"),
        ])
    })
})