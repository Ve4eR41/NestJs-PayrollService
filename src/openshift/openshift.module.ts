import { forwardRef, Module } from '@nestjs/common';
import { OpenshiftController } from './openshift.controller';
import { OpenshiftService } from './openshift.service';
import { Openshift } from './openshift.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    controllers: [OpenshiftController],
    providers: [OpenshiftService],
    imports: [
        SequelizeModule.forFeature([Openshift]),
        forwardRef(() => AuthModule),
    ],
    exports: [OpenshiftService]
})
export class OpenshiftModule { }
