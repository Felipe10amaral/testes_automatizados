import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PrismaClient, Nota } from '@prisma/client';
import { NotaRepository } from './NotaRepository'; 
import { IClienteRepository } from '../../contracts/IClientRepository';

// Mock do PrismaClient
const notaMock = {
    create: vi.fn(),
    findMany: vi.fn(),
    findUnique: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
};

// Mock do PrismaClient com o notaMock
const prismaMock = {
    nota: notaMock,
} as unknown as PrismaClient;

// Mock do IClienteRepository
const clienteMock: IClienteRepository = {
    createCliente: vi.fn(),
    findAllClientes: vi.fn(),
    findClienteById: vi.fn(),
    updateCliente: vi.fn(),
    deleteCliente: vi.fn(),
};

// Função para criar uma instância do repositório com o mock
function makeSut(): NotaRepository {
    return new NotaRepository(clienteMock as any); // Type assertion para o mock
}

describe('NotaRepository', () => {
    let sut: NotaRepository;

    beforeEach(() => {
        sut = makeSut();
        // Substituir o PrismaClient real pelo mock
        (sut as any).prisma = prismaMock;
        // Resetar os mocks antes de cada teste
        vi.clearAllMocks();
    });

    it('deve criar uma nova nota', async () => {
        // Arrange
        notaMock.create.mockResolvedValue({} as Nota);
        const data = { nameCliente: 'John Doe', modelo: 'iPhone 13', defeito: 'Tela quebrada', valor: '300', clienteId: 1 };

        // Mock da verificação do cliente
        (clienteMock.findClienteById as any).mockResolvedValue({ id: 1, nome: 'John Doe', telefone: '1234567890', cpf: '00000000000' });

        // Act
        await sut.createNota(data);

        // Assert
        expect(notaMock.create).toHaveBeenCalledWith({
            data: {
                nameCliente: 'John Doe',
                modelo: 'iPhone 13',
                defeito: 'Tela quebrada',
                valor: '300',
                clienteId: 1,
            },
        });
    });

    it('deve lançar um erro se o cliente não existir ao criar uma nota', async () => {
        // Arrange
        const data = { nameCliente: 'John Doe', modelo: 'iPhone 13', defeito: 'Tela quebrada', valor: '300', clienteId: 1 };

        // Mock para retornar cliente não encontrado
        (clienteMock.findClienteById as any).mockResolvedValue(null);

        // Act & Assert
        await expect(sut.createNota(data)).rejects.toThrow('Cliente não encontrado');
    });

    it('deve encontrar todas as notas', async () => {
        // Arrange
        const notas: Nota[] = [
            { id: 1, nameCliente: 'John Doe', modelo: 'iPhone 13', defeito: 'Tela quebrada', valor: '300', clienteId: 1 } as Nota,
        ];
        notaMock.findMany.mockResolvedValue(notas);

        // Act
        const resultado = await sut.findAllNotas();

        // Assert
        expect(resultado).toEqual(notas);
        expect(notaMock.findMany).toHaveBeenCalled();
    });

    it('deve encontrar uma nota pelo ID', async () => {
        // Arrange
        const nota: Nota = { id: 1, nameCliente: 'John Doe', modelo: 'iPhone 13', defeito: 'Tela quebrada', valor: '300', clienteId: 1 } as Nota;
        notaMock.findUnique.mockResolvedValue(nota);
        const id = 1;

        // Act
        const resultado = await sut.findNotaById(id);

        // Assert
        expect(resultado).toEqual(nota);
        expect(notaMock.findUnique).toHaveBeenCalledWith({ where: { id } });
    });

    it('deve atualizar uma nota', async () => {
        // Arrange
        notaMock.update.mockResolvedValue({} as Nota);
        const id = 1;
        const dados = { nameCliente: 'Jane Doe' };

        // Act
        await sut.updateNota(id, dados);

        // Assert
        expect(notaMock.update).toHaveBeenCalledWith({
            where: { id },
            data: dados,
        });
    });

    it('deve deletar uma nota', async () => {
        // Arrange
        notaMock.delete.mockResolvedValue({} as Nota);
        const id = 1;

        // Act
        await sut.deleteNota(id);

        // Assert
        expect(notaMock.delete).toHaveBeenCalledWith({ where: { id } });
    });
});
