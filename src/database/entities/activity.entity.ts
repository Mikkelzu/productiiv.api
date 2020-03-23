import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, Timestamp, ManyToOne } from "typeorm";
import Project from "./project.entity";
import User from "src/users/entities/users.entity";

@Entity()
export default class Activity {

    @PrimaryGeneratedColumn()
    activityId: number;

    @Column({type: 'text'})
    activityDescription: string;

    @OneToOne(type => Project)
    @JoinColumn()
    project: Project;

    @Column({type: 'timestamp'})
    activityTime: Timestamp;

    @Column({type: 'date'})
    activityDate: Date;
    

    @ManyToOne(type => User, user => user.userId)
    user: User;
}
