import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { ValidationException } from "../exceptions/validation.exception";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        try {

            const obj = plainToClass(metadata.metatype, value);
            const errors = await validate(obj);

            if (errors.length) {
                let messages = errors.map(err => {
                    return `${err.property} - ${Object.values(err.constraints).join(', ')}`
                })
                throw new ValidationException(messages)
            }
            return value;

        } catch (error) {
            // Если ошибка валидации - пробрасываем
            if (error instanceof BadRequestException) {
                throw error;
            }
            // Если другая ошибка (например, metatype undefined) - пропускаем валидацию
            console.warn('Ошибка в ValidationPipe:', error.message);
            return value;
        }
    }
}
