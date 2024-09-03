import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UsersController } from './UsersController';
import { makeUsersController } from '../../useCases/factories/MakeRegisterUser';
import { Request, Response } from 'express';

describe('UsersController', () => {
  let sut: UsersController; // SUT (System Under Test)
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
 

  beforeEach(() => {
    // Usar a factory para criar uma instância do UsersController
    sut = makeUsersController();

    mockRequest = {};
    mockResponse = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    };

    // Mockar as dependências internas do UsersController
    vi.spyOn(sut['userService'], 'registerUser').mockImplementation(async () => {});
    vi.spyOn(sut['userService'], 'listAllUser').mockImplementation(async () => []);
    vi.spyOn(sut['userService'], 'updateUser').mockImplementation(async () => {});
    vi.spyOn(sut['userService'], 'deleteUser').mockImplementation(async () => {});
  });

  it('Deve ser possível criar um usuário', async () => {
    mockRequest.body = {
      name: 'John Doe',
      username: 'johndoe',
      email: 'john.doe@example.com',
      password: 'password123',
    };

    // Chama o método createUser do SUT passando os mocks de request e response.
    await sut.createUser(mockRequest as Request, mockResponse as Response);

    // Verifica se o status de resposta está correto.
    expect(mockResponse.status).toHaveBeenCalledWith(201);

    // Verifica se o método send foi chamado para enviar a resposta.
    expect(mockResponse.send).toHaveBeenCalled();

    // Verifica se o método registerUser foi chamado com os parâmetros corretos.
    expect(sut['userService'].registerUser).toHaveBeenCalledWith(
      'John Doe',
      'johndoe',
      'john.doe@example.com',
      'password123'
    );
  });


  it('Deve ser possível listar todos os usuários', async () => {
    const mockUsers = [
      { id: 1, name: 'John Doe', username: 'johndoe', email: 'john.doe@example.com', password: 'password123' },
      { id: 2, name: 'Jane Doe', username: 'janedoe', email: 'jane.doe@example.com', password: 'password456' },
    ];

    vi.spyOn(sut['userService'], 'listAllUser').mockResolvedValue(mockUsers);

    await sut.listUser(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(mockUsers);
  });




  it('Deve ser possível atualizar um usuário', async () => {
    mockRequest.params = { id: '1' };
    mockRequest.body = {
      name: 'John Doe',
      username: 'johndoe',
      email: 'john.doe.updated@example.com',
      password: 'newpassword123',

    };


    await sut.updateUser(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalled();
    expect(sut['userService'].updateUser).toHaveBeenCalledWith(1, {
      name: 'John Doe',
      username: 'johndoe',
      email: 'john.doe.updated@example.com',
      password: 'newpassword123',
    });
   }); 
   
   it('Deve ser possível deletar um usuário', async () => {
    const id = '1';
    await sut.deleteUser({ params: { id } } as unknown as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalled();
    expect(sut['userService'].deleteUser).toHaveBeenCalledWith(parseInt(id, 10));
  });
    
});
