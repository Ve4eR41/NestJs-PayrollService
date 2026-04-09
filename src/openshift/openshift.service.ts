import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { Openshift } from './openshift.model';
import RequestCustom from 'src/types/request.t';

@Injectable()
export class OpenshiftService {
  constructor(@InjectModel(Openshift) private openshiftRepository: typeof Openshift) { }

  isOpen(req: RequestCustom) {
    const { user } = req

  }

  

  open(req: RequestCustom) {
    const { user } = req
    this.openshiftRepository.create({ userid: user.id })
  }



  async getAll() {
    const openshifts = await this.openshiftRepository.findAll()
    return openshifts;
  }

}
