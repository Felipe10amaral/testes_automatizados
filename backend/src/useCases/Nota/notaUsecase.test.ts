// src/usecases/UseCaseNota.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UseCaseNota } from './NotaUseCase';
import { INotaRepository } from '../../contracts/INotaRepository';
import { IClienteRepository } from '../../contracts/IClientRepository';
import { Nota } from '../../entities/Nota';
import { Cliente } from '../../entities/Cliente';

// Mock para o repositório de notas
const notaRepositoryMock: INotaRepository = {
    createNota: vi.fn(),
    findAllNotas: vi.fn(),
    findNotaById: vi.fn(),
    updateNota: vi.fn(),
    deleteNota: vi.fn(),
};

// Mock para o repositório de clientes
const clienteRepositoryMock: IClienteRepository = {
    createCliente: vi.fn(),
    findAllClientes: vi.fn(),
    findClienteById: vi.fn(),
    updateCliente: vi.fn(),
    deleteCliente: vi.fn(),
};

// Função para criar uma instância do caso de uso com os mocks
function makeSut(): UseCaseNota {
    return new UseCaseNota(notaRepositoryMock, clienteRepositoryMock);
}

describe('UseCaseNota', () => {
    let sut: UseCaseNota;

    beforeEach(() => {
        sut = makeSut();
        // Resetar os mocks antes de cada teste para evitar interferência entre os testes
        vi.clearAllMocks();
    });

    it('deve criar uma nova nota', async () => {
        // Arrange
        // Mock para retornar um cliente válido ao buscar pelo ID
        const obj = {id: 1, nameCliente: "Cliente teste", telefone: '1234567890', cpf: '00000000000' }
        clienteRepositoryMock.findClienteById = vi.fn().mockResolvedValue(obj);
        // Mock para garantir que o método createNota seja chamado sem erro
        notaRepositoryMock.createNota = vi.fn().mockResolvedValue(undefined);

        // Dados para a criação da nota
        const clienteId = 1;
        const nameCliente = 'Cliente Teste';
        const modelo = 'Modelo Exemplo';
        const defeito = 'Defeito Exemplo';
        const valor = '100';

        // Act
        // Tenta criar a nota com os dados fornecidos
        await sut.criarNota(clienteId, nameCliente, modelo, defeito, valor);

        // Assert
        // Verifica se o cliente foi buscado pelo ID
        expect(clienteRepositoryMock.findClienteById).toHaveBeenCalledWith(clienteId);
        // Verifica se o método createNota foi chamado com os dados corretos
        expect(notaRepositoryMock.createNota).toHaveBeenCalledWith({ nameCliente, modelo, defeito, valor, clienteId });
    });

    it('deve lançar erro ao criar uma nota com cliente não encontrado', async () => {
        // Arrange
        // Mock para retornar null ao buscar um cliente, indicando que o cliente não foi encontrado
        clienteRepositoryMock.findClienteById = vi.fn().mockResolvedValue(null);

        // Dados para a criação da nota
        const clienteId = 1;
        const nameCliente = 'Cliente Teste';
        const modelo = 'Modelo Exemplo';
        const defeito = 'Defeito Exemplo';
        const valor = '100';

        // Act & Assert
        // Verifica se a função criarNota lança um erro quando o cliente não é encontrado
        await expect(sut.criarNota(clienteId, nameCliente, modelo, defeito, valor)).rejects.toThrow('Não foi possível criar a nota.');
    });

    it('deve atualizar uma nota existente', async () => {
        // Arrange
        // Mock para retornar um cliente válido ao buscar pelo ID
        const obj = {id: 1, nameCliente: "Cliente teste", telefone: '1234567890', cpf: '00000000000' }
        clienteRepositoryMock.findClienteById = vi.fn().mockResolvedValue(obj);
        // Mock para garantir que o método updateNota seja chamado sem erro
        notaRepositoryMock.updateNota = vi.fn().mockResolvedValue(undefined);

        // Dados para atualizar a nota
        const id = 1;
        const dados = { clienteId: 1, nameCliente: 'Cliente Atualizado', modelo: 'Modelo Atualizado' };

        // Act
        // Tenta atualizar a nota com os dados fornecidos
        await sut.atualizarNota(id, dados);

        // Assert
        // Verifica se o cliente foi buscado pelo ID
        expect(clienteRepositoryMock.findClienteById).toHaveBeenCalledWith(dados.clienteId);
        // Verifica se o método updateNota foi chamado com os dados corretos
        expect(notaRepositoryMock.updateNota).toHaveBeenCalledWith(id, dados);
    });

    it('não deve atualizar uma nota se o cliente não existir', async () => {
        // Arrange
        // Mock para retornar null ao buscar um cliente, indicando que o cliente não foi encontrado
        clienteRepositoryMock.findClienteById = vi.fn().mockResolvedValue(null);

        // Dados para atualizar a nota
        const id = 1;
        const dados = { clienteId: 1, nameCliente: 'Cliente Atualizado' };

        // Act & Assert
        // Verifica se a função atualizarNota lança um erro quando o cliente não é encontrado
        await expect(sut.atualizarNota(id, dados)).rejects.toThrow('Não foi possível atualizar a nota.');
    });

    it('deve deletar uma nota', async () => {
        // Arrange
        // Mock para garantir que o método deleteNota seja chamado sem erro
        notaRepositoryMock.deleteNota = vi.fn().mockResolvedValue(undefined);

        // ID da nota a ser deletada
        const id = 1;

        // Act
        // Tenta deletar a nota com o ID fornecido
        await sut.deletarNota(id);

        // Assert
        // Verifica se o método deleteNota foi chamado com o ID correto
        expect(notaRepositoryMock.deleteNota).toHaveBeenCalledWith(id);
    });

    it('deve listar todas as notas', async () => {
        // Arrange
        // Mock para retornar uma lista de notas
        const notas: Nota[] = [{ id: 1, nameCliente: 'Cliente Teste', modelo: 'Modelo Exemplo', defeito: 'Defeito Exemplo', valor: '100', clienteId: 1 } as Nota];
        notaRepositoryMock.findAllNotas = vi.fn().mockResolvedValue(notas);

        // Act
        // Tenta listar todas as notas
        const resultado = await sut.listarNotas();

        // Assert
        // Verifica se a lista de notas retornada é a esperada
        expect(resultado).toEqual(notas);
        // Verifica se o método findAllNotas foi chamado
        expect(notaRepositoryMock.findAllNotas).toHaveBeenCalled();
    });

    it('deve obter uma nota por ID', async () => {
        // Arrange
        // Mock para retornar uma nota válida ao buscar pelo ID
        const nota: Nota = { id: 1, nameCliente: 'Cliente Teste', modelo: 'Modelo Exemplo', defeito: 'Defeito Exemplo', valor: '100', clienteId: 1 } as Nota;
        notaRepositoryMock.findNotaById = vi.fn().mockResolvedValue(nota);

        // ID da nota a ser obtida
        const id = 1;

        // Act
        // Tenta obter a nota com o ID fornecido
        const resultado = await sut.obterNotaPorId(id);

        // Assert
        // Verifica se a nota retornada é a esperada
        expect(resultado).toEqual(nota);
        // Verifica se o método findNotaById foi chamado com o ID correto
        expect(notaRepositoryMock.findNotaById).toHaveBeenCalledWith(id);
    });

    it('deve lançar erro ao obter uma nota por ID se a nota não for encontrada', async () => {
        // Arrange
        // Mock para retornar null ao buscar uma nota, indicando que a nota não foi encontrada
        notaRepositoryMock.findNotaById = vi.fn().mockResolvedValue(null);

        // ID da nota a ser obtida
        const id = 1;

        // Act
        // Tenta obter a nota com o ID fornecido
       const resultado = await sut.obterNotaPorId(id);

       // Assert
       // Verifica se o resultado é null
       expect(resultado).toBeNull()
    });
});
