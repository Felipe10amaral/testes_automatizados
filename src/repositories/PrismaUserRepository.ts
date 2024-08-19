import { PrismaClient } from '@prisma/client';
import { IUserRepository } from '../contracts/IRepository';
import { User } from '../entities/User';

export class PrismaUserRepository implements IUserRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }
    async findAllUser(): Promise<User[] | null> {
        const user = await this.prisma.user.findMany()

        if(!user) {
            return null
        }

        return user
    }
    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                email
            },
            select: {
                name: true,
                email: true
            }
        })

        if(!user) {
            return null
        }

        return user
    }

    async createUser(data: { name: string; email: string; password: string }): Promise<void> {
        await this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
            },
        });
    }
}