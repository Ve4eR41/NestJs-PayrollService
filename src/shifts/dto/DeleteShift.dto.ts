import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber } from "class-validator";

export class DeleteShiftDto {
    @ApiProperty({ example:"1", description:"ID смены"})
    @IsNumber()
    readonly shiftId: number;
}