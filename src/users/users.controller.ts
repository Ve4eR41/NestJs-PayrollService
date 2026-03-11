import { Body, Controller, Get, Post, Request, UseGuards, UsePipes } from '@nestjs/common';
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./users.model";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { ValidationPipe } from "../pipes/validation.pipe";
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { AddJobDto } from './dto/add-job.dto';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }



    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Получить всех пользователей' })
    @ApiResponse({ status: 200, type: [User] })
    @Get()
    getAll() {
        return this.usersService.getAll();
    }  
     
    
    
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Получить данные от текущего пользователя' })
    @ApiResponse({ status: 200, type: [User] })
    @Get('/thisUser')
    getThisUser(@Request() req: Request) {
        return this.usersService.getThisUser(req);
    }



    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Изменить пользователя' })
    @ApiResponse({ status: 200, type: User })
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.create(userDto);
    }



    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Создание пользователя' })
    @ApiResponse({ status: 200, type: User })
    @Post('/upd')
    edit(@Body() userDto: UpdateUserDto) {
        return this.usersService.edit(userDto);
    }



    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Выдать роль' })
    @ApiResponse({ status: 200 })
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }



    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Выдать должность' })
    @ApiResponse({ status: 200 })
    @Post('/addJob')
    addJob(@Body() dto: AddJobDto) {
        return this.usersService.addJob(dto);
    }




    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Забанить пользователя' })
    @ApiResponse({ status: 200 })
    @Post('/ban')
    ban(@Body() dto: BanUserDto) {
        return this.usersService.ban(dto);
    }
}
