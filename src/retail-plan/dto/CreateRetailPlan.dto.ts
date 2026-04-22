import { IsDateString, IsNumber, IsString } from "class-validator";

export class CreateRetailPlanDto {

    @IsNumber()
    readonly value: number;

    @IsString()
    readonly description: string;

    @IsNumber()
    readonly shopId: number;

    @IsDateString()
    readonly date: Date;
}
