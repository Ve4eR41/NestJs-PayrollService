import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, isNumber, IsOptional, IsString, Length } from "class-validator";


class JobDto {
    @IsNumber()
    id: number;
}
class RoleDto {
    @IsNumber()
    id: number;
}


export class UpdateUserDto {

    @IsNumber()
    readonly id: number;

    @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
    @IsString({ message: 'Должно быть строкой' })
    @IsOptional()
    readonly fio?: string;

    @IsNumber()
    @IsOptional()
    readonly shop?: number;

    @IsOptional()
    readonly jobs?: JobDto;

    @IsBoolean()
    @IsOptional()
    readonly banned?: boolean;

    @IsOptional()
    readonly roles?: RoleDto;

}

