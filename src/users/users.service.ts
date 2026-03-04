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

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
        private roleService: RolesService) { }



    async create(dto: CreateUserDto) {
        try {
            const hashPassword = await bcrypt.hash(dto.password, 5);
            const user = await this.userRepository.create({ ...dto, password: hashPassword });
            const role = await this.roleService.getRoleByValue("ADMIN")
            await user.$set('roles', [role.id])
            user.roles = [role]
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
        const user = await this.userRepository.findOne({ where: { id: dto.id } });
        if (!user) throw new HttpException('Пользователь не существует', HttpStatus.NOT_FOUND)

        const updedUser = await this.userRepository.update({ ...dto }, {
            where: { id: user.id },
        });
        return updedUser;
    }



    async getAll() {
        const users = await this.userRepository.findAll({
            include: [{
                model: Role,
                as: 'roles',
                attributes: ['value'],
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
