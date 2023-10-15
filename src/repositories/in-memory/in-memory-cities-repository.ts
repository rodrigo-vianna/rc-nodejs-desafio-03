import { City, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { ICitiesRepository } from '../cities-repository'

export class InMemoryCitiesRepository implements ICitiesRepository {
  public items: City[] = []

  create(data: Prisma.CityCreateInput): Promise<City> {
    const city: City = {
      id: randomUUID(),
      name: data.name,
      state: data.state,
    }
    this.items.push(city)
    return Promise.resolve(city)
  }

  findById(id: string): Promise<City | null> {
    const checkIn = this.items.find((checkIn) => checkIn.id === id)
    return Promise.resolve(checkIn || null)
  }
}
