import { Pet } from '@prisma/client'
import { IPetsRepository } from '../repositories/pets-repository'

interface SearchPetsUseCaseRequest {
  cityId: string
  search: string
  page: number
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private readonly repository: IPetsRepository) {}

  async execute({
    cityId,
    search,
    page,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.repository.searchMany(cityId, search, page)
    return {
      pets,
    }
  }
}
