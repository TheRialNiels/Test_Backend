import { expect } from 'chai'
import { handler } from '../../app.mjs'

describe('Tests handler', () => {
    const testEvent = {
        body: '{ "base": 5, "exponent": 5 }',
        headers: {
            Origin: 'https://www.example.com',
        },
    }

    before(() => {
        process.env.TABLE_NAME = 'power-of-math'
    })

    it('verifies successful response', async () => {
        const result = await handler(testEvent)

        expect(result).to.be.an('object')
        expect(result.statusCode).to.equal(200)
        expect(result.body).to.be.a('string')

        const response = JSON.parse(result.body)
        expect(response).to.be.a('string')
        expect(response).to.equal('Your result is: 3125')
    })
})
