import { Organization } from '@prisma/client'
import { compare } from 'bcryptjs'
import { IOrganizationsRepository } from '../repositories/organizations-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticateUseCaseRequest {
  phone: string
  password: string
}

interface AuthenticateUseCaseResponse {
  organization: Organization
}

export class AuthenticateUseCase {
  constructor(private organizationsRepository: IOrganizationsRepository) {}

  async execute({
    phone,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const organization = await this.organizationsRepository.findByPhone(phone)
    if (!organization) throw new InvalidCredentialsError()

    const doesPasswordMatch = await compare(
      password,
      organization.password_hash,
    )
    if (!doesPasswordMatch) throw new InvalidCredentialsError()
    return {
      organization,
    }
  }
}
