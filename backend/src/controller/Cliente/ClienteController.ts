import { Request, Response } from 'express';
import { UseCaseCliente } from '../../useCases/Cliente/UseCaseCliente';
import { IClienteRepository } from '../../contracts/IClientRepository';

export class ClienteController {
    private useCaseCliente: UseCaseCliente;

    constructor(clienteService: UseCaseCliente) {
        this.useCaseCliente = clienteService
    }

    // Método para criar um novo cliente com validação
    public async criarCliente(req: Request, res: Response): Promise<void> {
        const { nome, telefone, cpf } = req.body;

        // Validação dos dados
        if (!nome || typeof nome !== 'string' || nome.trim() === '') {
            res.status(400).json({ message: 'Nome é obrigatório e deve ser uma string não vazia.' });
            return;
        }

        if (!telefone || !/^\d{10,11}$/.test(telefone)) {
            res.status(400).json({ message: 'Telefone deve ser uma string de 10 ou 11 dígitos.' });
            return;
        }

        if (!cpf || !/^\d{11}$/.test(cpf)) {
            res.status(400).json({ message: 'CPF deve ser uma string de 11 dígitos.' });
            return;
        }

        try {
            await this.useCaseCliente.criarCliente(nome, telefone, cpf);
            res.status(201).json({ message: 'Cliente criado com sucesso.' });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    // Método para atualizar um cliente com validação
    public async atualizarCliente(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id, 10);
        const { nome, telefone, cpf } = req.body;

        if (isNaN(id) || id <= 0) {
            res.status(400).json({ message: 'ID inválido.' });
            return;
        }

        if (nome && (typeof nome !== 'string' || nome.trim() === '')) {
            res.status(400).json({ message: 'Nome deve ser uma string não vazia.' });
            return;
        }

        if (telefone && !/^\d{10,11}$/.test(telefone)) {
            res.status(400).json({ message: 'Telefone deve ser uma string de 10 ou 11 dígitos.' });
            return;
        }

        if (cpf && !/^\d{11}$/.test(cpf)) {
            res.status(400).json({ message: 'CPF deve ser uma string de 11 dígitos.' });
            return;
        }

        try {
            await this.useCaseCliente.atualizarCliente(id, { nome, telefone, cpf });
            res.status(200).json({ message: 'Cliente atualizado com sucesso.' });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    // Método para deletar um cliente
    public async deletarCliente(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id) || id <= 0) {
            res.status(400).json({ message: 'ID inválido.' });
            return;
        }

        try {
            await this.useCaseCliente.deletarCliente(id);
            res.status(200).json({ message: 'Cliente deletado com sucesso.' });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    // Método para listar todos os clientes
    public async listarClientes(req: Request, res: Response): Promise<void> {
        try {
            const clientes = await this.useCaseCliente.listarClientes();
            res.status(200).json(clientes);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    // Método para obter um cliente específico pelo ID
    public async obterClientePorId(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id) || id <= 0) {
            res.status(400).json({ message: 'ID inválido.' });
            return;
        }

        try {
            const cliente = await this.useCaseCliente.obterClientePorId(id);
            if (cliente) {
                res.status(200).json(cliente);
            } else {
                res.status(404).json({ message: 'Cliente não encontrado.' });
            }
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}
