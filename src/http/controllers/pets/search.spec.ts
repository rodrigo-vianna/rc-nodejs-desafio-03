import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../../app'
import { prisma } from '../../../lib/prisma'
import { createAndAuthenticateOrganization } from '../../../utils/test/create-and-authenticate-organization'

describe('Search Pets (E2E)', () => {

	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to search for pets', async () => {
		const { token } = await createAndAuthenticateOrganization(app)

		const city1 = await prisma.city.create({
			data: {
				name: 'City 1',
				state: 'ST',
			}
		})

		const city2 = await prisma.city.create({
			data: {
				name: 'City 2',
				state: 'ST',
			}
		})

		await request(app.server)
			.post('/pets')
			.set('Authorization', `Bearer ${token}`)
			.send({
				name: 'Pet First',
				cityId: city1.id,
			})

		await request(app.server)
			.post('/pets')
			.set('Authorization', `Bearer ${token}`)
			.send({
				name: 'Other Pet',
				cityId: city2.id,
			})

		const response = await request(app.server)
			.get(`/pets/city/${city2.id}`)
			.query({
				q: 'Other',
			})
			.set('Authorization', `Bearer ${token}`)
			.send()
			
		expect(response.statusCode).toEqual(200)
		expect(response.body.pets).toHaveLength(1)
		expect(response.body.pets[0]).toEqual(expect.objectContaining({
			name: 'Other Pet',
		}))
	})

})