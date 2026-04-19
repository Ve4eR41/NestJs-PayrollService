import { forwardRef, Module } from '@nestjs/common';
import { RetailPlanService } from './retail-plan.service';
import { RetailPlansController } from './retail-plan.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { RetailPlan } from "./retail-plan.model";
import { Shop } from "../shop/shop.model";
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [RetailPlanService],
  controllers: [RetailPlansController],
  imports: [
    SequelizeModule.forFeature([RetailPlan, Shop]),
    forwardRef(() => AuthModule),
  ],
  exports: [
    RetailPlanService
  ]
})
export class RetailPlansModule { }
