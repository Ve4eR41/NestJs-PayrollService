import { BelongsTo, BelongsToMany, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/users.model";

interface OpenshiftCreationAttrs {
    userid: number;
}

@Table({ tableName: 'openshifts' })
export class Openshift extends Model<Openshift, OpenshiftCreationAttrs> {

    @ForeignKey(() => User)
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, primaryKey: true })
    userid: number;


    @BelongsTo(() => User)
    user: User;


    @Default(DataType.NOW)
    @ApiProperty({ example: '1', description: 'Дата начала смены' })
    @Column({ type: DataType.DATE })
    timeStart: Date;

}
