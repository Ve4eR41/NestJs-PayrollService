import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface ShiftTypeCreationAttrs {
    name: string;
}

@Table({ tableName: 'shift_types' })
export class ShiftType extends Model<ShiftType, ShiftTypeCreationAttrs> {

    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'Дневная смена', description: 'Название типа смены' })
    @Column({ type: DataType.STRING, allowNull: false })
    name: string;
}
