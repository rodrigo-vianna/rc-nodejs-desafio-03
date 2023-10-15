import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { IPetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements IPetsRepository {
  public items: Pet[] = []

  searchMany(cityId: string, query: string, page: number): Promise<Pet[]> {
    const pets = this.items
      .filter(
        (pet) =>
          pet.city_id === cityId &&
          pet.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
      )
      .slice((page - 1) * 20, page * 20)
    return Promise.resolve(pets)
  }

  findById(id: string): Promise<Pet | null> {
    const pet = this.items.find((checkIn) => checkIn.id === id)
    return Promise.resolve(pet || null)
  }

  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      city_id: data.city_id,
      org_id: data.org_id,
      created_at: new Date(),
    }
    this.items.push(pet)
    return Promise.resolve(pet)
  }
}
