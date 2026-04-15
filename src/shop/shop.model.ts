import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Shifts } from "src/shifts/shifts.model";

interface ShopCreationAttrs {
    name: string;
}

@Table({ tableName: 'shops' })
export class Shop extends Model<Shop, ShopCreationAttrs> {

    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'Магазин Центральный', description: 'Название магазина' })
    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @HasMany(() => Shifts, { foreignKey: 'shopName' })
    shifts: Shifts[];
}
