import { Column, DataType, HasOne, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Shop } from "../shop/shop.model";

interface RetailPlanCreationAttrs {
    value: number;
    description: string;
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
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    description: string;

    @HasOne(() => Shop)
    shop: Shop;
}
