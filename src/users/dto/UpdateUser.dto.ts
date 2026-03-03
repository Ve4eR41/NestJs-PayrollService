import {ApiProperty} from "@nestjs/swagger";
import { IsBoolean, IsNumber, isNumber, IsOptional, IsString, Length} from "class-validator";

export class UpdateUserDto {

    @IsNumber()
    readonly id: number;

    @ApiProperty({example: 'user@mail.ru', description: 'Почта'})
    @IsString({message: 'Должно быть строкой'})
    @IsOptional()
    readonly fio?: string;

    @IsNumber()
    @IsOptional()
    readonly shop?: number;

    @IsNumber()
    @IsOptional()
    readonly job?: number;

    @IsBoolean()
    @IsOptional()
    readonly banned?: boolean;

    @IsNumber()
    @IsOptional()
    readonly role?: number;
 
}
