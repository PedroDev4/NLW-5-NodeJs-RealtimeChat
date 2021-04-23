import { getCustomRepository, Repository } from "typeorm";
import { Setting } from "../entities/Setting";
import { SettingsRepository } from "../repositories/SettingsRepository";

interface IRequestSettings {
    chat: boolean;
    username: string;
}

class SettingsService {

    private repository: Repository<Setting>

    constructor() {
        this.repository = getCustomRepository(SettingsRepository); // Chamando o nosso Repositório
    }

    async create({ chat, username }: IRequestSettings): Promise<Setting> {

        // Select * from settings where username = usernameRecebido
        const userAlreadyExists = await this.repository.findOne({ username });
        if (userAlreadyExists) { // Testando se o usuario já existe no DB
            throw new Error("User Already Exists!");
        }

        const settings = this.repository.create({
            chat,
            username,
        });

        await this.repository.save(settings);

        return settings;
    }

    async findSettingsByUsername(username: string): Promise<Setting> {
        const settings = await this.repository.findOne({ username });

        return settings;
    }

    async update(username: string, chat: boolean) {
        await this.repository.createQueryBuilder()
            .update(Setting) // Entidade a ser alterada no Database
            .set({ chat }) // O que eu quero alterar
            .where("username = :username", { username }) // Onder o username é igual ao username recebido
            .execute()
    }

}

export { SettingsService }