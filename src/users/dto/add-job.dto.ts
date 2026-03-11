import { IsNumber} from "class-validator";

export class AddJobDto {
    @IsNumber({}, { message: "Должно быть числом" })
    readonly id: string;

    @IsNumber({}, { message: "Должно быть числом" })
    readonly userId: number;
}