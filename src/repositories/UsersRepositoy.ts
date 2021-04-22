import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/User";

@EntityRepository(User)
class UsersRepository extends Repository<User> {// private repository = getRepository(User) // Não extende os metodos ja prontos
    // A Classe extende os metodos do repositório da entidade "Users"
    // Extendendo métodos já prontos do Typeorm
}

export { UsersRepository }