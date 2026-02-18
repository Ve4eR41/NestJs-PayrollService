import { ApiProperty } from "@nestjs/swagger";

export class UsersShiftsDto {
    @ApiProperty({ example: "2025-05-28T18:31:08.810Z", description: "Дата и время начала смены" })
    readonly timeStart?: Date;

    @ApiProperty({ example: "2025-05-28T18:31:08.810Z", description: "Дата и время конца смены" })
    readonly timeEnd?: Date;

}