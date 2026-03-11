import { IsNumber, IsString } from "class-validator";

export class CreateJobDto {

    @IsNumber()
    readonly value: number;

    @IsString()
    readonly description: string;
}
