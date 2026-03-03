import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/users.model";
import { Job } from "./job.model";


@Table({ tableName: 'user_jobs', createdAt: false, updatedAt: false })
export class UserJobs extends Model<UserJobs> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => Job)
    @Column({ type: DataType.INTEGER })
    jobId: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;

}
