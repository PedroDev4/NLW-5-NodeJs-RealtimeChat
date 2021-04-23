import { getCustomRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository";

interface IRequestConnection {
    user_id: string;
    socket_id: string;
    admin_id?: string;
    id?: string;
}

class ConnectionsService {

    private repository: Repository<Connection>

    constructor() {
        this.repository = getCustomRepository(ConnectionsRepository); // Chamando o nosso Repositório
    }

    async create({ user_id, socket_id, admin_id, id }: IRequestConnection): Promise<Connection> {
        const connection = this.repository.create({
            user_id,
            socket_id,
            admin_id,
            id,
        });

        await this.repository.save(connection);

        return connection;

    }

    async findConnectionByUserId(user_id: string): Promise<Connection> {
        const connection = await this.repository.findOne({ user_id });

        return connection;
    }
}

export { ConnectionsService };