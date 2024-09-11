import { PrismaClient } from '@prisma/client';
import { INotaRepository } from '../../contracts/INotaRepository';
import { Nota } from '../../entities/Nota';
import { IClienteRepository } from '../../contracts/IClientRepository';

export class NotaRepository implements INotaRepository {
  private clienteRepository: IClienteRepository;
  private prisma: PrismaClient;

  constructor(clienteRepository: IClienteRepository) {
    this.clienteRepository = clienteRepository;
    this.prisma = new PrismaClient();
  }

  // Criar uma nova nota no banco de dados, verificando se o cliente existe
  async createNota(data: { nameCliente: string; modelo: string; defeito: string; valor: string; clienteId: number }): Promise<void> {
    // Verificar se o cliente (clienteId) existe no banco de dados
    const cliente = await this.clienteRepository.findClienteById(data.clienteId);

    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }

    // Se o cliente existir, criar a nota
    await this.prisma.nota.create({
      data: {
        nameCliente: data.nameCliente,
        modelo: data.modelo,
        defeito: data.defeito,
        valor: data.valor,
        clienteId: data.clienteId,
      },
    });
  }

  // Buscar todas as notas no banco de dados
  async findAllNotas(): Promise<Nota[]> {
    return await this.prisma.nota.findMany();
  }

  // Buscar uma nota pelo ID
  async findNotaById(id: number): Promise<Nota | null> {
    return await this.prisma.nota.findUnique({
      where: { id },
    });
  }

  // Atualizar uma nota no banco de dados
  async updateNota(id: number, data: Partial<{ nameCliente: string; modelo: string; defeito: string; valor: string; clienteId: number }>): Promise<void> {
    // Se for necessário validar o cliente durante a atualização
    if (data.clienteId) {
      const cliente = await this.clienteRepository.findClienteById(data.clienteId);
      if (!cliente) {
        throw new Error('Cliente não encontrado');
      }
    }

    await this.prisma.nota.update({
      where: { id },
      data,
    });
  }

  // Deletar uma nota pelo ID
  async deleteNota(id: number): Promise<void> {
    await this.prisma.nota.delete({
      where: { id },
    });
  }
}
