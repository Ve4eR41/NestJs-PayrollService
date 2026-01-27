import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber } from "class-validator";

export class EditShiftsDto {
    @ApiProperty({ example:"2025-05-28T18:31:08.810Z", description:"Дата и время начала смены"})
    @IsDateString()
    readonly timeStart: Date;

    @ApiProperty({ example:"2025-05-28T18:31:08.810Z", description:"Дата и время конца смены"})
    readonly timeEnd: Date;

    @ApiProperty({ example:"1", description:"shop id"})
    @IsNumber({}, { message: "Должно быть числом" })
    readonly shopName: number;

    @ApiProperty({ example:"10000", description:"revenue for shifts"})
    @IsNumber({}, { message: "Должно быть числом" })
    readonly revenue: number;

    @ApiProperty({ example:"10000", description:"cheks for shifts"})
    @IsNumber({}, { message: "Должно быть числом" })
    readonly cheks: number;

    @ApiProperty({ example:"1", description:"ID Смены"})
    @IsNumber({}, { message: "Должно быть числом" })
    readonly shiftId: number;
}