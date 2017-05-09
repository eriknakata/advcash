import advcash from '../src/index'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

const expect = chai.expect
const password = process.env.ADVCASH_PASSWORD
const accountEmail = process.env.ADVCASH_ACCOUNT_EMAIL
const apiName = process.env.ADVCASH_API_NAME
const advcashSoapUrl = process.env.ADVCASH_SOAP_URL

chai.use(chaiAsPromised)

describe('Find Transaction', () => {
    describe('Transaction Search by ID', () => {
        it(`Should return an array of object { id, comment, startTime, status, transactionName, sci, walletSrcId, 
        walletDestId, senderEmail, receiverEmail, amount, currency, fullCommission, direction, orderId }`, async () => {

                const client = await advcash({
                    password: password,
                    apiName: apiName,
                    accountEmail: accountEmail,
                })

                const promise = client.findTransaction("4744c507-45bd-410e-9027-d8a25fc8c510")

                return Promise.all([
                    expect(promise).to.eventually.have.property('id').with.a("string"),
                    expect(promise).to.eventually.have.property('comment').with.a("string"),
                    expect(promise).to.eventually.have.property('startTime').with.a("date"),
                    expect(promise).to.eventually.have.property('status').with.a("string"),
                    expect(promise).to.eventually.have.property('transactionName').with.a("string"),
                    expect(promise).to.eventually.have.property('sci').with.a("boolean"),
                    expect(promise).to.eventually.have.property('walletSrcId').with.a("string"),
                    expect(promise).to.eventually.have.property('walletDestId').with.a("string"),
                    expect(promise).to.eventually.have.property('senderEmail').with.a("string"),
                    expect(promise).to.eventually.have.property('receiverEmail').with.a("string"),
                    expect(promise).to.eventually.have.property('amount').with.a("number"),
                    expect(promise).to.eventually.have.property('currency').with.a("string"),
                    expect(promise).to.eventually.have.property('fullCommission').with.a("number"),
                    expect(promise).to.eventually.have.property('direction').with.a("string"),
                    expect(promise).to.eventually.have.property('orderId').with.a("string"),
                ]);
            })
    })
})