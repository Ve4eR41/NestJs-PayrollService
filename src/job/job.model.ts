import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {UserJobs} from "./user-job.model";

interface JobCreationAttrs {
    value: number;
    description: string;
}

@Table({tableName: 'jobs'})
export class Job extends Model<Job, JobCreationAttrs> {

    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: '123', description: 'Почасовая ставка'})
    @Column({type: DataType.NUMBER,  allowNull: false})
    value: number;

    @ApiProperty({example: 'Администратор', description: 'Описание роли'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    description: string;

    @BelongsToMany(() => User, () => UserJobs)
    users: User[];
}
