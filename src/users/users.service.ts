import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from "./users.model";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from "../roles/roles.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { Role } from 'src/roles/roles.model';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import * as bcrypt from 'bcryptjs'
import RequestCustom from 'src/types/request.t';
import { log } from 'node:console';
import { Job } from 'src/job/job.model';
import { AddJobDto } from './dto/add-job.dto';
import { JobService } from 'src/job/job.service';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
        private jobService: JobService,
        private roleService: RolesService) { }



    async create(dto: CreateUserDto) {
        try {
            const hashPassword = await bcrypt.hash(dto.password, 5);
            const user = await this.userRepository.create({ ...dto, password: hashPassword });
            const role = await this.roleService.getRoleByValue("ADMIN")
            await user.$set('roles', [role.id])
            user.roles = [role]
            user.password = ''
            return user;
        }
        catch (error) {
            // ошибки уникальности
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw new HttpException(
                    'Пользователь с таким именем уже существует',
                    HttpStatus.BAD_REQUEST
                );
            }
            throw error;
        }
    }



    async edit(dto: UpdateUserDto) {
        const { jobs, ...restDto } = dto
        const user = await this.userRepository.findOne({ where: { id: dto.id } });
        if (!user) throw new HttpException('Пользователь не существует', HttpStatus.NOT_FOUND)

        if (jobs) await user.$set('jobs', jobs[0].value)
        const updateData: Partial<User> = { ...restDto };
        const updedUser = await this.userRepository.update(restDto, { where: { id: user.id }, });

        return updedUser;
    }



    async getThisUser(req: Request) {
        const { user } = req as RequestCustom
        console.log(user);

        const thisUser = await this.userRepository.findOne({
            where: { id: user.id }, attributes: {
                exclude: ['password']
            },
            include: [{
                model: Role,
                as: 'roles',
                attributes: ['value'],
                through: { attributes: [] }
            },
            {
                model: Job,
                as: 'jobs',
                attributes: ['value', 'description'],
                through: { attributes: [] }
            }]
        });
        return thisUser
    }



    async getAll() {
        const users = await this.userRepository.findAll({
            include: [{
                model: Role,
                as: 'roles',
                attributes: ['value'],
                through: { attributes: [] }
            },
            {
                model: Job,
                as: 'jobs',
                attributes: ['value', 'description'],
                through: { attributes: [] }
            }],
            attributes: { exclude: ['password'] }
        });
        return users;
    }



    async getByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { fio: email }, include: { all: true } })
        return user;
    }



    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && user) {
            await user.$add('role', role.id);
            return dto;
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
    }



    async addJob(dto: AddJobDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const job = await this.jobService.getById(dto.id);
        if (job && user) {
            await user.$add('job', job.id);
            return dto;
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
    }



    async ban(dto: BanUserDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }
        user.banned = true;
        user.banReason = dto.banReason;
        await user.save();
        return user;
    }
}
