import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

// Definindo uma interface para o tipo Usuário
interface Usuario {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
}

export function Usuario() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [usuarios, setUsuarios] = useState<Usuario[]>([]); // Estado para armazenar a lista de usuários
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Validação básica de email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Por favor, insira um email válido.');
            return;
        }

        // Simulação de um cadastro
        const usuarioData: Usuario = {
            id: Math.floor(Math.random() * 1000), // ID aleatório para simulação
            name,
            username,
            email,
            password,
        };

        try {
            const response = await api.post('/users', usuarioData);
            console.log('Usuário cadastrado:', response.data);
            alert('Usuário cadastrado com sucesso!');

            // Limpa os campos após o cadastro
            setName('');
            setUsername('');
            setEmail('');
            setPassword('');
            navigate('/'); // Redireciona para a página inicial
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            alert('Ocorreu um erro ao cadastrar o usuário.');
        }
    };


     // Função para listar os usuários
     const fetchUsuarios = async () => {
        try {
            const response = await api.get<Usuario[]>('/users'); // Solicitação GET para buscar usuários
            setUsuarios(response.data); // Armazenar a lista de usuários no estado
        } catch (error) {
            console.error('Erro ao buscar lista de usuários:', error);
            alert('Ocorreu um erro ao buscar a lista de usuários.');
        }
    };

    // Chama a função para listar usuários ao montar o componente
    useEffect(() => {
        fetchUsuarios();
    }, []);

    return (
        <main className="flex items-center justify-center min-h-screen bg-black text-white">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <header className="mb-6">
                    <h1 className="text-3xl text-center font-bold">Cadastrar Usuário</h1>
                </header>
                <section>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-group">
                            <label htmlFor="name" className="block mb-1">Nome:</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full p-2 rounded border-none bg-gray-700 text-white focus:outline-none focus:ring focus:ring-red-500"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username" className="block mb-1">Username:</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full p-2 rounded border-none bg-gray-700 text-white focus:outline-none focus:ring focus:ring-red-500"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="block mb-1">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full p-2 rounded border-none bg-gray-700 text-white focus:outline-none focus:ring focus:ring-red-500"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="block mb-1">Senha:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                        onClick={() => navigate('/')} 
                        className="w-full mt-4 p-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition duration-300"
                    >
                        Voltar para a Home
                    </button>
                </section>

                <section className="mt-6">
                    <h2 className="text-2xl font-bold mb-4">Lista de Usuários</h2>
                    {usuarios.length > 0 ? (
                        <ul className="space-y-2">
                            {usuarios.map((usuario) => (
                                <li key={usuario.id} className="p-2 bg-gray-700 rounded">
                                    <p>Nome: {usuario.name}</p>
                                    <p>Username: {usuario.username}</p>
                                    <p>Email: {usuario.email}</p>
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
