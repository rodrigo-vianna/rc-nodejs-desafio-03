import { PrismaOrganizationsRepository } from '../../repositories/prisma/prisma-organizations-repository'
import { AuthenticateUseCase } from '../authenticate'

export const makeAuthenticateUseCase = () => {
  const repository = new PrismaOrganizationsRepository()
  const useCase = new AuthenticateUseCase(repository)
  return useCase
}
