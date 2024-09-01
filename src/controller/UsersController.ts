import { Request, Response } from 'express';
import { UserService } from '../useCases/UserUseCase';
import { z } from 'zod';

export class UsersController {
  private userService: UserService;

  public constructor(userService: UserService) {
    this.userService = userService;
  }

 private validation(id: string, name: string, username: string, email: string, password: string ) {

    const idConvertido = parseInt(id, 10);
    
    const registerBodySchema = z.object({
      id: z.number(),
      name: z.string(),
      username: z.string(),
      email: z.string().email(),
      password: z.string(),
    });

    // Cria um objeto com todos os dados
    const dados = {
      id: idConvertido,
      name,
      username,
      email,
      password,
  };

    const dadosValidados = registerBodySchema.parse(dados);
    return dadosValidados;
  } 

  public async createUser(request: Request, response: Response): Promise<Response> {
    try {
      
      const { name, username ,email, password } = request.body;
      
      await this.userService.registerUser(name, username ,email, password);

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

  public async updateUser(request: Request, response: Response) {
    try {

      const { id } = request.params;
      const { name, username ,email, password } = request.body;

      const dadosValidados = this.validation(id, name, username ,email, password);
      
      await this.userService.updateUser(dadosValidados.id, { name, username ,email, password });

      return response.status(200).send();
    } catch (error: any) {
      return response.status(400).send({ message: error.message });
    }
  }

  public async deleteUser(request: Request, response: Response) {
    try {
      const { id } = request.params;

      await this.userService.deleteUser(parseInt(id, 10));

      return response.status(200).send();
    } catch (error: any) {
      return response.status(400).send({ message: error.message });
    }
  }
}
