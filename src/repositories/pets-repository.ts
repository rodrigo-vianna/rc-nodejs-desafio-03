import { Pet, Prisma } from '@prisma/client'

export interface IPetsRepository {
  findById(id: string): Promise<Pet | null>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  searchMany(cityId: string, query: string, page: number): Promise<Pet[]>
}
