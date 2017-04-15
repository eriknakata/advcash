import adv from '../src/index'
import assert from 'assert'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

const expect = chai.expect
const advcash = adv({
    password: process.env.ADVCASH_PASSWORD,
    accountEmail: process.env.ADVCASH_ACCOUNT_EMAIL,
    apiName: process.env.ADVCASH_API_NAME
})

chai.use(chaiAsPromised)

describe('Advcash Tests', () => {
    describe('Bitcoin to USD', () => {
        it('Should return a float number', () => {
            const promise = advcash.btcUsd()
            return expect(promise).to.eventually.be.a('number')
        });
    })

    describe('Bitcoin to EUR', () => {
        it('Should return a float number', () => {
            const promise = advcash.btcEur()
            return expect(promise).to.eventually.be.a('number')
        });
    })

});