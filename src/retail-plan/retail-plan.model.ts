import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Shop } from "../shop/shop.model";

interface RetailPlanCreationAttrs {
    value: number;
    description: string;
    shopId: number;
    date: Date;
}

@Table({ tableName: 'retail_plans' })
export class RetailPlan extends Model<RetailPlan, RetailPlanCreationAttrs> {

    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: '123', description: 'План по выручки в рублях' })
    @Column({ type: DataType.DOUBLE, allowNull: false })
    value: number;

    @ApiProperty({ example: 'План A', description: 'Описание плана' })
    @Column({ type: DataType.STRING, allowNull: false })
    description: string;

    @ApiProperty({ example: '1', description: 'ID магазина' })
    @ForeignKey(() => Shop)
    @Column({ type: DataType.INTEGER, allowNull: false })
    shopId: number;

    @BelongsTo(() => Shop)
    shop: Shop;

    @ApiProperty({ example: '2026-04-01', description: 'Дата плана' })
    @Column({ type: DataType.DATEONLY, allowNull: false })
    date: string;
}
