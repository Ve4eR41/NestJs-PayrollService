import { HttpException, HttpStatus, Injectable, Request } from '@nestjs/common';
import { Shifts } from "./shifts.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateShiftsDto } from "./dto/CreateShifts.dto";
import { RolesService } from "../roles/roles.service";
import { Sequelize } from 'sequelize';
import RequestCustom from 'src/types/request.t';

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

        console.log(user.id)

        const newShifts = await this.ShiftsRepository.create({ ...dto, userId: user.id });
        return newShifts;
    }



    async edit() {

    }

} 