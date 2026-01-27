import { HttpException, HttpStatus, Injectable, Request } from '@nestjs/common';
import { Shifts } from "./shifts.model";
import { InjectModel } from "@nestjs/sequelize";
import { Sequelize, where } from 'sequelize';
import RequestCustom from 'src/types/request.t';
import { DeleteShiftDto } from './dto/DeleteShift.dto';
import { CreateShiftsDto } from './dto/CreateShifts.dto ';
import { EditShiftsDto } from './dto/EditShifts.dto';

@Injectable()
export class ShiftsService {

    constructor(@InjectModel(Shifts) private ShiftsRepository: typeof Shifts, private sequelize: Sequelize) { }



    async getAll() {
        const Shifts = await this.ShiftsRepository.findAll({ include: { all: true } });
        return Shifts;
    }



    async getUsersShifts(req: Request) {
        const { user } = req as RequestCustom

        const Shifts = await this.ShiftsRepository.findAll({ where: { userId: user.id } });
        return Shifts;
    }



    async create(dto: CreateShiftsDto, req: Request) {
        const { user } = req as RequestCustom


        const newShifts = await this.ShiftsRepository.create({ ...dto, userId: user.id });
        return newShifts;
    }



    async delete(dto: DeleteShiftDto, req: Request) {
        const { user } = req as RequestCustom
        const { shiftId } = dto

        const deleteShift = await this.ShiftsRepository.destroy({ where: { userId: user.id, id: shiftId } });
        return deleteShift;
    }



    async edit(dto: EditShiftsDto, req: Request) {
        const { user } = req as RequestCustom
        const { shiftId } = dto

        const newShifts = await this.ShiftsRepository.update({ ...dto, userId: user.id }, { where: { userId: user.id, id: shiftId } });
        if (!newShifts) throw new Error('нет такой смены')

        return newShifts;
    }

} 