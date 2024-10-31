import { useState } from "react";

export function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
      {/* Navbar */}
      <nav className="w-full max-w-4xl flex justify-between items-center py-4 px-6 bg-gray-900 rounded-lg shadow-lg mb-8">
        
        
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white md:hidden focus:outline-none"
        >
          ☰
        </button>
        
        {/* Menu Items */}
        <div className={`flex-col md:flex-row md:flex gap-6 mt-4 md:mt-0 ${isMenuOpen ? "flex" : "hidden"} md:items-center`}>
          <a href="/cadastrar-cliente" className="text-lg font-medium hover:text-red-500 transition-colors">
            Cadastrar Cliente
          </a>
          <a href="/usuario" className="text-lg font-medium hover:text-red-500 transition-colors">
            Cadastrar Usuario
          </a>
          <a href="/cadastrar-nota" className="text-lg font-medium hover:text-red-500 transition-colors">
            Cadastrar Nota de Serviço
          </a>
        </div>
      </nav>

      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-5xl font-extrabold mb-4">Bem-vindo!</h1>
        <p className="text-lg font-medium max-w-md">
          E-Services. Confiança e qualidade para o seu dispositivo.
        </p>
      </header>

      {/* Services Section */}
      <section className="w-full max-w-2xl text-center mb-12">
        <h2 className="text-3xl font-bold mb-6">Serviços Oferecidos</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="bg-gray-800 text-white rounded-lg p-6 shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">Troca de Tela</h3>
            <p className="text-sm">
              Substituição de telas quebradas com componentes de alta qualidade para diversos modelos.
            </p>
          </div>
          <div className="bg-gray-800 text-white rounded-lg p-6 shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">Troca de Bateria</h3>
            <p className="text-sm">
              Serviço de troca de bateria para restaurar a autonomia do seu celular.
            </p>
          </div>
          <div className="bg-gray-800 text-white rounded-lg p-6 shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">Reparos de Conectores</h3>
            <p className="text-sm">
              Solução para problemas de carregamento e conectores danificados.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <div className="text-center">
        <p className="text-lg mb-6">
          Entre em contato e deixe seu celular nas mãos de um especialista.
        </p>
        <button className="bg-red-500 text-black font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-red-600 transition duration-300">
          Fale Comigo
        </button>
      </div>
    </div>
  );
}