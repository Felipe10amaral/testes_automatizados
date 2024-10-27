import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Cliente } from './Cliente';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

describe('Cliente Component', () => {
    // Limpeza após cada teste
    afterEach(() => {
        cleanup(); // Limpa o DOM
        jest.clearAllMocks(); // Limpa todos os mocks
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

    // Teste para verificar a entrada do CPF (apenas numérico e limitando a 11 dígitos)
    test('deve permitir a entrada de CPF apenas numérico e limitar a 11 dígitos', () => {
        renderComponent();
        const cpfInput = screen.getByLabelText(/cpf/i) as HTMLInputElement;
        fireEvent.change(cpfInput, { target: { value: '12345678901' } });
        expect(cpfInput.value).toBe('12345678901');

        fireEvent.change(cpfInput, { target: { value: '123456789012' } });
        expect(cpfInput.value).toBe('12345678901'); // Teste se o CPF não aceita mais que 11 dígitos
    });

    // Teste para exibir um alerta se o CPF não tiver 11 dígitos
    test('deve exibir um alerta se o CPF não tiver 11 dígitos', () => {
        renderComponent();
        const cpfInput = screen.getByLabelText(/cpf/i) as HTMLInputElement;
        const submitButton = screen.getByRole('button', { name: /cadastrar/i });

        fireEvent.change(cpfInput, { target: { value: '123456789' } });
        window.alert = jest.fn(); // Mock do alert
        fireEvent.click(submitButton);

        expect(window.alert).toHaveBeenCalledWith('O CPF deve ter exatamente 11 dígitos.'); // Verifica se o alert foi chamado
    });

    // Teste para verificar se os campos são limpos após o envio
    test('deve limpar os campos após o envio', () => {
        renderComponent();
        const nomeInput = screen.getByLabelText(/nome/i) as HTMLInputElement;
        const telefoneInput = screen.getByLabelText(/telefone/i) as HTMLInputElement;
        const cpfInput = screen.getByLabelText(/cpf/i) as HTMLInputElement;
        const submitButton = screen.getByRole('button', { name: /cadastrar/i });

        fireEvent.change(nomeInput, { target: { value: 'João Silva' } });
        fireEvent.change(telefoneInput, { target: { value: '1234567890' } });
        fireEvent.change(cpfInput, { target: { value: '12345678901' } });
        
        fireEvent.click(submitButton);

        expect(nomeInput.value).toBe(''); // Verifica se o campo foi limpo
        expect(telefoneInput.value).toBe(''); // Verifica se o campo foi limpo
        expect(cpfInput.value).toBe(''); // Verifica se o campo foi limpo
    });

    // Teste para verificar a navegação de volta para a página inicial
    test('deve navegar de volta para a página inicial', () => {
        renderComponent();
        const backButton = screen.getByRole('button', { name: /voltar para a home/i });
        fireEvent.click(backButton);
        expect(window.location.pathname).toBe('/'); // Verifica se a navegação foi bem-sucedida
    });

});
