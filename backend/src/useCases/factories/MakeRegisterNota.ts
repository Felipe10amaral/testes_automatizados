import { NotaController } from '../../controller/Nota/NotaController';
import { UseCaseNota } from '../../useCases/Nota/NotaUseCase';
import { NotaRepository } from '../../repositories/Nota/NotaRepository';
import { PrismaClienteRepository } from '../../repositories/Cliente/PrismaClientRepository';

export function makeNotaController(): NotaController {
    const clienteRepository = new PrismaClienteRepository();
    const notaRepository = new NotaRepository(clienteRepository);
    const useCaseNota = new UseCaseNota(notaRepository, clienteRepository);
    return new NotaController(useCaseNota);
}
