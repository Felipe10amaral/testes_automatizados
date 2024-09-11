import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, Response } from 'express';
import { ClienteController } from './ClienteController';
import { UseCaseCliente } from '../../useCases/Cliente/UseCaseCliente';
import { IClienteRepository } from '../../contracts/IClientRepository';

describe('ClienteController', () => {
    let clienteController: ClienteController;
    let useCaseClienteMock: vi.Mocked<UseCaseCliente>;

    beforeEach(() => {
        useCaseClienteMock = {
            criarCliente: vi.fn(),
            atualizarCliente: vi.fn(),
            deletarCliente: vi.fn(),
            listarClientes: vi.fn(),
            obterClientePorId: vi.fn(),
        } as any;
        clienteController = new ClienteController(useCaseClienteMock as IClienteRepository);
    });

    it('deve retornar erro se o nome for inválido ao criarCliente', async () => {
        const req = { body: { nome: '', telefone: '1234567890', cpf: '12345678901' } } as Request;
        const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as unknown as Response;

        await clienteController.criarCliente(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Nome é obrigatório e deve ser uma string não vazia.' });
    });

    it('deve retornar erro se o telefone for inválido ao criarCliente', async () => {
        const req = { body: { nome: 'João', telefone: '123', cpf: '12345678901' } } as Request;
        const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as unknown as Response;

        await clienteController.criarCliente(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Telefone deve ser uma string de 10 ou 11 dígitos.' });
    });

    it('deve retornar erro se o CPF for inválido ao criarCliente', async () => {
        const req = { body: { nome: 'João', telefone: '12345678901', cpf: '12345678' } } as Request;
        const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as unknown as Response;

        await clienteController.criarCliente(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'CPF deve ser uma string de 11 dígitos.' });
    });

    it('deve retornar erro se nome, telefone ou cpf não forem strings ao criarCliente', async () => {
        const invalidInputs = [
            { body: { nome: 123, telefone: '12345678901', cpf: '12345678901' }, expected: 'Nome deve ser uma string não vazia.' },
            { body: { nome: 'João', telefone: 12345678901, cpf: '12345678901' }, expected: 'Telefone deve ser uma string de 10 ou 11 dígitos.' },
            { body: { nome: 'João', telefone: '12345678901', cpf: 12345678901 }, expected: 'CPF deve ser uma string de 11 dígitos.' },
            { body: { nome: [], telefone: '12345678901', cpf: '12345678901' }, expected: 'Nome deve ser uma string não vazia.' },
            { body: { nome: 'João', telefone: {}, cpf: '12345678901' }, expected: 'Telefone deve ser uma string de 10 ou 11 dígitos.' },
            { body: { nome: 'João', telefone: '12345678901', cpf: [] }, expected: 'CPF deve ser uma string de 11 dígitos.' },
        ];

        for (const { body, expected } of invalidInputs) {
            const req = { body } as Request;
            const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as unknown as Response;

            await clienteController.criarCliente(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
           
        }
    });

    it('deve retornar erro ao criarCliente se o UseCaseCliente falhar', async () => {
        const req = { body: { nome: 'João', telefone: '12345678901', cpf: '12345678901' } } as Request;
        const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as unknown as Response;

        useCaseClienteMock.criarCliente.mockRejectedValueOnce(new Error('Erro ao criar cliente'));

        await clienteController.criarCliente(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Não foi possível criar o cliente.' });
    });

    // Adicione outros testes conforme necessário
});
