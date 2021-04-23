import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './User';

@Entity("connections")
class Connection {

    @PrimaryColumn()
    id: string;

    @Column()
    user_id: string;

    @Column()
    admin_id?: string;

    @Column()
    socket_id: string;

    @CreateDateColumn()
    created_at: Date;

    @JoinColumn({ name: "user_id" }) // Faz relacionamento com qual atributo dessa classe? "USER_ID"
    @ManyToOne(() => User) // Muitas mensagems para um user
    user: User;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Connection };