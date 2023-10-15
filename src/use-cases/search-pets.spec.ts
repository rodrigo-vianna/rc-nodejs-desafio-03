import { hash } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryCitiesRepository } from '../repositories/in-memory/in-memory-cities-repository';
import { InMemoryOrganizationsRepository } from '../repositories/in-memory/in-memory-organizations-repository';
import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository';
import { SearchPetsUseCase } from './search-pets';

let orgsRepository: InMemoryOrganizationsRepository;
let citiesRepository: InMemoryCitiesRepository;
let petsRepository: InMemoryPetsRepository;
let sut: SearchPetsUseCase;

describe('Search Pets Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrganizationsRepository()
    citiesRepository = new InMemoryCitiesRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetsUseCase(petsRepository)
  })

  it('should be able to search for pets', async () => {
		const org = await orgsRepository.create({
			name: 'Org Name',
			phone: '5511977775555',
			password_hash: await hash('123456', 8),
			address: 'Av. Paulista, 1000',
		})

		const city1 = await citiesRepository.create({
			name: 'City Name',
			state: 'ST',
		})

		const city2 = await citiesRepository.create({
			name: 'City 2',
			state: 'ST',
		})
		
    await petsRepository.create({
      name: 'Pet One',
      org_id: org.id,
      city_id: city1.id,
    })

    await petsRepository.create({
      name: 'Other Pet',
      org_id: org.id,
      city_id: city1.id,
    })

    await petsRepository.create({
      name: 'Alone Pet',
      org_id: org.id,
      city_id: city2.id,
    })

    const { pets } = await sut.execute({
			cityId: city2.id,
			search: 'Pet',
			page: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'Alone Pet' }),
    ])
  })

  it('should be able to search for pets paginated', async () => {
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
    for (let i = 1; i <= 22; i++) {
      await petsRepository.create({
        name: `Pet ${i}`,
				city_id: city.id,
				org_id: org.id,
      })
    }

    const { pets } = await sut.execute({
			cityId: city.id,
      search: 'Pet',
      page: 2,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'Pet 21' }),
      expect.objectContaining({ name: 'Pet 22' }),
    ])
  })
})
