import { HttpException, HttpStatus, Injectable, Request } from '@nestjs/common';
import { Shifts } from "./shifts.model";
import { InjectModel } from "@nestjs/sequelize";
import { Sequelize, Op, where } from 'sequelize';
import RequestCustom from 'src/types/request.t';
import { DeleteShiftDto } from './dto/DeleteShift.dto';
import { CreateShiftsDto } from './dto/CreateShifts.dto ';
import { EditShiftsDto } from './dto/EditShifts.dto';
import { GetShiftsByShopDto } from './dto/getShiftsByShop.dto';

@Injectable()
export class ShiftsService {

    constructor(@InjectModel(Shifts) private ShiftsRepository: typeof Shifts, private sequelize: Sequelize) { }



    async getAll() {
        const Shifts = await this.ShiftsRepository.findAll({ include: { all: true } });
        return Shifts;
    }



    async getUsersShifts(req: Request) {
        const { user } = req as RequestCustom
        const shifts = await this.ShiftsRepository.findAll({ where: { userId: user.id } });
        return shifts;
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



    async getShiftsByShop(dto: GetShiftsByShopDto, req: Request) {
        const { startDate, endDate, shopName } = dto;
        // const _date = new Date(date)
        // const startOfMonth = new Date(_date.getFullYear(), _date.getMonth(), 1);
        // const endOfMonth = new Date(_date.getFullYear(), _date.getMonth() + 1, 0, 23, 59, 59, 999);
        const shifts = await this.ShiftsRepository.findAll({ where: { shopName, timeStart: { [Op.gte]: startDate, [Op.lte]: endDate } } });
        return shifts;
    }

} 