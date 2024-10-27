import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Usando useNavigate para navegação

export function Cliente() {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');
    const navigate = useNavigate(); // Hook para navegação

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Validação do CPF para ter exatamente 11 dígitos
        if (cpf.length !== 11) {
            alert('O CPF deve ter exatamente 11 dígitos.');
            return;
        }

        console.log('Cliente cadastrado:', { nome, telefone, cpf });
        setNome('');
        setTelefone('');
        setCpf('');
    };

    const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Permitir apenas números no campo de telefone
        const valor = e.target.value.replace(/[^0-9]/g, '');
        setTelefone(valor);
    };

    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Permitir apenas números no campo de CPF e limitar a 11 dígitos
        const valor = e.target.value.replace(/[^0-9]/g, '').slice(0, 11);
        setCpf(valor);
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-black text-white">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <header className="mb-6">
                    <h1 className="text-3xl text-center font-bold">Cadastrar Cliente</h1>
                </header>
                <section>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-group">
                            <label htmlFor="nome" className="block mb-1">Nome:</label>
                            <input
                                type="text"
                                id="nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                                className="w-full p-2 rounded border-none bg-gray-700 text-white focus:outline-none focus:ring focus:ring-red-500"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="telefone" className="block mb-1">Telefone:</label>
                            <input
                                type="tel" // Alterado para "tel" para mostrar teclado numérico
                                id="telefone"
                                value={telefone}
                                onChange={handleTelefoneChange}
                                required
                                className="w-full p-2 rounded border-none bg-gray-700 text-white focus:outline-none focus:ring focus:ring-red-500"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cpf" className="block mb-1">CPF:</label>
                            <input
                                type="text"
                                id="cpf"
                                value={cpf}
                                onChange={handleCpfChange}
                                required
                                className="w-full p-2 rounded border-none bg-gray-700 text-white focus:outline-none focus:ring focus:ring-red-500"
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="w-full p-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
                        >
                            Cadastrar
                        </button>
                    </form>
                    <button 
                        onClick={() => navigate('/')} // Usando navigate para ir para a Home
                        className="w-full mt-4 p-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition duration-300"
                    >
                        Voltar para a Home
                    </button>
                </section>
            </div>
        </main>
    );
}
