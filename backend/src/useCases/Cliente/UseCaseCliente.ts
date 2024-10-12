import { IClienteRepository } from '../../contracts/IClientRepository';
import { Cliente } from '../../entities/Cliente';


export class UseCaseCliente {
    private clienteRepository: IClienteRepository;

    constructor(clienteRepository: IClienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    // Verifica se o nome ou CPF já estão em uso
    private async verificarDuplicidade(cpf: string): Promise<void> {
        const clientes = await this.clienteRepository.findAllClientes();
        if (clientes) {
            
            const cpfDuplicado = clientes.some(cliente => cliente.cpf === cpf);

           

            if (cpfDuplicado) {
                throw new Error('CPF já está em uso.');
            }
        }
    }

   
    async criarCliente(nome: string, telefone: string, cpf: string): Promise<void> {
        try {
            await this.verificarDuplicidade(cpf);
            

            await this.clienteRepository.createCliente(nome, telefone, cpf);
        } catch (error) {
            console.error('Error creating cliente:', error);
            throw new Error('Não foi possível criar o cliente.');
        }
    }

    async atualizarCliente(id: number, data: Partial<{ nome: string; telefone: string; cpf: string }>): Promise<void> {
        try {
            if (data.cpf) {
                await this.verificarDuplicidade(data.cpf || '');
            }

           

            await this.clienteRepository.updateCliente(id, data);
        } catch (error) {
            console.error('Error updating cliente:', error);
            throw new Error('Não foi possível atualizar o cliente.');
        }
    }

    async deletarCliente(id: number): Promise<void> {
        try {
            await this.clienteRepository.deleteCliente(id);
        } catch (error) {
            console.error('Error deleting cliente:', error);
            throw new Error('Não foi possível deletar o cliente.');
        }
    }

    async listarClientes(): Promise<Cliente[] | null> {
        try {
            return await this.clienteRepository.findAllClientes();
        } catch (error) {
            console.error('Error listing clientes:', error);
            throw new Error('Não foi possível listar os clientes.');
        }
    }

    async obterClientePorId(id: number): Promise<Cliente | null> {
        try {
            return await this.clienteRepository.findClienteById(id);
        } catch (error) {
            console.error(`Error finding cliente with ID ${id}:`, error);
            throw new Error(`Não foi possível encontrar o cliente com ID ${id}.`);
        }
    }
}

