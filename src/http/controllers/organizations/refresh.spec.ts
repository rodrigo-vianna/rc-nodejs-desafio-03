import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../../app'

describe('Refresh (E2E)', () => {

	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to refresh a token', async () => {
		const phone = '5511977775555'
		const address = 'Av. Paulista, 1000'
		const password = '12345678';

		await request(app.server)
			.post('/organizations')
			.send({
				name: 'Org Doe',
				phone,
				address,
				password
			})

		const authResponse = await request(app.server)
			.post('/sessions')
			.send({
				phone,
				password
			})

			const cookies = authResponse.get('Set-Cookie')

		const response = await request(app.server)
		.patch('/token/refresh')
		.set('Cookie', cookies)
			.send()

		expect(response.statusCode).toEqual(200)
		expect(response.body).toEqual({
			token: expect.any(String),
		})
		expect(response.get('Set-Cookie')).toEqual([
			expect.stringContaining('refreshToken='),
		])
	})

})