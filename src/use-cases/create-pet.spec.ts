import { hash } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryCitiesRepository } from '../repositories/in-memory/in-memory-cities-repository';
import { InMemoryOrganizationsRepository } from '../repositories/in-memory/in-memory-organizations-repository';
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository';
import { CreatePetUseCase } from './create-pet';

let orgsRepository: InMemoryOrganizationsRepository;
let citiesRepository: InMemoryCitiesRepository;
let petsRepository: InMemoryPetsRepository;
let sut: CreatePetUseCase;

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrganizationsRepository()
    citiesRepository = new InMemoryCitiesRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository, orgsRepository, citiesRepository)
  })

  it('should be able to create pet', async () => {
		const org = await orgsRepository.create({
			name: 'Org Name',
			phone: '5511977775555',
			password_hash: await hash('123456', 8),
			address: 'Av. Paulista, 1000',
		})

		const city = await citiesRepository.create({
			name: 'City Name',
			state: 'ST',
		})

    const { pet } = await sut.execute({
      name: 'Pet',
      orgId: org.id,
      cityId: city.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
