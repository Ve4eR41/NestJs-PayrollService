import { Injectable } from '@nestjs/common';
import { CreateRetailPlanDto } from "./dto/CreateRetailPlan.dto";
import { InjectModel } from "@nestjs/sequelize";
import { RetailPlan } from "./retail-plan.model";

@Injectable()
export class RetailPlanService {

    constructor(@InjectModel(RetailPlan) private retailPlanRepository: typeof RetailPlan) { }

    async create(dto: CreateRetailPlanDto) {
        const retailPlan = await this.retailPlanRepository.create(dto);
        return retailPlan;
    }

    async getByShopId(id: string) {
        const shopId = Number(id);
        const retailPlans = await this.retailPlanRepository.findAll({
            where: { shopId },
            order: [['date', 'DESC']],
        });
        return retailPlans;
    }

    async getAll() {
        const retailPlans = await this.retailPlanRepository.findAll();
        return retailPlans
    }

}
