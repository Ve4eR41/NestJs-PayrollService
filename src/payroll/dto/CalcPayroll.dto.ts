import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsOptional } from "class-validator";

export class CalcPayrollDto {
    @ApiProperty({ example: "2025-05-01T00:00:00.000Z", required: false })
    @IsDateString()
    readonly timeStart?: Date;

    @ApiProperty({ example: "2025-05-31T23:59:59.999Z", required: false })
    @IsDateString()
    readonly timeEnd?: Date;
}

