import { IUserRepository } from '../contracts/IRepository';

export class UserService {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    public async registerUser(name: string, email: string, password: string): Promise<void> {
        
        const emailExists = await this.userRepository.findByEmail(email)
        
        if(emailExists !== null) {
            throw new Error("Email ja cadastrado")
        }
        
        await this.userRepository.createUser({ name, email, password });
    }

    public async listAllUser() {
        const user = await this.userRepository.findAllUser()

        return user
    }
}