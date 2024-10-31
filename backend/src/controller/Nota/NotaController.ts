import { Request, Response } from 'express';
import { UseCaseNota } from '../../useCases/Nota/NotaUseCase';

export class NotaController {
    private useCaseNota: UseCaseNota;

    constructor(useCaseNota: UseCaseNota) {
        this.useCaseNota = useCaseNota;
    }

    // Método para criar uma nova nota
    public async criarNota(req: Request, res: Response): Promise<void> {
        const { clienteId, nameCliente, modelo, defeito, valor } = req.body;

        console.log(clienteId, nameCliente, modelo, defeito, valor);

        if (!nameCliente || typeof nameCliente !== 'string' || nameCliente.trim() === '') {
            res.status(400).json({ message: 'Nome do cliente é obrigatório e deve ser uma string não vazia.' });
            return;
        }

        if (!modelo || typeof modelo !== 'string' || modelo.trim() === '') {
            res.status(400).json({ message: 'Modelo é obrigatório e deve ser uma string não vazia.' });
            return;
        }

        if (!defeito || typeof defeito !== 'string' || defeito.trim() === '') {
            res.status(400).json({ message: 'Defeito é obrigatório e deve ser uma string não vazia.' });
            return;
        }

        if (!valor || isNaN(parseFloat(valor))) {
            res.status(400).json({ message: 'Valor deve ser um número válido.' });
            return;
        }

        try {
            await this.useCaseNota.criarNota(clienteId, nameCliente, modelo, defeito, valor);
            res.status(201).json({ message: 'Nota criada com sucesso.' });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    // Método para atualizar uma nota
    public async atualizarNota(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id, 10);
        const { clienteId, nameCliente, modelo, defeito, valor } = req.body;

        if (isNaN(id) || id <= 0) {
            res.status(400).json({ message: 'ID inválido.' });
            return;
        }

        if (valor && isNaN(parseFloat(valor))) {
            res.status(400).json({ message: 'Valor deve ser um número válido.' });
            return;
        }

        try {
            await this.useCaseNota.atualizarNota(id, { clienteId, nameCliente, modelo, defeito, valor });
            res.status(200).json({ message: 'Nota atualizada com sucesso.' });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    // Método para deletar uma nota
    public async deletarNota(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id) || id <= 0) {
            res.status(400).json({ message: 'ID inválido.' });
            return;
        }

        try {
            await this.useCaseNota.deletarNota(id);
            res.status(200).json({ message: 'Nota deletada com sucesso.' });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    // Método para listar todas as notas
    public async listarNotas(req: Request, res: Response): Promise<void> {
        try {
            const notas = await this.useCaseNota.listarNotas();
            res.status(200).json(notas);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    // Método para obter uma nota específica pelo ID
    public async obterNotaPorId(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id) || id <= 0) {
            res.status(400).json({ message: 'ID inválido.' });
            return;
        }

        try {
            const nota = await this.useCaseNota.obterNotaPorId(id);
            if (nota) {
                res.status(200).json(nota);
            } else {
                res.status(404).json({ message: 'Nota não encontrada.' });
            }
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}
