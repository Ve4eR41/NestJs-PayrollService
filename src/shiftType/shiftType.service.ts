import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ShiftType } from './shiftType.model';
import { CreateShiftTypeDto } from './dto/CreateShiftType.dto';

@Injectable()
export class ShiftTypeService {

    constructor(@InjectModel(ShiftType) private shiftTypeRepository: typeof ShiftType) { }

    async create(dto: CreateShiftTypeDto) {
        const shiftType = await this.shiftTypeRepository.create(dto);
        return shiftType;
    }

    async getById(id: string) {
        const shiftType = await this.shiftTypeRepository.findOne({ where: { id } });
        return shiftType;
    }

    async getAll() {
        const shiftTypes = await this.shiftTypeRepository.findAll();
        return shiftTypes;
    }
}
