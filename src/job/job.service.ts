import { Injectable } from '@nestjs/common';
import {CreateJobDto} from "./dto/CreateJob.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Job} from "./job.model";

@Injectable()
export class JobService {

    constructor(@InjectModel(Job) private jobRepository: typeof Job) {}

    async create(dto: CreateJobDto) {
        const job = await this.jobRepository.create(dto);
        return job;
    }

    async getByValue(value: string) {
        const job = await this.jobRepository.findOne({where: {value}})
        return job;
    }

    async get() {
        const job = await this.jobRepository.findAll({ include: { all: true } })
        return job;
    }

}
