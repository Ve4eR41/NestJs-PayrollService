import { IsNumber, IsString } from "class-validator";

export class CreateShiftTypeDto {

    @IsString()
    readonly name: string;

    @IsNumber({}, { message: "Должно быть числом" })
    readonly value: number;
}
