import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../../app'

describe('Register (E2E)', () => {

	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to register', async () => {
		const response = await request(app.server)
			.post('/organizations')
			.send({
				name: 'Org Doe',
				phone: '5511977775555',
				address: 'Av. Paulista, 1000',
				password: '12345678'
			})
			
		expect(response.statusCode).toEqual(201)
	})

})