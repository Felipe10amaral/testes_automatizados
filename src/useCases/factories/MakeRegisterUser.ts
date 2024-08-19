// src/useCases/factories/MakeRegisterUser.ts
import { UsersController } from '../../controller/UsersController';
import { UserService } from '../../useCases/UserUseCase';
import { PrismaUserRepository } from '../../repositories/PrismaUserRepository';

export function makeUsersController(): UsersController {
  const userRepository = new PrismaUserRepository();
  const userService = new UserService(userRepository);
  return new UsersController(userService);
}
