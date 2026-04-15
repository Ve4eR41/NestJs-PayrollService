import { Module } from '@nestjs/common';
import { ShiftTypeService } from './shiftType.service';
import { ShiftTypeController } from './shiftType.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShiftType } from './shiftType.model';

@Module({
    providers: [ShiftTypeService],
    controllers: [ShiftTypeController],
    imports: [
        SequelizeModule.forFeature([ShiftType])
    ],
    exports: [
        ShiftTypeService
    ]
})
export class ShiftTypeModule { }
