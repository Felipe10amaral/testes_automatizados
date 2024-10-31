import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

// Definindo uma interface para o tipo Cliente
interface Cliente {
    id: number;
    nome: string;
    telefone: string;
    cpf: string;
}


export function Cliente() {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');
    const [clientes, setClientes] = useState<Cliente[]>([]); // Define clientes como um array do tipo Cliente
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (cpf.length !== 11) {
            alert('O CPF deve ter exatamente 11 dígitos.');
            return;
        }

        const clienteData = {
            nome,
            cpf,
            telefone
        };
        try {
            const response = await api.post('/clientes', clienteData);
            console.log('Cliente cadastrado:', response.data);
            alert('Cliente cadastrado com sucesso!');

            setNome('');
            setTelefone('');
            setCpf('');
            navigate('/');
        } catch (error) {
            console.error('Erro ao cadastrar cliente:', error);
            alert('Ocorreu um erro ao cadastrar o cliente.');
        }
    };

    const handleListClientes = async () => {
        try {
            const response = await api.get<Cliente[]>('/clientes'); // Solicitação GET para buscar clientes
            setClientes(response.data); // Armazenar a lista de clientes no estado
        } catch (error) {
            console.error('Erro ao buscar lista de clientes:', error);
            alert('Ocorreu um erro ao buscar a lista de clientes.');
        }
    };

    const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valor = e.target.value.replace(/[^0-9]/g, '');
        setTelefone(valor);
    };

    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                                type="tel"
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
                        onClick={handleListClientes}
                        className="w-full mt-4 p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
                    >
                        Listar todos os clientes
                    </button>
                    <button 
                        onClick={() => navigate('/')} 
                        className="w-full mt-4 p-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition duration-300"
                    >
                        Voltar para a Home
                    </button>
                </section>
                <section className="mt-6">
                    <h2 className="text-2xl font-bold mb-4">Lista de Clientes</h2>
                    {clientes.length > 0 ? (
                        <ul className="space-y-2">
                            {clientes.map((cliente) => (
                                <li key={cliente.id} className="p-2 bg-gray-700 rounded">
                                    <p>Nome: {cliente.nome}</p>
                                    <p>Telefone: {cliente.telefone}</p>
                                    <p>CPF: {cliente.cpf}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400"></p>
                    )}
                </section>
            </div>
        </main>
    );
}