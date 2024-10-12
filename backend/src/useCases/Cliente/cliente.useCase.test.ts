import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UseCaseCliente } from '../../useCases/Cliente/UseCaseCliente';
import { IClienteRepository } from '../../contracts/IClientRepository';
import { Cliente } from '../../entities/Cliente';

// Mock do IClienteRepository
const mockClienteRepository: IClienteRepository = {
    createCliente: vi.fn(),
    findAllClientes: vi.fn(),
    findClienteById: vi.fn(),
    updateCliente: vi.fn(),
    deleteCliente: vi.fn(),
};

describe('UseCaseCliente', () => {
    let useCaseCliente: UseCaseCliente;

    beforeEach(() => {
        useCaseCliente = new UseCaseCliente(mockClienteRepository);
        vi.clearAllMocks(); // Limpa os mocks entre testes
    });

    // Teste 1: Criação de cliente com sucesso
    it('deve criar um cliente com sucesso quando o nome e CPF não estiverem em uso', async () => {
        // Arrange
        (mockClienteRepository.findAllClientes as any).mockResolvedValue([]);
        (mockClienteRepository.createCliente as any).mockResolvedValue(undefined);
        const nome = 'John Doe';
        const telefone = '123456789';
        const cpf = '00000000000';

        // Act
        await useCaseCliente.criarCliente(nome, telefone, cpf);

        // Assert
        expect(mockClienteRepository.createCliente).toHaveBeenCalledWith(nome, telefone, cpf);
    });

    // Teste 2: Criação de cliente com CPF já em uso
    it('não deve criar um cliente se o CPF já estiver em uso', async () => {
        // Arrange
        (mockClienteRepository.findAllClientes as any).mockResolvedValue([
            { id: 1, nome: 'Jane Doe', cpf: '00000000000', telefone: '123456789' }
        ] as Cliente[]);
        const nome = 'John Doe';
        const telefone = '123456789';
        const cpf = '00000000000';

        // Act & Assert
        await expect(useCaseCliente.criarCliente(nome, telefone, cpf)).rejects.toThrow('Não foi possível criar o cliente.');

        // Verifica que createCliente não foi chamado
        expect(mockClienteRepository.createCliente).not.toHaveBeenCalled();
    });

    // Teste 3: Atualização de cliente com sucesso
    it('deve atualizar um cliente com sucesso quando todos os dados forem fornecidos', async () => {
        // Arrange
        (mockClienteRepository.findAllClientes as any).mockResolvedValue([]);
        (mockClienteRepository.updateCliente as any).mockResolvedValue(undefined);
        const id = 1;
        const dados = { nome: 'Jane Doe' };

        // Act
        await useCaseCliente.atualizarCliente(id, dados);

        // Assert
        expect(mockClienteRepository.updateCliente).toHaveBeenCalledWith(id, dados);
    });

    // Teste 4: Listar todos os clientes
    it('deve listar todos os clientes', async () => {
        // Arrange
        const clientes: Cliente[] = [
            { id: 1, nome: 'John Doe', telefone: '123456789', cpf: '00000000000' },
        ];
        (mockClienteRepository.findAllClientes as any).mockResolvedValue(clientes);

        // Act
        const resultado = await useCaseCliente.listarClientes();

        // Assert
        expect(resultado).toEqual(clientes);
        expect(mockClienteRepository.findAllClientes).toHaveBeenCalled();
    });

    // Teste 5: Obter cliente por ID
    it('deve obter um cliente pelo ID', async () => {
        // Arrange
        const cliente: Cliente = { id: 1, nome: 'John Doe', telefone: '123456789', cpf: '00000000000' };
        (mockClienteRepository.findClienteById as any).mockResolvedValue(cliente);
        const id = 1;

        // Act
        const resultado = await useCaseCliente.obterClientePorId(id);

        // Assert
        expect(resultado).toEqual(cliente);
        expect(mockClienteRepository.findClienteById).toHaveBeenCalledWith(id);
    });

    // Teste 6: Deletar cliente com sucesso
    it('deve deletar um cliente com sucesso', async () => {
        // Arrange
        (mockClienteRepository.deleteCliente as any).mockResolvedValue(undefined);
        const id = 1;

        // Act
        await useCaseCliente.deletarCliente(id);

        // Assert
        expect(mockClienteRepository.deleteCliente).toHaveBeenCalledWith(id);
    });
});
