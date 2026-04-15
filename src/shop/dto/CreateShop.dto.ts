import { IsString } from "class-validator";

export class CreateShopDto {

    @IsString()
    readonly name: string;
}
