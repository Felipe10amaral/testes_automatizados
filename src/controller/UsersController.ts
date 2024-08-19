import { Request, Response } from 'express';
import { UserService } from '../useCases/UserUseCase';
import { z } from 'zod';

export class UsersController {
  private userService: UserService;

  public constructor(userService: UserService) {
    this.userService = userService;
  }

 private validation(dados: { name: string; email: string; password: string }) {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
    });

    const dadosValidados = registerBodySchema.parse(dados);
    return dadosValidados;
  } 

  public async createUser(request: Request, response: Response): Promise<Response> {
    try {
      const body = this.validation(request.body);
      const { name, email, password } = body;
      
      await this.userService.registerUser(name, email, password);

      return response.status(201).send();
    } catch (error: any) {
      return response.status(500).send({ message: error.message });
    }
  }

  public async listUser(request: Request, response: Response) {
    try {

      const user = await this.userService.listAllUser()

      return response.status(200).send(user)
    } catch (error: any) {
      return response.status(400).send({message: error})
    }
  }
}
