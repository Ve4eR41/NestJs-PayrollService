import { ApiProperty } from "@nestjs/swagger";
import {  IsDateString } from "class-validator";

export class UsersShiftsDto {
    @ApiProperty({ example: "2025-05-28T18:31:08.810Z", description: "Дата и время начала смены" })
    @IsDateString()
    readonly timeStart?: Date;

    @ApiProperty({ example: "2025-05-28T18:31:08.810Z", description: "Дата и время конца смены" })
    @IsDateString()
    readonly timeEnd?: Date;

}