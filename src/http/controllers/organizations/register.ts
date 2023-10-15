import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { OrganizationAlreadyExistsError } from '../../../use-cases/errors/organization-already-exists-error'
import { makeRegisterUseCase } from '../../../use-cases/factories/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    address: z.string(),
    phone: z.string(),
    password: z.string().min(8),
  })

  const { name, phone, address, password } = registerBodySchema.parse(
    request.body,
  )

  try {
    const useCase = makeRegisterUseCase()
    await useCase.execute({ name, phone, address, password })
  } catch (err) {
    if (err instanceof OrganizationAlreadyExistsError)
      return reply.status(409).send({
        message: err.message,
      })
    throw err
  }
  return reply.status(201).send()
}
