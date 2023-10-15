import { Pet, Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { IPetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements IPetsRepository {
  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })
    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    })
    return pet
  }

  async searchMany(
    cityId: string,
    query: string,
    page: number,
  ): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
        city: {
          id: cityId,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })
    return pets
  }
}
