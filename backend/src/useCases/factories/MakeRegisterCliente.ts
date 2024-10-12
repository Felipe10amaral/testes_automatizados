import { UseCaseCliente } from '../Cliente/UseCaseCliente';
import { PrismaClienteRepository } from '../../repositories/Cliente/PrismaClientRepository';

export function makeClientesUseCase(): UseCaseCliente {
  const clienteRepository = new PrismaClienteRepository();
  return new UseCaseCliente(clienteRepository);
}
