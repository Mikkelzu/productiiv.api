import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
export default class User{

    @PrimaryGeneratedColumn()
    userId: number;

    @Column({unique: true})
    username: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    registerDate: string;

    /**
     * Todo add stuff like isActive, SubscriptionType.
     */
}