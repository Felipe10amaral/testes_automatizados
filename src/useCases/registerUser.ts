import userRepository from '../repositories/userRepository'

export type user = {
  name: string
  password: string
  email: string
}

class UsersServices {
  async create({ name, email, password }: user) {
    const user = { name, email, password }
    await userRepository.create(user)
  }
}

export default new UsersServices()
