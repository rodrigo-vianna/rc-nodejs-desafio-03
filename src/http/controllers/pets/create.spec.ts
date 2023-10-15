import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../../app'
import { prisma } from '../../../lib/prisma'
import { createAndAuthenticateOrganization } from '../../../utils/test/create-and-authenticate-organization'

describe('Create Pet (E2E)', () => {

	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to create a pet', async () => {
		const { token } = await createAndAuthenticateOrganization(app)

		const city = await prisma.city.create({
			data: {
				name: 'City Test',
				state: 'ST',
			}
		})

		const response = await request(app.server)
			.post('/pets')
			.set('Authorization', `Bearer ${token}`)
			.send({
				name: 'Pet',
				cityId: city.id,
			})
			
		expect(response.statusCode).toEqual(201)
	})

})