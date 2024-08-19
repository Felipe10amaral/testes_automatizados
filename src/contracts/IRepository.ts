import { User } from "../entities/User";

export interface IUserRepository {
    createUser(data: { name: string; email: string; password: string }): Promise<void>;
    findByEmail(email: string): Promise<User | null>
    findAllUser(): Promise<User[] | null>
}