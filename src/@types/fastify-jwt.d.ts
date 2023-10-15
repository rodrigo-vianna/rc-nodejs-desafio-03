import '@fastify/jwt'
import { Role } from '../value-objects/role'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub: string
      role: Role
    }
  }
}
