import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity("users")
class User {

    @PrimaryColumn()
    id: string;

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() { // Ao instanciar a classe(objeto) o ID será gerado (Constructor)
        if (!this.id) {
            this.id = uuid();
        }
    }

}

export { User };