import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column } from "typeorm";
import User from "src/users/entities/users.entity";
import Subscription from "./subscription.entity";

@Entity()
export default class PaymentProcessor {

    @PrimaryGeneratedColumn()
    paymentId: number;

    @OneToOne(type => User)
    @JoinColumn()
    user: User;

    @OneToOne(type => Subscription)
    @JoinColumn()
    //@Column({nullable: true})
    subscription: Subscription;

    @Column({type: 'date'})
    transactionDate: Date;

    @Column({type: 'date'})
    expirationDate: Date;
}