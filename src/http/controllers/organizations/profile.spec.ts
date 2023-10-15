import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../../app'
import { createAndAuthenticateOrganization } from '../../../utils/test/create-and-authenticate-organization'

describe('Profile (E2E)', () => {

	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to get organization profile', async () => {
		const { token, phone } = await createAndAuthenticateOrganization(app)

		const response = await request(app.server)
			.get('/me')
			.set('Authorization', `Bearer ${token}`)
			.send()

		expect(response.statusCode).toEqual(200)
		expect(response.body.organization).toEqual(expect.objectContaining({
			phone,
		}))
	})

})