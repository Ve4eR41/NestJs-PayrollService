import { IsString } from "class-validator";

export class CreateShiftTypeDto {

    @IsString()
    readonly name: string;
}
