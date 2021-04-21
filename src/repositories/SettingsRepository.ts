import { EntityRepository, Repository } from "typeorm";
import { Setting } from "../entities/Setting";

@EntityRepository(Setting) // Repository of Setting Entity
class SettingsRepository extends Repository<Setting> {
    // A Classe extende os metodos do repositório da entidade "Settings"
    // Extendendo métodos já prontos do Typeorm
}

export { SettingsRepository };