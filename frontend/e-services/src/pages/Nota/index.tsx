import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

interface Cliente {
    id: number;
    nome: string;
}

export function Nota() {
    const [nome, setNome] = useState('');
    const [clienteId, setClienteId] = useState('');
    const [modelo, setModelo] = useState('');
    const [defeito, setDefeito] = useState('');
    const [valor, setValor] = useState('');
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const notaData = {
            nameCliente: nome,
            clienteId: parseInt(clienteId),
            modelo,
            defeito,
            valor
        };

        try {
            const response = await api.post('/notas', notaData);
            console.log('Nota cadastrada:', response.data);
            alert('Nota cadastrada com sucesso!');

            setNome('');
            setClienteId('');
            setModelo('');
            setDefeito('');
            setValor('');
            navigate('/');
        } catch (error) {
            console.error('Erro ao cadastrar nota:', error);
            alert('Ocorreu um erro ao cadastrar a nota.');
        }
    };

    const handleListClientes = async () => {
        try {
            const response = await api.get<Cliente[]>('/clientes');
            setClientes(response.data);
        } catch (error) {
            console.error('Erro ao buscar lista de clientes:', error);
            alert('Ocorreu um erro ao buscar a lista de clientes.');
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-black text-white">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <header className="mb-6">
                    <h1 className="text-3xl text-center font-bold">Cadastrar Nota</h1>
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
                            <label htmlFor="clienteId" className="block mb-1">Cliente ID:</label>
                            <select
                                id="clienteId"
                                value={clienteId}
                                onChange={(e) => setClienteId(e.target.value)}
                                required
                                className="w-full p-2 rounded border-none bg-gray-700 text-white focus:outline-none focus:ring focus:ring-red-500"
                            >
                                <option value="">Selecione um cliente</option>
                                {clientes.map(cliente => (
                                    <option key={cliente.id} value={cliente.id}>
                                        {cliente.nome}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={handleListClientes}
                                type="button"
                                className="mt-2 text-blue-400 hover:underline"
                            >
                                Carregar clientes
                            </button>
                        </div>
                        <div className="form-group">
                            <label htmlFor="modelo" className="block mb-1">Modelo:</label>
                            <input
                                type="text"
                                id="modelo"
                                value={modelo}
                                onChange={(e) => setModelo(e.target.value)}
                                required
                                className="w-full p-2 rounded border-none bg-gray-700 text-white focus:outline-none focus:ring focus:ring-red-500"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="defeito" className="block mb-1">Defeito:</label>
                            <input
                                type="text"
                                id="defeito"
                                value={defeito}
                                onChange={(e) => setDefeito(e.target.value)}
                                required
                                className="w-full p-2 rounded border-none bg-gray-700 text-white focus:outline-none focus:ring focus:ring-red-500"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="valor" className="block mb-1">Valor:</label>
                            <input
                                type="number"
                                id="valor"
                                value={valor}
                                onChange={(e) => setValor(e.target.value)}
                                required
                                className="w-full p-2 rounded border-none bg-gray-700 text-white focus:outline-none focus:ring focus:ring-red-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full p-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
                        >
                            Cadastrar Nota
                        </button>
                    </form>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full mt-4 p-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition duration-300"
                    >
                        Voltar para a Home
                    </button>
                </section>
            </div>
        </main>
    );
}
