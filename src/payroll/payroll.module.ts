import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Job } from 'src/job/job.model';
import { Shifts } from 'src/shifts/shifts.model';
import { ShiftType } from 'src/shiftType/shiftType.model';
import { User } from 'src/users/users.model';
import { PayrollController } from './payroll.controller';
import { PayrollService } from './payroll.service';

@Module({
    controllers: [PayrollController],
    providers: [PayrollService],
    imports: [
        SequelizeModule.forFeature([Shifts, User, Job, ShiftType]),
        forwardRef(() => AuthModule)
    ],
    exports: [PayrollService]
})
export class PayrollModule { }

