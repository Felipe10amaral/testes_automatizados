import { Request, Response, Router } from 'express';
import { makeUsersController } from '../useCases/factories/MakeRegisterUser';

export function usersRoutes() {
  const routes = Router();
  const usersController = makeUsersController();


  routes.post('/', (request: Request, response: Response) => {
    usersController.createUser(request, response);
  });

  routes.get('/', (request: Request, response: Response) => {
    usersController.listUser(request, response)
  })

  return routes
}
