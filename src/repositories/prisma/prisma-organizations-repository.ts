import { Organization, Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { IOrganizationsRepository } from '../organizations-repository'

export class PrismaOrganizationsRepository implements IOrganizationsRepository {
  async findById(id: string): Promise<Organization | null> {
    const organization = await prisma.organization.findUnique({
      where: {
        id,
      },
    })
    return organization
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = await prisma.organization.create({
      data,
    })
    return organization
  }

  async findByPhone(phone: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        phone,
      },
    })
    return organization
  }
}
