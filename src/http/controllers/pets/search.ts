import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchPetsUseCase } from '../../../use-cases/factories/make-search-pets-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })
  const searchPetsParamsSchema = z.object({
    cityId: z.string().uuid(),
  })

  const { cityId } = searchPetsParamsSchema.parse(request.params)
  const { q, page } = searchPetsQuerySchema.parse(request.query)

  const useCase = makeSearchPetsUseCase()
  const { pets } = await useCase.execute({
    cityId,
    search: q,
    page,
  })
  return reply.status(200).send({
    pets,
  })
}
