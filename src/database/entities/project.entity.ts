import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class Project {

    @PrimaryGeneratedColumn()
    projectId: number;

    @Column()
    projectName: string;
}