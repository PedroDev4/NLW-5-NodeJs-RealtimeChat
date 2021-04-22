import { getCustomRepository, Repository } from "typeorm"
import { Message } from "../entities/Message";
import { MessagesRepository } from "../repositories/MessagesRepository"

interface IRequestMessage {
    admin_id?: string;
    text: string;
    user_id: string;
}

class MessagesService {

    private repository: Repository<Message>

    constructor() {
        this.repository = getCustomRepository(MessagesRepository); // Chamando o nosso Repositório
    }

    async create({ admin_id, text, user_id }: IRequestMessage): Promise<Message> {
        const message = this.repository.create({
            admin_id,
            text,
            user_id,
        });

        await this.repository.save(message);

        return message;
    }


    async listByUser(user_id: string): Promise<Message[]> {
        const list = await this.repository.find({
            where: { user_id },
            relations: ["user"] // Vai até a table de "users" e retorna os dados
        })

        return list
    }

}

export { MessagesService }