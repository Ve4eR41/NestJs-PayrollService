import { forwardRef, Module } from '@nestjs/common';
import { ShiftsController } from './shifts.controller';
import { ShiftsService } from './shifts.service';
import { RolesModule } from "../roles/roles.module";
import { AuthModule } from "../auth/auth.module";
import { Shifts } from './shifts.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';

@Module({
    controllers: [ShiftsController],
    providers: [ShiftsService],
    imports: [
        RolesModule,
        SequelizeModule.forFeature([Shifts, User]),
        forwardRef(() => AuthModule),
    ],
    exports: [
        ShiftsService,
    ]
})
export class ShiftsModule { }
