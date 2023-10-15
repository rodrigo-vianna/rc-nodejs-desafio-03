import { Pet } from '@prisma/client'
import { ICitiesRepository } from '../repositories/cities-repository'
import { IOrganizationsRepository } from '../repositories/organizations-repository'
import { IPetsRepository } from '../repositories/pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreatePetUseCaseRequest {
  name: string
  cityId: string
  orgId: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private readonly repository: IPetsRepository,
    private readonly orgsRepository: IOrganizationsRepository,
    private readonly citiesRepository: ICitiesRepository,
  ) {}

  async execute({
    name,
    cityId,
    orgId,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const city = await this.citiesRepository.findById(cityId)
    if (!city) throw new ResourceNotFoundError()
    const org = await this.orgsRepository.findById(orgId)
    if (!org) throw new ResourceNotFoundError()
    const pet = await this.repository.create({
      name,
      city_id: cityId,
      org_id: orgId,
    })
    return {
      pet,
    }
  }
}
