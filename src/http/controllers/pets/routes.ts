import { FastifyInstance } from 'fastify'
import { verifyJwt } from '../../middlewares/verify-jwt'
import { create } from './create'
import { search } from './search'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/city/:cityId', search)

  app.post('/pets', { onRequest: [verifyJwt] }, create)
}
