import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PrismaClient, Cliente } from '@prisma/client';
import { PrismaClienteRepository } from '../../repositories/Cliente/PrismaClientRepository';
import { IClienteRepository } from '../../contracts/IClientRepository';

// Mock do PrismaClient
const clienteMock = {
    create: vi.fn(),
    findMany: vi.fn(),
    findUnique: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
};

// Mock do PrismaClient com o clienteMock
const prismaMock = {
    cliente: clienteMock,
} as unknown as PrismaClient;

// Função para criar uma instância do repositório com o mock
function makeSut(): PrismaClienteRepository {
    return new PrismaClienteRepository();
}

describe('PrismaClienteRepository', () => {
    let sut: PrismaClienteRepository;

    beforeEach(() => {
        sut = makeSut();
        // Substituir o PrismaClient real pelo mock
        (sut as any).prisma = prismaMock;
        // Resetar os mocks antes de cada teste
        vi.clearAllMocks();
    });

    it('deve criar um novo cliente', async () => {
        // Arrange
        clienteMock.create.mockResolvedValue({} as Cliente);
        const nome = 'John Doe';
        const telefone = '123456789';
        const cpf = '00000000000';

        // Act
        await sut.createCliente(nome, telefone, cpf);

        // Assert
        expect(clienteMock.create).toHaveBeenCalledWith({
            data: {
                nome,
                telefone,
                cpf,
            },
        });
    });

    it('deve encontrar todos os clientes', async () => {
        // Arrange
        const clientes: Cliente[] = [
            { id: 1, nome: 'John Doe', telefone: '123456789', cpf: '00000000000' } as Cliente,
        ];
        clienteMock.findMany.mockResolvedValue(clientes);

        // Act
        const resultado = await sut.findAllClientes();

        // Assert
        expect(resultado).toEqual(clientes);
        expect(clienteMock.findMany).toHaveBeenCalled();
    });

    it('deve encontrar um cliente pelo ID', async () => {
        // Arrange
        const cliente: Cliente = { id: 1, nome: 'John Doe', telefone: '123456789', cpf: '00000000000' } as Cliente;
        clienteMock.findUnique.mockResolvedValue(cliente);
        const id = 1;

        // Act
        const resultado = await sut.findClienteById(id);

        // Assert
        expect(resultado).toEqual(cliente);
        expect(clienteMock.findUnique).toHaveBeenCalledWith({ where: { id } });
    });

    it('deve atualizar um cliente', async () => {
        // Arrange
        clienteMock.update.mockResolvedValue({} as Cliente);
        const id = 1;
        const dados = { nome: 'Jane Doe' };

        // Act
        await sut.updateCliente(id, dados);

        // Assert
        expect(clienteMock.update).toHaveBeenCalledWith({
            where: { id },
            data: dados,
        });
    });

    it('deve deletar um cliente', async () => {
        // Arrange
        clienteMock.delete.mockResolvedValue({} as Cliente);
        const id = 1;

        // Act
        await sut.deleteCliente(id);

        // Assert
        expect(clienteMock.delete).toHaveBeenCalledWith({ where: { id } });
    });
});
