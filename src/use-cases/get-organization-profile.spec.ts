import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrganizationsRepository } from '../repositories/in-memory/in-memory-organizations-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetOrganizationProfileUseCase } from './get-organization-profile'

let organizationsRepository: InMemoryOrganizationsRepository;
let sut: GetOrganizationProfileUseCase;

describe('Get Organization Profile Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new GetOrganizationProfileUseCase(organizationsRepository)
  })

  it('should be able to get organization profile', async () => {
    const createdOrganization = await organizationsRepository.create({
      name: 'Org Doe',
      phone: '5511977775555',
			address: 'Av. Paulista, 1000',
      password_hash: await hash('123456', 8),
    })

    const { organization } = await sut.execute({
      organizationId: createdOrganization.id,
    })

    expect(organization.id).toEqual(createdOrganization.id)
    expect(organization.name).toEqual('Org Doe')
  })

  it('should not be able to get organization profile with wrong id', async () => {
    await expect(() => sut.execute({
      organizationId: 'invalid',
    })).rejects.toThrowError(ResourceNotFoundError)
  })
})
