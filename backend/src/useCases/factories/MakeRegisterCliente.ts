import { UseCaseCliente } from '../Cliente/UseCaseCliente';
import { PrismaClienteRepository } from '../../repositories/Cliente/PrismaClientRepository';
import { ClienteController } from '../../controller/Cliente/ClienteController';


export function makeClientesUseCase(): ClienteController {
  const clienteRepository = new PrismaClienteRepository();
  const clienteService = new UseCaseCliente(clienteRepository);
  return new ClienteController(clienteService);
}
