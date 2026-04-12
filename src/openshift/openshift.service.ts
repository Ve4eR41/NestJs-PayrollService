import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { Openshift } from './openshift.model';
import RequestCustom from 'src/types/request.t';
import { User } from 'src/users/users.model';
import { ShiftsService } from 'src/shifts/shifts.service';

@Injectable()
export class OpenshiftService {

  constructor(
    @InjectModel(Openshift) private openshiftRepository: typeof Openshift,
    private shiftsService: ShiftsService
  ) { }



  async close(req: RequestCustom) {
    const { user } = req
    const openshift = await this.openshiftRepository.findOne({ where: { userid: user.id } })
    if (!openshift) throw new HttpException('Смена не открыта', HttpStatus.BAD_REQUEST)

    const shift = await this.shiftsService.create({
      timeStart: openshift.timeStart,
      timeEnd: new Date(),
      shopName: 0,
      revenue: 0,
      cheks: 0
    }, req)
    if (!shift) throw new HttpException('Не удалось создать смену', HttpStatus.BAD_REQUEST)

    await this.openshiftRepository.destroy({ where: { userid: user.id } })
  }



  async isOpen(req: RequestCustom) {
    const { user } = req
    const openshift = await this.openshiftRepository.findOne({ where: { userid: user.id } })
    return {
      isOpen: !!openshift,
      timeStart: openshift?.timeStart || null
    }
  }



  async open(req: RequestCustom) {
    const { user } = req
    const openshift = await this.openshiftRepository.findOne({ where: { userid: user.id } })
    if (openshift) throw new HttpException('Нельзя открыть более одной смены', HttpStatus.BAD_REQUEST)
    await this.openshiftRepository.create({ userid: user.id })
  }



  async getAll() {
    const openshifts = await this.openshiftRepository.findAll({
      include: { all: true, attributes: { exclude: ['password', 'banReason', 'createdAt', 'updatedAt'] } },
    })
    return openshifts;
  }

}
