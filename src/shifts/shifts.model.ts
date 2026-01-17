import { BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/users.model";

interface ShiftsCreationAttrs {
    timeStart: Date;
    timeEnd: Date;
    shopName: number;
    revenue: number;
    cheks: number;
    userId: number;
}

@Table({ tableName: 'shifts' })
export class Shifts extends Model<Shifts, ShiftsCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @PrimaryKey
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: '1', description: 'Дата начала смены' })
    @Column({ type: DataType.DATE })
    timeStart: Date;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;

    @ApiProperty({ example: '1', description: 'Дата окончания смены' })
    @Column({ type: DataType.DATE })
    timeEnd: Date;

    @ApiProperty({ example: '1', description: 'ИД магазина' })
    @Column({ type: DataType.INTEGER })
    shopName: number;

    @ApiProperty({ example: '1250', description: 'Выручка' })
    @Column({ type: DataType.INTEGER })
    revenue: number;

    @ApiProperty({ example: '1', description: 'Кв чеков' })
    @Column({ type: DataType.INTEGER })
    cheks: number;

}
