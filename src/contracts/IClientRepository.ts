import { Cliente } from "../entities/Cliente";

export interface IClienteRepository {
    createCliente(nome: string, telefone: string, cpf: string): void;
    findAllClientes(): Promise<Cliente[] | null>;
    findClienteById(id: number): Promise<Cliente | null>;
    updateCliente(id: number, data: Partial<{ nome: string; telefone: string; cpf: string }>): void;
    deleteCliente(id: number): void;
}