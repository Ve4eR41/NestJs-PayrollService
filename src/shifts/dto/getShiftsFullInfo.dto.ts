import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber } from "class-validator";

export class GetShiftsFullInfoDto {
    @ApiProperty({ example: "2025-05-28T18:31:08.810Z", description: "С какой даты получать" })
    @IsDateString()
    readonly startDate: Date;

    @ApiProperty({ example: "2026-05-28T18:31:08.810Z", description: "До какой даты получать" })
    @IsDateString()
    readonly endDate: Date;

}