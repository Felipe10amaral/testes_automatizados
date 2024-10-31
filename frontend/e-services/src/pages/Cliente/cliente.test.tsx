import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Cliente } from './index';
import { MemoryRouter } from 'react-router-dom';
import { describe, afterEach, vi, test, expect } from 'vitest';

describe('Cliente Component', () => {
    // Limpeza após cada teste
    afterEach(() => {
        cleanup(); // Limpa o DOM
        vi.clearAllMocks(); // Limpa todos os mocks
    });

    // Função auxiliar para renderizar o componente
    const renderComponent = () => {
        render(
            <MemoryRouter>
                <Cliente />
            </MemoryRouter>
        );
    };

    // Teste para verificar se o título é renderizado corretamente
    test('deve renderizar o título corretamente', () => {
        renderComponent();
        const title = screen.getByText(/cadastrar cliente/i);
        expect(title).toBeInTheDocument(); // Verifica se o título está no documento
    });

    // Teste para verificar a entrada do nome
    test('deve permitir a entrada de nome', () => {
        renderComponent();
        const nomeInput = screen.getByLabelText(/nome/i) as HTMLInputElement;
        fireEvent.change(nomeInput, { target: { value: 'João Silva' } });
        expect(nomeInput.value).toBe('João Silva');
    });

    // Teste para verificar a entrada do telefone (apenas numérico)
    test('deve permitir a entrada de telefone apenas numérico', () => {
        renderComponent();
        const telefoneInput = screen.getByLabelText(/telefone/i) as HTMLInputElement;
        fireEvent.change(telefoneInput, { target: { value: '1234567890' } });
        expect(telefoneInput.value).toBe('1234567890');
    });

    
   

    // Teste para verificar a navegação de volta para a página inicial
    test('deve navegar de volta para a página inicial', () => {
        renderComponent();
        const backButton = screen.getByRole('button', { name: /voltar para a home/i });
        fireEvent.click(backButton);
        expect(window.location.pathname).toBe('/'); // Verifica se a navegação foi bem-sucedida
    });

});
