import { PrismaClient } from '@prisma/client'
import { user } from '../useCases/registerUser'

const prisma = new PrismaClient()

class UsersRepository {
  async create(user: user) {
    await prisma.user.create({
      data: user,
    })
  }
}

export default new UsersRepository()
