import {Module} from '@nestjs/common';
import {JobService} from './job.service';
import {JobsController} from './job.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Job} from "./job.model";
import {User} from "../users/users.model";
import {UserJobs} from "./user-job.model";

@Module({
  providers: [JobService],
  controllers: [JobsController],
  imports: [
    SequelizeModule.forFeature([Job, User, UserJobs])
  ],
  exports: [
    JobService
  ]
})
export class JobsModule {}
