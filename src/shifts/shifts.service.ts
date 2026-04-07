import { HttpException, HttpStatus, Injectable, Request } from '@nestjs/common';
import { Shifts } from "./shifts.model";
import { InjectModel } from "@nestjs/sequelize";
import { Sequelize, Op, where } from 'sequelize';
import { DeleteShiftDto } from './dto/DeleteShift.dto';
import { CreateShiftsDto } from './dto/CreateShifts.dto ';
import { EditShiftsDto } from './dto/EditShifts.dto';
import { GetShiftsByShopDto } from './dto/getShiftsByShop.dto';
import RequestCustom from 'src/types/request.t';
import { UsersShiftsDto } from './dto/UsersShifts.dto';
import { log } from 'node:console';

@Injectable()
export class ShiftsService {

    constructor(@InjectModel(Shifts) private ShiftsRepository: typeof Shifts, private sequelize: Sequelize) { }



    async getAll() {
        const Shifts = await this.ShiftsRepository.findAll({ include: { all: true } });
        return Shifts;
    }



    async getUsersShifts(req: Request, dto: UsersShiftsDto) {
        const { user } = req as RequestCustom
        const { timeEnd, timeStart } = dto;

        console.log(dto);


        const shifts = (async () => {
            if (timeEnd && timeStart)
                return await this.ShiftsRepository.findAll({ where: { userId: user.id, timeStart: { [Op.gte]: timeStart, [Op.lte]: timeEnd } } });
            else {
                return await this.ShiftsRepository.findAll({ where: { userId: user.id } });
            }
        })()

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
        const shift = await this.ShiftsRepository.findOne({ where: { userId: user.id, id: shiftId } });
        this.noMoreDaysLimit(shift.timeStart)

        const deleteShift = await this.ShiftsRepository.destroy({ where: { userId: user.id, id: shiftId } });
        return deleteShift;
    }



    async edit(dto: EditShiftsDto, req: Request) {
        const { user } = req as RequestCustom
        const { shiftId } = dto

        const shift = await this.ShiftsRepository.findOne({ where: { userId: user.id, id: shiftId } });
        if (!shift) throw new HttpException('Смена не существует', HttpStatus.NOT_FOUND)
        this.noMoreDaysLimit(shift.timeStart)
        const updedShifts = await this.ShiftsRepository.update({ ...dto, userId: user.id }, { where: { userId: user.id, id: shiftId } });
        return updedShifts;
    }



    async getShiftsByShop(dto: GetShiftsByShopDto, req: Request) {
        const { startDate, endDate, shopName } = dto;
        const shifts = await this.ShiftsRepository.findAll({ where: { shopName, timeStart: { [Op.gte]: startDate, [Op.lte]: endDate } } });
        return shifts;
    }


    async getShiftsFullInfo(dto: GetShiftsByShopDto, req: Request) {
        const { startDate, endDate, shopName } = dto;
        
        const shifts = await this.ShiftsRepository.findAll({ include: { all: true }, where: { shopName, timeStart: { [Op.gte]: startDate, [Op.lte]: endDate } } });
        return shifts;
    }



    daysAgo(targetDate: Date) {
        const diffInMs = new Date().getTime() - targetDate.getTime();
        const diffInDays = Math.floor(diffInMs / 86400000);
        return diffInDays;
    }



    noMoreDaysLimit(timeStart: Date) {
        const limDays = 7
        if (this.daysAgo(timeStart) > limDays) throw new HttpException(`Нельзя редактировать смену если прошло больше ${limDays} дней`, HttpStatus.FORBIDDEN)
    }



} 