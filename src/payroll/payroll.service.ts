import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Job } from 'src/job/job.model';
import { Shifts } from 'src/shifts/shifts.model';
import { ShiftType } from 'src/shiftType/shiftType.model';
import { User } from 'src/users/users.model';
import { CalcPayrollDto } from './dto/CalcPayroll.dto';
import { RetailPlanService } from 'src/retail-plan/retail-plan.service';

@Injectable()
export class PayrollService {
    constructor(
        @InjectModel(Shifts) private shiftsRepository: typeof Shifts,
        @InjectModel(User) private usersRepository: typeof User,
        private retailPlanService: RetailPlanService,
    ) { }



    private hoursBetween(start: Date, end: Date) {
        const ms = new Date(end).getTime() - new Date(start).getTime();
        return ms > 0 ? ms / 3600000 : 0;
    }


    async calcForUser(userId: number, dto: CalcPayrollDto) {
        const { timeStart, timeEnd } = dto;
        const { userRate } = await (async () => {
            const user = await this.usersRepository.findOne({
                where: { id: userId },
                include: [{ model: Job, as: 'jobs', attributes: ['value'], through: { attributes: [] } }]
            });
            if (!user) throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);

            const rate = user.jobs?.[0]?.value;

            if (!rate) throw new HttpException('У пользователя не задана ставка (jobs.value)', HttpStatus.BAD_REQUEST);

            return { user, userRate: rate }
        })();

        const shifts = await this.shiftsRepository.findAll({
            where: { userId, timeStart: { [Op.gte]: timeStart, [Op.lte]: timeEnd } },
            include: [{ model: ShiftType, as: 'shiftType', attributes: ['id', 'name', 'value'] }]
        });

        const calcedShifts = shifts.map((shift) => {
            const workTime = this.hoursBetween(shift.timeStart, shift.timeEnd);
            const typeName = (() => {
                const typeName = shift.shiftType?.name?.toLowerCase();
                if (!typeName) throw new HttpException(`Для смены id=${shift.id} не задан тип (shiftTypeId)`, HttpStatus.BAD_REQUEST);
                return typeName;
            })();
            const rate = (() => {
                if (typeName === 'смена') return userRate;
                const rate = shift.shiftType?.value;
                if (!rate) throw new HttpException(`Для смены id=${shift.id} не задана ставка типа (shiftType.value)`, HttpStatus.BAD_REQUEST);
                return rate;
            })();

            const hourlyRate = workTime * rate;
            return {
                shiftId: shift.id,
                timeStart: shift.timeStart,
                timeEnd: shift.timeEnd,
                workTime,
                hourlyRate,
                rate,
                shiftType: shift.shiftType ? { id: shift.shiftType.id, name: shift.shiftType.name, value: shift.shiftType.value } : null
            };
        });

        //
        const retailPlan = await this.calcRetailPlan(dto, shifts)

        const workTime = calcedShifts.reduce((acc, s) => acc + s.workTime, 0);
        const hourlyRate = calcedShifts.reduce((acc, s) => acc + s.hourlyRate, 0);
        const summ = workTime

        return {
            ...retailPlan,
            userId,
            total: { workTime, hourlyRate, summ },
            calcedShifts
        };
    }

    async calcRetailPlan(dto: CalcPayrollDto, shifts: Shifts[]) {
        const { timeStart } = dto;
        const summRevenue = shifts.reduce((acc, s) => acc + s.revenue, 0);

        const retailPlan = await this.retailPlanService.getByDate(timeStart)
        const summPlan = retailPlan.reduce((acc, rp) => acc + rp.value, 0)

        const isCompletedPlan = summRevenue >= summPlan;

        return { summPlan, summRevenue, isCompletedPlan }
    }
}

