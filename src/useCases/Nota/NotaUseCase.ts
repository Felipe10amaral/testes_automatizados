// src/usecases/UseCaseNota.ts
import { INotaRepository } from '../../contracts/INotaRepository';
import { IClienteRepository } from '../../contracts/IClientRepository';
import { Nota } from '../../entities/Nota';
import { Cliente } from '../../entities/Cliente';

export class UseCaseNota {
    private notaRepository: INotaRepository;
    private clienteRepository: IClienteRepository;

    constructor(notaRepository: INotaRepository, clienteRepository: IClienteRepository) {
        this.notaRepository = notaRepository;
        this.clienteRepository = clienteRepository;
    }

    // Verifica se o cliente existe
    private async verificarClienteExistente(clienteId: number): Promise<void> {
        const cliente = await this.clienteRepository.findClienteById(clienteId);
        if (!cliente) {
            throw new Error('Cliente não encontrado.');
        }
    }

    // Cria uma nova nota
    async criarNota(clienteId: number, nameCliente: string, modelo: string, defeito: string, valor: string): Promise<void> {
        try {
            await this.verificarClienteExistente(clienteId);
            const notaData = { nameCliente, modelo, defeito, valor, clienteId };
            await this.notaRepository.createNota(notaData);
        } catch (error) {
            console.error('Erro ao criar nota:', error);
            throw new Error('Não foi possível criar a nota.');
        }
    }

    // Atualiza uma nota existente
    async atualizarNota(id: number, dados: Partial<{ clienteId: number; nameCliente: string; modelo: string; defeito: string; valor: string }>): Promise<void> {
        try {
            if (dados.clienteId) {
                await this.verificarClienteExistente(dados.clienteId);
            }

            await this.notaRepository.updateNota(id, dados);
        } catch (error) {
            console.error('Erro ao atualizar nota:', error);
            throw new Error('Não foi possível atualizar a nota.');
        }
    }

    // Deleta uma nota
    async deletarNota(id: number): Promise<void> {
        try {
            await this.notaRepository.deleteNota(id);
        } catch (error) {
            console.error('Erro ao deletar nota:', error);
            throw new Error('Não foi possível deletar a nota.');
        }
    }

    // Lista todas as notas
    async listarNotas(): Promise<Nota[] | null> {
        try {
            return await this.notaRepository.findAllNotas();
        } catch (error) {
            console.error('Erro ao listar notas:', error);
            throw new Error('Não foi possível listar as notas.');
        }
    }

    // Obtém uma nota pelo ID
    async obterNotaPorId(id: number): Promise<Nota | null> {
        try {
            return await this.notaRepository.findNotaById(id);
        } catch (error) {
            console.error(`Erro ao encontrar nota com ID ${id}:`, error);
            throw new Error(`Não foi possível encontrar a nota com ID ${id}.`);
        }
    }
}
