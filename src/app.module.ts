import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { Post } from "./posts/posts.model";
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from 'path';
import { ShiftsModule } from "./shifts/shifts.module";
import { Shifts } from "./shifts/shifts.model";
import { JobsModule } from "./job/job.module";
import { Job } from "./job/job.model";
import { UserJobs } from "./job/user-job.model";
import { RetailPlansModule } from "./retail-plan/retail-plan.module";
import { RetailPlan } from "./retail-plan/retail-plan.model";
import { OpenshiftModule } from './openshift/openshift.module';
import { Openshift } from "./openshift/openshift.model";
import { Shop } from "./shop/shop.model";
import { ShopModule } from "./shop/shop.module";
import { ShiftTypeModule } from "./shiftType/shiftType.module";
import { ShiftType } from "./shiftType/shiftType.model";
import { PayrollModule } from "./payroll/payroll.module";

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRESS_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRESS_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Role, UserRoles, Post, Shifts, Job, UserJobs, RetailPlan, Openshift, Shop, ShiftType],
            autoLoadModels: true
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        PostsModule,
        FilesModule,
        ShiftsModule,
        JobsModule,
        RetailPlansModule,
        OpenshiftModule,
        ShopModule,
        ShiftTypeModule,
        PayrollModule
    ]
})
export class AppModule { }
