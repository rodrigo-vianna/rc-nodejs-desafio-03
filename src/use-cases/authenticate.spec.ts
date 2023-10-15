import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrganizationsRepository } from '../repositories/in-memory/in-memory-organizations-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let organizationsRepository: InMemoryOrganizationsRepository;
let sut: AuthenticateUseCase;

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new AuthenticateUseCase(organizationsRepository)
  })

  it('should be able to authenticate', async () => {
    await organizationsRepository.create({
      name: 'Org Doe',
      phone: '5511977775555',
			address: 'Av. Paulista, 1000',
      password_hash: await hash('123456', 8),
    })

    const { organization } = await sut.execute({
      phone: '5511977775555',
      password: '123456',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong phone', async () => {

    await expect(() => sut.execute({
      phone: '5511977775555',
      password: '123456',
    })).rejects.toThrowError(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await organizationsRepository.create({
      name: 'Org Doe',
      phone: '5511977775555',
			address: 'Av. Paulista, 1000',
      password_hash: await hash('123456', 8),
    })

    await expect(() => sut.execute({
      phone: '5511977775555',
      password: '123',
    })).rejects.toThrowError(InvalidCredentialsError)
  })
})
