import { BelongsTo, Column, DataType, HasMany, Model, Table, ForeignKey } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Shifts } from "src/shifts/shifts.model";
import { RetailPlan } from "src/retail-plan/retail-plan.model";

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

    @ForeignKey(() => RetailPlan)
    @ApiProperty({ example: '1', description: 'Идентификатор розничного плана (1:1)' })
    @Column({ type: DataType.INTEGER, allowNull: true, unique: true })
    retailPlanId: number | null;

    @HasMany(() => Shifts, { foreignKey: 'shopName' })
    shifts: Shifts[];

    @BelongsTo(() => RetailPlan)
    retailPlan: RetailPlan;
}
