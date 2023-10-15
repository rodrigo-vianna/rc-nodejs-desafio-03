import { PrismaOrganizationsRepository } from '../../repositories/prisma/prisma-organizations-repository'
import { RegisterUseCase } from '../register'

export const makeRegisterUseCase = () => {
  const repository = new PrismaOrganizationsRepository()
  const useCase = new RegisterUseCase(repository)
  return useCase
}
