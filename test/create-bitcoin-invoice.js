import advcash from '../src/index'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

const expect = chai.expect
const password = process.env.ADVCASH_PASSWORD
const accountEmail = process.env.ADVCASH_ACCOUNT_EMAIL
const apiName = process.env.ADVCASH_API_NAME

chai.use(chaiAsPromised)

describe('Create Bitcoin Invoice', () => {
    describe('Creating bitcoin invoice', () => {
        it(`Should return an object { bitcoinAddress, bitcoinAmount, amount,
            currency, sciName, orderId, note }`, async () => {

                const client = await advcash({
                    password: password,
                    apiName: apiName,
                    accountEmail: accountEmail,
                })

                const promise = client.createBitcoinInvoice({
                    amount: 1.0,
                    currency: "USD"
                })

                return Promise.all([
                    expect(promise).to.eventually.have.property('bitcoinAddress').with.a("string"),
                    expect(promise).to.eventually.have.property('bitcoinAmount').with.a("number"),
                    expect(promise).to.eventually.have.property('amount').with.a("number"),
                    expect(promise).to.eventually.have.property('currency').with.a("string"),
                    expect(promise).to.eventually.have.property('sciName').with.a("string"),
                    expect(promise).to.eventually.have.property('orderId').with.a("string"),
                    expect(promise).to.eventually.have.property('note').with.a("string")
                ]);
            })
    })
})