import { Organization, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { IOrganizationsRepository } from '../organizations-repository'

export class InMemoryOrganizationsRepository
  implements IOrganizationsRepository
{
  public items: Organization[] = []

  findById(id: string): Promise<Organization | null> {
    const organization = this.items.find(
      (organization) => organization.id === id,
    )
    return Promise.resolve(organization || null)
  }

  create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const organization: Organization = {
      id: randomUUID(),
      name: data.name,
      phone: data.phone,
      address: data.address,
      password_hash: data.password_hash,
      created_at: new Date(),
    }
    this.items.push(organization)
    return Promise.resolve(organization)
  }

  findByPhone(phone: string): Promise<Organization | null> {
    const organization = this.items.find(
      (organization) => organization.phone === phone,
    )
    return Promise.resolve(organization || null)
  }
}
