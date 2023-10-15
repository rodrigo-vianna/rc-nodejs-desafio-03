export class OrganizationAlreadyExistsError extends Error {
  constructor() {
    super('Phone already exists')
    this.name = 'OrganizationAlreadyExistsError'
  }
}
