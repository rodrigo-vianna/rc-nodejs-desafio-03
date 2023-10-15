import { Organization, Prisma } from '@prisma/client'

export interface IOrganizationsRepository {
  findById(id: string): Promise<Organization | null>
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>
  findByPhone(phone: string): Promise<Organization | null>
}
