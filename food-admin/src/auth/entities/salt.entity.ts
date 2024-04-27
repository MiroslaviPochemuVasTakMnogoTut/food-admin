import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('randomNameForSaltTable')
export class Salt {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    someNumbers: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;


}