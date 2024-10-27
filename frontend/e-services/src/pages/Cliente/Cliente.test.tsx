import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Cliente } from './Cliente';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect'; // Importa as asserções personalizadas do jest-dom

describe('Cliente Component', () => {
    afterEach(cleanup); // Limpa o DOM após cada teste

    // Função para renderizar o componente dentro de um MemoryRouter
    const renderComponent = () => {
        render(
            <MemoryRouter>
                <Cliente />
            </MemoryRouter>
        );
    };

    test('deve renderizar o título corretamente', () => {
        renderComponent(); // Renderiza o componente
        const title = screen.getByText(/cadastrar cliente/i); // Busca o título na tela
        expect(title).toBeInTheDocument(); // Verifica se o título está presente no documento
    });

    test('deve permitir a entrada de nome', () => {
        renderComponent(); // Renderiza o componente
        const nomeInput = screen.getByLabelText(/nome/i) as HTMLInputElement; // Busca o input de nome
        fireEvent.change(nomeInput, { target: { value: 'João Silva' } }); // Simula a alteração do valor do input
        expect(nomeInput.value).toBe('João Silva'); // Verifica se o valor do input foi atualizado corretamente
    });

    test('deve permitir a entrada de telefone apenas numérico', () => {
        renderComponent(); // Renderiza o componente
        const telefoneInput = screen.getByLabelText(/telefone/i) as HTMLInputElement; // Busca o input de telefone
        fireEvent.change(telefoneInput, { target: { value: '1234567890' } }); // Simula a alteração do valor do input
        expect(telefoneInput.value).toBe('1234567890'); // Verifica se o valor do input foi atualizado corretamente
    });

    test('deve permitir a entrada de CPF apenas numérico e limitar a 11 dígitos', () => {
        renderComponent(); // Renderiza o componente
        const cpfInput = screen.getByLabelText(/cpf/i) as HTMLInputElement; // Busca o input de CPF
        fireEvent.change(cpfInput, { target: { value: '12345678901' } }); // Simula a alteração do valor do input
        expect(cpfInput.value).toBe('12345678901'); // Verifica se o valor do input foi atualizado corretamente

        fireEvent.change(cpfInput, { target: { value: '123456789012' } }); // Tenta inserir um CPF com 12 dígitos
        expect(cpfInput.value).toBe('12345678901'); // Verifica se o CPF não aceita mais que 11 dígitos
    });

    test('deve exibir um alerta se o CPF não tiver 11 dígitos', () => {
        renderComponent(); // Renderiza o componente
        const cpfInput = screen.getByLabelText(/cpf/i) as HTMLInputElement; // Busca o input de CPF
        const submitButton = screen.getByRole('button', { name: /cadastrar/i }); // Busca o botão de cadastrar

        fireEvent.change(cpfInput, { target: { value: '123456789' } }); // Insere um CPF inválido
        window.alert = jest.fn(); // Mock do alert para evitar a chamada real
        fireEvent.click(submitButton); // Simula o clique no botão de cadastrar

        expect(window.alert).toHaveBeenCalledWith('O CPF deve ter exatamente 11 dígitos.'); // Verifica se o alert foi chamado com a mensagem correta
    });

    test('deve limpar os campos após o envio', () => {
        renderComponent(); // Renderiza o componente
        const nomeInput = screen.getByLabelText(/nome/i) as HTMLInputElement; // Busca o input de nome
        const telefoneInput = screen.getByLabelText(/telefone/i) as HTMLInputElement; // Busca o input de telefone
        const cpfInput = screen.getByLabelText(/cpf/i) as HTMLInputElement; // Busca o input de CPF
        const submitButton = screen.getByRole('button', { name: /cadastrar/i }); // Busca o botão de cadastrar

        // Preenche os campos
        fireEvent.change(nomeInput, { target: { value: 'João Silva' } });
        fireEvent.change(telefoneInput, { target: { value: '1234567890' } });
        fireEvent.change(cpfInput, { target: { value: '12345678901' } });
        
        fireEvent.click(submitButton); // Simula o clique no botão de cadastrar

        // Verifica se os campos foram limpos após o envio
        expect(nomeInput.value).toBe(''); 
        expect(telefoneInput.value).toBe(''); 
        expect(cpfInput.value).toBe(''); 
    });

    test('deve navegar de volta para a página inicial', () => {
        renderComponent(); // Renderiza o componente
        const backButton = screen.getByRole('button', { name: /voltar para a home/i }); // Busca o botão de voltar
        fireEvent.click(backButton); // Simula o clique no botão de voltar
        expect(window.location.pathname).toBe('/'); // Verifica se a navegação foi bem-sucedida
    });
});
