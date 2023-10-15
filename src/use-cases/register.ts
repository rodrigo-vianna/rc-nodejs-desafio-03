import { Organization } from '@prisma/client'
import { hash } from 'bcryptjs'
import { IOrganizationsRepository } from '../repositories/organizations-repository'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

interface RegisterUseCaseRequest {
  name: string
  phone: string
  address: string
  password: string
}

interface RegisterUseCaseResponse {
  organization: Organization
}

export class RegisterUseCase {
  constructor(private readonly repository: IOrganizationsRepository) {}

  async execute({
    name,
    phone,
    address,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const organizationWithSameEmail = await this.repository.findByPhone(phone)

    if (organizationWithSameEmail) throw new OrganizationAlreadyExistsError()

    const passwordHash = await hash(password, 8)

    const organization = await this.repository.create({
      name,
      phone,
      address,
      password_hash: passwordHash,
    })
    return {
      organization,
    }
  }
}
