import { PrismaPetsRepository } from '../../repositories/prisma/prisma-pets-repository'
import { SearchPetsUseCase } from '../search-pets'

export const makeSearchPetsUseCase = () => {
  const repository = new PrismaPetsRepository()
  const useCase = new SearchPetsUseCase(repository)
  return useCase
}
