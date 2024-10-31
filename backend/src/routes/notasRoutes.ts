import { Router, Request, Response } from 'express';
import { makeNotaController } from '../useCases/factories/MakeRegisterNota';

export function notasRoutes() {
    const routes = Router();
    const notaController = makeNotaController();

    // Rota para criar uma nova nota
    routes.post('/', (req: Request, res: Response) => {
        notaController.criarNota(req, res);
    });

    // Rota para atualizar uma nota existente
    routes.put('/:id', (req, res) => notaController.atualizarNota(req, res));

    // Rota para deletar uma nota
    routes.delete('/:id', (req, res) => notaController.deletarNota(req, res));

    // Rota para listar todas as notas
    routes.get('/', (req, res) => notaController.listarNotas(req, res));

    // Rota para obter uma nota específica pelo ID
    routes.get('/:id', (req, res) => notaController.obterNotaPorId(req, res));

    return routes

}

