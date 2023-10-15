import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrganizationsRepository } from '../repositories/in-memory/in-memory-organizations-repository'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'
import { RegisterUseCase } from './register'

let organizationsRepository: InMemoryOrganizationsRepository;
let sut: RegisterUseCase;

describe('Register Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new RegisterUseCase(organizationsRepository)
  })

  it('should be able to register', async () => {
    const { organization } = await sut.execute({
      name: 'Org Doe',
      phone: '5511977775555',
			address: 'Av. Paulista, 1000',
      password: '123456',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should has organization password upon registration', async () => {
    const { organization } = await sut.execute({
      name: 'Org Doe',
      phone: '5511977775555',
			address: 'Av. Paulista, 1000',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      organization.password_hash
    )
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same phone twice', async () => {
    await sut.execute({
      name: 'Org Doe',
      phone: '5511977775555',
			address: 'Av. Paulista, 1000',
      password: '123456',
    })

    await expect(() => sut.execute({
      name: 'Org Doe',
      phone: '5511977775555',
			address: 'Av. Paulista, 1000',
      password: '123456',
    })).rejects.toThrowError(OrganizationAlreadyExistsError)
  })
})
