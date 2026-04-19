import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RetailPlanService } from "./retail-plan.service";
import { CreateRetailPlanDto } from "./dto/CreateRetailPlan.dto";
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';

@UseGuards(JwtAuthGuard)
@Controller('retail-plan')
export class RetailPlansController {
    constructor(private retailPlanService: RetailPlanService) { }

    @Roles('ADMIN', 'MODER')
    @Post()
    create(@Body() dto: CreateRetailPlanDto) {
        return this.retailPlanService.create(dto);
    }

    @Get('/:shopId')
    getByValue(@Param('shopId') shopId: string) {
        return this.retailPlanService.getByShopId(shopId);
    }

    @Get('')
    getALL() {
        return this.retailPlanService.getAll();
    }
}
