import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {JobService} from "./job.service";
import {CreateJobDto} from "./dto/CreateJob.dto";

@Controller('job')
export class JobsController {
    constructor(private jobService: JobService) {}



    @Post()
    create(@Body() dto: CreateJobDto) {
        return this.jobService.create(dto);
    }



    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.jobService.getByValue(value);
    }


    @Get('')
    getALL() {
        return this.jobService.get();
    }
}
