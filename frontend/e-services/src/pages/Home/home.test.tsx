import '@testing-library/jest-dom'; // Importa as asserções adicionais
import {expect, it, describe} from 'vitest'
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Home } from "./index";

// Função auxiliar para renderizar a página Home com Router
function renderHome() {
  return render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
}

describe("Página Home", () => {
  it("renderiza o título e a descrição", () => {
    renderHome();

    // Verifica se o título "Bem-vindo!" está presente
    expect(screen.getByText("Bem-vindo!")).toBeInTheDocument();
    // Verifica se a descrição está presente
    expect(screen.getByText(/E-Services. Confiança e qualidade para o seu dispositivo./i)).toBeInTheDocument();
  });

  it("renderiza os serviços oferecidos", () => {
    renderHome();

    // Verifica se as seções dos serviços estão presentes
    expect(screen.getByText("Serviços Oferecidos")).toBeInTheDocument();
    expect(screen.getByText("Troca de Tela")).toBeInTheDocument();
    expect(screen.getByText("Troca de Bateria")).toBeInTheDocument();
    expect(screen.getByText("Reparos de Conectores")).toBeInTheDocument();
  });

  it("renderiza o botão de contato", () => {
    renderHome();

    // Verifica se o botão "Fale Comigo" está presente
    const contactButton = screen.getByRole("button", { name: /Fale Comigo/i });
    expect(contactButton).toBeInTheDocument();
  });


});