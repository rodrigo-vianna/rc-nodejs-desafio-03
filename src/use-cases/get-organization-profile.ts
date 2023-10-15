import { Organization } from '@prisma/client'
import { IOrganizationsRepository } from '../repositories/organizations-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetOrganizationProfileUseCaseRequest {
  organizationId: string
}

interface GetOrganizationProfileUseCaseResponse {
  organization: Organization
}

export class GetOrganizationProfileUseCase {
  constructor(private organizationsRepository: IOrganizationsRepository) {}

  async execute({
    organizationId,
  }: GetOrganizationProfileUseCaseRequest): Promise<GetOrganizationProfileUseCaseResponse> {
    const organization = await this.organizationsRepository.findById(
      organizationId,
    )
    if (!organization) throw new ResourceNotFoundError()
    return {
      organization,
    }
  }
}
