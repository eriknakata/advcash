import advcash from '../src/index'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

const expect = chai.expect
const password = process.env.ADVCASH_PASSWORD
const accountEmail = process.env.ADVCASH_ACCOUNT_EMAIL
const apiName = process.env.ADVCASH_API_NAME
const advcashSoapUrl = process.env.ADVCASH_SOAP_URL

chai.use(chaiAsPromised)

describe('History', () => {
    it(`Should return an array of object { id, comment, startTime, status, transactionName, sci, walletSrcId, 
        walletDestId, senderEmail, receiverEmail, amount, currency, fullCommission, direction, orderId }`, async () => {
            const client = await advcash({
                password: password,
                apiName: apiName,
                accountEmail: accountEmail,
            })

            const promise = client.history({
                count: 5
            })

            return Promise.all([
                expect(promise).to.eventually.be.instanceof(Array).lengthOf(5),
                expect(promise).to.eventually.have.deep.property('[0].id').with.a("string"),
                expect(promise).to.eventually.have.deep.property('[0].comment').with.a("string"),
                expect(promise).to.eventually.have.deep.property('[0].startTime').with.a("date"),
                expect(promise).to.eventually.have.deep.property('[0].status').with.a("string"),
                expect(promise).to.eventually.have.deep.property('[0].transactionName').with.a("string"),
                expect(promise).to.eventually.have.deep.property('[0].sci').with.a("boolean"),
                expect(promise).to.eventually.have.deep.property('[0].walletSrcId').with.a("string"),
                expect(promise).to.eventually.have.deep.property('[0].walletDestId').with.a("string"),
                expect(promise).to.eventually.have.deep.property('[0].senderEmail').with.a("string"),
                expect(promise).to.eventually.have.deep.property('[0].receiverEmail').with.a("string"),
                expect(promise).to.eventually.have.deep.property('[0].amount').with.a("number"),
                expect(promise).to.eventually.have.deep.property('[0].currency').with.a("string"),
                expect(promise).to.eventually.have.deep.property('[0].fullCommission').with.a("number"),
                expect(promise).to.eventually.have.deep.property('[0].direction').with.a("string"),
                expect(promise).to.eventually.have.deep.property('[0].orderId').with.a("string"),
            ]);
        })
})