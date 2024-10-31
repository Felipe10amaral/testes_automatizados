import { Request, Response, Router } from 'express';
import { makeClientesUseCase } from '../useCases/factories/MakeRegisterCliente';

export function clientesRoutes() {
  const routes = Router();
  const clienteController = makeClientesUseCase();


  routes.post('/', (request: Request, response: Response) => {
    clienteController.criarCliente(request, response);
  });

  routes.get('/', (request: Request, response: Response) => {
    clienteController.listarClientes(request, response)
  })

  routes.put('/:id', (request: Request, response: Response) => {
    clienteController.obterClientePorId(request, response)
  })

  routes.delete('/:id', (request: Request, response: Response) => {
    clienteController.deletarCliente(request, response)
  })

  return routes
}
