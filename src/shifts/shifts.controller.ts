import { Body, Controller, Get, Post, Request, UseGuards, UsePipes } from '@nestjs/common';
import { ShiftsService } from "./shifts.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Shifts } from "./shifts.model";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { ValidationPipe } from "../pipes/validation.pipe";
import { get } from 'http';
import { CreateShiftsDto } from './dto/CreateShifts.dto ';
import { DeleteShiftDto } from './dto/DeleteShift.dto';
import { EditShiftsDto } from './dto/EditShifts.dto';

@ApiTags('///')
@Controller('shifts')
export class ShiftsController {

    constructor(private ShiftsService: ShiftsService) { }



    @ApiOperation({ summary: 'тестовый запрос для проверки того что все работает' })
    @ApiResponse({ status: 200, type: [Shifts] })
    @Get("/test")
    getTest() {
        return "Hello !"
    }



    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '...' })
    @ApiResponse({ status: 200, type: [Shifts] })
    @Get("/all")
    getAll() {
        return this.ShiftsService.getAll()
    }



    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '...' })
    @ApiResponse({ status: 200, type: [Shifts] })
    @Get("")
    getUsersShifts(@Request() req: Request) {
        return this.ShiftsService.getUsersShifts(req)
    }



    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '...' })
    @ApiResponse({ status: 200, type: [Shifts] })
    @Post("/create")
    create(@Body() dto: CreateShiftsDto, @Request() req: Request) {
        return this.ShiftsService.create(dto, req)
    }



    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '...' })
    @ApiResponse({ status: 200, type: [Shifts] })
    @Post("/delete")
    delete(@Body() dto: DeleteShiftDto, @Request() req: Request) {
        return this.ShiftsService.delete(dto, req)
    }



    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '...' })
    @ApiResponse({ status: 200, type: [Shifts] })
    @Post("/edit")
    edit(@Body() dto: EditShiftsDto, @Request() req: Request) {
        return this.ShiftsService.edit(dto, req)
    }


}
