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

    async findAllWithoutAdmin(): Promise<Connection[]> {
        const connections = await this.repository.find({
            where: { admin_id: null },
            relations: ["user"],
        });

        return connections;
    }

    async findConnectionBySocketId(socket_id: string): Promise<Connection> {
        const connection = await this.repository.findOne({
            socket_id,
        });

        return connection;
    }

    async updateConectionWithAdmin(user_id: string, admin_id: string) {
        await this.repository.createQueryBuilder()
            .update(Connection) // Entidade a ser alterada no Database
            .set({ admin_id }) // O que eu quero alterar
            .where("user_id = :user_id", { user_id }) // Onder o user_id é igual ao user_id recebido
            .execute()
    }
}

export { ConnectionsService };