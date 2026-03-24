import { Injectable } from '@nestjs/common';
import { CreateJobDto } from "./dto/CreateJob.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Job } from "./job.model";
import { Delay } from 'src/decorators/Delay';

@Injectable()
export class JobService {

    constructor(@InjectModel(Job) private jobRepository: typeof Job) { }

    async create(dto: CreateJobDto) {
        const job = await this.jobRepository.create(dto);
        return job;
    }

    async getById(id: string) {
        const job = await this.jobRepository.findOne({ where: { id } })
        return job;
    }

    async getAll() {
        const jobs = await this.jobRepository.findAll();
        return jobs
    }

}
