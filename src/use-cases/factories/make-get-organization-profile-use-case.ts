import { PrismaOrganizationsRepository } from '../../repositories/prisma/prisma-organizations-repository'
import { GetOrganizationProfileUseCase } from '../get-organization-profile'

export const makeGetOrganizationProfileUseCase = () => {
  const repository = new PrismaOrganizationsRepository()
  const useCase = new GetOrganizationProfileUseCase(repository)
  return useCase
}
