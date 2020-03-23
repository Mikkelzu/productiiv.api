import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class Subscription {

    @PrimaryGeneratedColumn()
    subscriptionId: number;

    @Column()
    subcriptionName: string;

    @Column()
    subscriptionPrice: string;
}