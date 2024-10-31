import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Nota } from './index'; // Ajuste o caminho conforme necessário
import { BrowserRouter } from 'react-router-dom';

describe('Nota', () => {
    it('deve renderizar o campo de entrada para nome', () => {
        render(
            <BrowserRouter>
                <Nota />
            </BrowserRouter>
        );

        // Verifique se o campo de entrada para "Nome" está presente na tela
        const nomeInput = screen.getByLabelText(/Nome:/i);
        expect(nomeInput).toBeInTheDocument();
    });

    it('deve renderizar o campo de entrada para modelo', () => {
        render(
            <BrowserRouter>
                <Nota />
            </BrowserRouter>
        );

        // Verifique se o campo de entrada para "Nome" está presente na tela
        const nomeInput = screen.getByLabelText(/modelo:/i);
        expect(nomeInput).toBeInTheDocument();
    });

    it('deve renderizar o campo de entrada para defeito', () => {
        render(
            <BrowserRouter>
                <Nota />
            </BrowserRouter>
        );

        // Verifique se o campo de entrada para "Nome" está presente na tela
        const nomeInput = screen.getByLabelText(/defeito:/i);
        expect(nomeInput).toBeInTheDocument();
    });

    it('deve renderizar o campo de entrada para valor', () => {
        render(
            <BrowserRouter>
                <Nota />
            </BrowserRouter>
        );

        // Verifique se o campo de entrada para "Nome" está presente na tela
        const nomeInput = screen.getByLabelText(/valor:/i);
        expect(nomeInput).toBeInTheDocument();
    });
});
