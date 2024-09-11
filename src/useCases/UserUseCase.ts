import { IUserRepository } from '../contracts/IUserRepository';

export class UserService {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    public async registerUser(name: string, username: string, email: string, password: string): Promise<void> {
        
        const usernameExists = await this.userRepository.findByUsername(username)
        
        if(usernameExists !== null) {
            throw new Error("Usuario ja cadastrado")
        }
        
        await this.userRepository.createUser( name, username, email, password );
    }

    public async listAllUser() {
        const user = await this.userRepository.findAllUser()

        return user
    }

    public async listOneUser(id: number) {
        const user = await this.userRepository.findByUser(id)

        return user
    }

    public async updateUser( id: number, data: Partial<{ name: string, username: string, email: string, password: string; }>) {
        
        try {
            
            const username = data.username;

            if (!username) {
                throw new Error("Nome de usuário não fornecido");
            }
            
            const user = await this.userRepository.findByUsername(username)

         

            await this.userRepository.updateUser(id, data)
        } catch (error) {
            console.log(error)
            throw new Error("Nome de usuário não fornecido")
        }
    }

    public async deleteUser(id: number) {
        try {
            await this.userRepository.deleteUser(id)
        } catch (error) {
            console.log(error)
            throw new Error("Erro para deletar usuário")
        }
    }
}