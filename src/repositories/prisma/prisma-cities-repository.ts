import { City } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { ICitiesRepository } from '../cities-repository'

export class PrismaCitiesRepository implements ICitiesRepository {
  async findById(id: string): Promise<City | null> {
    const checkIn = await prisma.city.findUnique({
      where: {
        id,
      },
    })
    return checkIn
  }
}
