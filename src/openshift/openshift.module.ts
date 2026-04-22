import { forwardRef, Module } from '@nestjs/common';
import { OpenshiftController } from './openshift.controller';
import { OpenshiftService } from './openshift.service';
import { Openshift } from './openshift.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { ShiftsModule } from 'src/shifts/shifts.module';
import { ShiftType } from 'src/shiftType/shiftType.model';

@Module({
    controllers: [OpenshiftController],
    providers: [OpenshiftService],
    imports: [
        SequelizeModule.forFeature([Openshift, ShiftType]),
        forwardRef(() => AuthModule),
        forwardRef(() => ShiftsModule),
    ],
    exports: [OpenshiftService]
})
export class OpenshiftModule { }
