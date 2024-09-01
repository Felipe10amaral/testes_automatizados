import { User } from "../entities/User";

export interface IUserRepository {
    createUser(name: string, username: string, email: string, password: string): Promise<void>;
    findByUsername(username: string): Promise<User | null>
    findByUser(id: number): Promise<User | null>
    findAllUser(): Promise<User[] | null>
    updateUser(id: number, data: Partial<{ name: string; username: string, email: string, password: string }>): Promise<void>
    deleteUser(id: number): Promise<void>
}