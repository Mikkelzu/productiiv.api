import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";
import Activity from "src/database/entities/activity.entity";

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

    @OneToMany(type => Activity, activity => activity.user)
    activity: Activity[];

    /**
     * Todo add stuff like isActive, SubscriptionType.
     */
}