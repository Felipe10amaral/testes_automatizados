import { PrismaUserRepository } from '../PrismaUserRepository';
import { PrismaClient } from '@prisma/client';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock do PrismaClient
const mockPrismaClient = {
  user: {
    findUnique: vi.fn(),   // Simula o método findUnique do Prisma
    create: vi.fn(),       // Simula o método create do Prisma
    update: vi.fn(),       // Simula o método update do Prisma
    delete: vi.fn(),       // Simula o método delete do Prisma
    findMany: vi.fn(),     // Simula o método findMany do Prisma
  },
};

// Força o Vitest a usar o mock sempre que o PrismaClient for instanciado
vi.mock('@prisma/client', () => {
  return {
    PrismaClient: vi.fn().mockImplementation(() => mockPrismaClient),
  };
});

describe('PrismaUserRepository', () => {
  let sut: PrismaUserRepository;

  // Limpa os mocks antes de cada teste e cria uma nova instância do SUT (System Under Test)
  beforeEach(() => {
    sut = new PrismaUserRepository();
    vi.clearAllMocks(); // Limpa o estado dos mocks entre os testes
  });

  // Teste 1: Criação de um usuário com dados válidos
  it('deve criar um usuário com dados válidos', async () => {
    
    const mockUserData = { 
      name: 'John Doe', 
      username: 'johndoe', 
      email: 'john@example.com', 
      password: 'strongpassword123' 
    };

    // Mock do comportamento de `create` no Prisma
    mockPrismaClient.user.create.mockResolvedValue(mockUserData);

    // Chama o método `createUser` passando os dados simulados
    await sut.createUser(mockUserData.name, mockUserData.username, mockUserData.email, mockUserData.password);

    // Verifica se o método `create` do Prisma foi chamado com os dados corretos
    expect(mockPrismaClient.user.create).toHaveBeenCalledWith({
      data: mockUserData,
    });
  });

  // Teste 2: Deve lançar um erro ao tentar criar um usuário com dados inválidos
  it('deve lançar um erro ao tentar criar um usuário com dados inválidos', async () => {
    // Mock para simular erro quando o Prisma tenta criar um usuário
    mockPrismaClient.user.create.mockRejectedValue(new Error('Erro para criar usuário'));

    // Verifica se o erro é lançado corretamente quando os dados são inválidos
    await expect(
      sut.createUser('', 'invaliduser', 'invalidemail', 'weakpassword')
    ).rejects.toThrow('Erro para criar usuário');
  });

  // Teste 3: Atualização de um usuário com dados válidos
  it('deve atualizar um usuário com dados válidos', async () => {
    const mockUserData = {
      name: 'Updated Name',
      username: 'updateduser',
      email: 'updated@example.com',
      password: 'newpassword123',
    };

    // Mock do comportamento de `update` no Prisma
    mockPrismaClient.user.update.mockResolvedValue(mockUserData);

    // Chama o método `updateUser` passando o id e os dados simulados
    await sut.updateUser(1, mockUserData);

    // Verifica se o método `update` do Prisma foi chamado com os dados corretos
    expect(mockPrismaClient.user.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: mockUserData,
    });
  });

  // Teste 4: Retornar um usuário ao buscar pelo id
  it('deve retornar um usuário ao buscar pelo id', async () => {
    const mockUser = {
      name: 'Jane Doe',
      username: 'janedoe',
      email: 'jane@example.com',
    };

    // Mock do comportamento de `findUnique` no Prisma
    mockPrismaClient.user.findUnique.mockResolvedValue(mockUser);

    // Chama o método `findByUser` passando o id
    const user = await sut.findByUser(1);

    // Verifica se o método `findUnique` do Prisma foi chamado corretamente
    expect(mockPrismaClient.user.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      select: { name: true, username: true, email: true },
    });

    // Verifica se o usuário retornado é o mesmo que o mockado
    expect(user).toEqual(mockUser);
  });

  // Teste 5: Deletar um usuário pelo id
  it('deve deletar um usuário pelo id', async () => {
    // Mock do comportamento de `delete` no Prisma
    mockPrismaClient.user.delete.mockResolvedValue(undefined);

    // Chama o método `deleteUser` passando o id
    await sut.deleteUser(1);

    // Verifica se o método `delete` do Prisma foi chamado corretamente
    expect(mockPrismaClient.user.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
