import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepositoy";

class UsersService {

    private repository: Repository<User>

    constructor() {
        this.repository = getCustomRepository(UsersRepository); // Chamando o nosso Repositório
    }

    async create(email: string): Promise<User> {

        // Verificar se user exists [X]
        const userExists = await this.repository.findOne({ email });

        // Se existir retorna o usuario cadastrado [X]
        if (userExists) {
            return userExists;
        }

        // Se nao existir salvar no DB [X] 
        const user = this.repository.create({
            email
        });

        await this.repository.save(user);

        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({
            email,
        });

        return user;
    }

    async findByUserId(user_id: string): Promise<User> {
        const user = await this.repository.findOne({
            id: user_id,
        });

        return user;
    }

}

export { UsersService };