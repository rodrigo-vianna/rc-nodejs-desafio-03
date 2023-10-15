import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../../app'

describe('Authenticate (E2E)', () => {

	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to authenticate', async () => {
		const phone = '5511977775555';
		const password = '12345678';

		await request(app.server)
			.post('/organizations')
			.send({
				name: 'Org Doe',
				address: 'Av. Paulista, 1000',
				phone,
				password
			})
		const response = await request(app.server)
			.post('/sessions')
			.send({
				phone,
				password
			})

		expect(response.statusCode).toEqual(200)
		expect(response.body).toEqual({
			token: expect.any(String),
		})
	})

})