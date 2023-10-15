import { PrismaCitiesRepository } from '../../repositories/prisma/prisma-cities-repository'
import { PrismaOrganizationsRepository } from '../../repositories/prisma/prisma-organizations-repository'
import { PrismaPetsRepository } from '../../repositories/prisma/prisma-pets-repository'
import { CreatePetUseCase } from '../create-pet'

export const makeCreatePetUseCase = () => {
  const repository = new PrismaPetsRepository()
  const orgsrepository = new PrismaOrganizationsRepository()
  const citiesrepository = new PrismaCitiesRepository()
  const useCase = new CreatePetUseCase(
    repository,
    orgsrepository,
    citiesrepository,
  )
  return useCase
}
