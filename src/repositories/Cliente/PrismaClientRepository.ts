import { PrismaClient, Cliente } from '@prisma/client';
import { IClienteRepository } from '../../contracts/IClientRepository';


export class PrismaClienteRepository implements IClienteRepository {
    private prisma = new PrismaClient();

    async createCliente(nome: string, telefone: string, cpf: string): Promise<void> {
        try {
            await this.prisma.cliente.create({
                data: {
                    nome,
                    telefone,
                    cpf,
                },
            });
        } catch (error) {
            console.error('Error creating cliente:', error);
            throw new Error('Error creating cliente');
        }
    }

    async findAllClientes(): Promise<Cliente[] | null> {
        try {
            return await this.prisma.cliente.findMany();
        } catch (error) {
            console.error('Error finding all clientes:', error);
            throw new Error('Error finding all clientes');
        }
    }

    async findClienteById(id: number): Promise<Cliente | null> {
        try {
            return await this.prisma.cliente.findUnique({
                where: { id },
            });
        } catch (error) {
            console.error(`Error finding cliente with ID ${id}:`, error);
            throw new Error(`Error finding cliente with ID ${id}`);
        }
    }

    async updateCliente(id: number, data: Partial<{ nome: string; telefone: string; cpf: string }>): Promise<void> {
        try {
            await this.prisma.cliente.update({
                where: { id },
                data,
            });
        } catch (error) {
            console.error(`Error updating cliente with ID ${id}:`, error);
            throw new Error(`Error updating cliente with ID ${id}`);
        }
    }

    async deleteCliente(id: number): Promise<void> {
        try {
            await this.prisma.cliente.delete({
                where: { id },
            });
        } catch (error) {
            console.error(`Error deleting cliente with ID ${id}:`, error);
            throw new Error(`Error deleting cliente with ID ${id}`);
        }
    }
}