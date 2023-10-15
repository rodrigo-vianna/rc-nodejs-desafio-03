import { City, Prisma } from '@prisma/client'

export interface ICitiesRepository {
  findById(id: string): Promise<City | null>
  create(data: Prisma.CityCreateInput): Promise<City>
}
