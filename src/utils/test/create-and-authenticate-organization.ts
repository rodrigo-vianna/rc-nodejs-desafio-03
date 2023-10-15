import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'
import { prisma } from '../../lib/prisma'

export async function createAndAuthenticateOrganization(app: FastifyInstance) {
  const phone = '5511977775555'
  const address = 'Av. Paulista, 1000'
  const password = '12345678'

  await prisma.organization.create({
    data: {
      name: 'Org Doe',
      phone,
      password_hash: await hash(password, 6),
      address,
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    phone,
    password,
  })

  const { token } = authResponse.body
  return {
    token,
    phone,
  }
}
