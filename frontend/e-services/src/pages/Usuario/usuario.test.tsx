import { render, screen} from '@testing-library/react';
import { Usuario } from './index';
import { api } from '../../services/api'; // Ajuste o caminho conforme necessário
import { vi, describe, test, expect, beforeEach } from 'vitest'; // Importa vi para criar mocks
import { MemoryRouter } from 'react-router-dom'; // Importa MemoryRouter


// Mock do módulo api
vi.mock('../../services/api', () => ({
    api: {
        post: vi.fn(),
        get: vi.fn(),
    },
}));

describe('Componente Usuario', () => {
    beforeEach(() => {
        // Limpa todos os mocks antes de cada teste
        vi.clearAllMocks(); 
    });

    test('deve renderizar a caixa de texto de Nome', () => {
        render(
            <MemoryRouter>
                <Usuario />
            </MemoryRouter>
        );

        // Verifica se a caixa de texto de Nome está no documento
        const nomeInput = screen.getByLabelText(/Nome/i);
        expect(nomeInput).toBeInTheDocument(); // Verifica se o input está no DOM
    });

    test('deve renderizar o botão Cadastrar', () => {
        render(
            <MemoryRouter>
                <Usuario />
            </MemoryRouter>
        );

        // Verifica se o botão Cadastrar está no documento
        const cadastrarButton = screen.getByRole('button', { name: /cadastrar/i });
        expect(cadastrarButton).toBeInTheDocument(); // Verifica se o botão está no DOM
    });

   
    test('deve listar usuários ao montar o componente', async () => {
        // Mock da resposta da API para listar usuários
       //@ts-ignore
        (api.get as vi.Mock).mockResolvedValueOnce({ data: [{ id: 1, name: 'Usuário 1', username: 'user1', email: 'user1@example.com' }] });

        render(
            <MemoryRouter>
                <Usuario />
            </MemoryRouter>
        );

        // Verifica se o usuário aparece na lista
        expect(await screen.findByText(/Usuário 1/i)).toBeInTheDocument();
    });

    
});
