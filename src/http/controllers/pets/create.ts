import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreatePetUseCase } from '../../../use-cases/factories/make-create-pet-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    cityId: z.string().uuid(),
  })

  const { name, cityId } = createPetBodySchema.parse(request.body)

  const useCase = makeCreatePetUseCase()
  await useCase.execute({
    name,
    cityId,
    orgId: request.user.sub,
  })
  return reply.status(201).send()
}
