import { IsNumber, IsString } from "class-validator";

export class CreateRetailPlanDto {

    @IsNumber()
    readonly value: number;

    @IsString()
    readonly description: string;
}
