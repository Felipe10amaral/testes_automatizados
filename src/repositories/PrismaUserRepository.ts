import { PrismaClient } from '@prisma/client';
import { IUserRepository } from '../contracts/IUserRepository';
import { User } from '../entities/User';

export class PrismaUserRepository implements IUserRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }
    public async deleteUser(id: number): Promise<void> {
        await this.prisma.user.delete({
            where: {
                id
            }
        })
    }
    public async findByUser(id: number): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                id
            },
            select: {
                name: true,
                username: true,
                email: true
            }
        })

        if(!user) {
            return null
        }

        return user
    }
    public async updateUser(id: number, data: Partial<{ name: string; username: string, email: string ,password: string; }>): Promise<void> {
        try {
            await this.prisma.user.update({
                where: {
                    id
                },
                data: {
                    name: data.name,
                    username: data.username,
                    email: data.email,
                    password: data.password
                }
            })
        } catch (error) {
            console.log(error)
            throw new Error("Erro para atualizar usuário")
            
        }
        
    }
    public async findAllUser(): Promise<User[] | null> {
        const user = await this.prisma.user.findMany()

        if(!user) {
            return null
        }

        return user
    }
    public async findByUsername(username: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                username
            },
            select: {
                name: true,
                username: true,
                email: true
            }
        })

        if(!user) {
            return null
        }

        return user
    }

    public async createUser(name: string, username: string, email: string, password: string): Promise<void> {

        try {
            await this.prisma.user.create({
            data: {
                name: name,
                username: username,
                email: email,
                password: password,
            },
        });
    
        } catch (error) {
    
            throw new Error("Erro para criar usuário")
        }
    }    
}