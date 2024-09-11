import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UserService } from '../UserUseCase';
import { IUserRepository } from '../../contracts/IUserRepository';

// Mock do UserRepository
const mockUserRepository: IUserRepository = {
  findByUsername: vi.fn(),
  createUser: vi.fn(),
  findAllUser: vi.fn(),
  findByUser: vi.fn(),
  updateUser: vi.fn(),
  deleteUser: vi.fn(),
};

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService(mockUserRepository);
    vi.clearAllMocks(); // Limpa os mocks entre testes
  });

  // Teste 1: Registro de usuário com nome de usuário já existente
  it('deve lançar um erro se o nome de usuário já estiver cadastrado', async () => {
    // Simula a existência de um nome de usuário
    (mockUserRepository.findByUsername as any).mockResolvedValue({ username: 'existingUser' });

    await expect(
      userService.registerUser('John Doe', 'existingUser', 'john@example.com', 'password123')
    ).rejects.toThrow('Usuario ja cadastrado');

    expect(mockUserRepository.findByUsername).toHaveBeenCalledWith('existingUser');
    expect(mockUserRepository.createUser).not.toHaveBeenCalled();
  });

  // Teste 2: Registro de usuário com sucesso
  it('deve criar um usuário com sucesso quando o nome de usuário não estiver em uso', async () => {
    // Simula que o nome de usuário não existe
    (mockUserRepository.findByUsername as any).mockResolvedValue(null);

    await userService.registerUser('John Doe', 'newUser', 'john@example.com', 'password123');

    expect(mockUserRepository.findByUsername).toHaveBeenCalledWith('newUser');
    expect(mockUserRepository.createUser).toHaveBeenCalledWith('John Doe', 'newUser', 'john@example.com', 'password123');
  });

  // Teste 3: Listar todos os usuários
  it('deve listar todos os usuários', async () => {
    const mockUsers = [
      { id: 1, name: 'John Doe', username: 'johndoe', email: 'john@example.com', password: 'password123' },
      { id: 2, name: 'Jane Doe', username: 'janedoe', email: 'jane@example.com', password: 'password456' },
    ];

    (mockUserRepository.findAllUser as any).mockResolvedValue(mockUsers);

    const users = await userService.listAllUser();

    expect(users).toEqual(mockUsers);
    expect(mockUserRepository.findAllUser).toHaveBeenCalled();
  });

  // Teste 4: Listar um único usuário
  it('deve retornar um usuário pelo ID', async () => {
    const mockUser = { id: 1, name: 'John Doe', username: 'johndoe', email: 'john@example.com', password: 'password123' };

    (mockUserRepository.findByUser as any).mockResolvedValue(mockUser);

    const user = await userService.listOneUser(1);

    expect(user).toEqual(mockUser);
    expect(mockUserRepository.findByUser).toHaveBeenCalledWith(1);
  });

  // Teste 5: Atualização de usuário sem nome de usuário fornecido
  it('deve lançar um erro ao tentar atualizar um usuário sem fornecer um nome de usuário', async () => {
    await expect(
      userService.updateUser(1, { email: 'newemail@example.com' })
    ).rejects.toThrow('Nome de usuário não fornecido');

    expect(mockUserRepository.updateUser).not.toHaveBeenCalled();
  });

  // Teste 6: Atualização de usuário com sucesso
  it('deve atualizar um usuário com sucesso quando todos os dados forem fornecidos', async () => {
    (mockUserRepository.updateUser as any).mockResolvedValue(undefined);

    await userService.updateUser(1, { username: 'newusername', email: 'newemail@example.com' });

    expect(mockUserRepository.updateUser).toHaveBeenCalledWith(1, { username: 'newusername', email: 'newemail@example.com' });
  });

  // Teste 7: Deletar um usuário com sucesso
  it('deve deletar um usuário com sucesso', async () => {
    (mockUserRepository.deleteUser as any).mockResolvedValue(undefined);

    await userService.deleteUser(1);

    expect(mockUserRepository.deleteUser).toHaveBeenCalledWith(1);
  });
});
