import { Body, Controller, Get, Post, Query, Request, UseGuards, UsePipes } from '@nestjs/common';
import { ShiftsService } from "./shifts.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Shifts } from "./shifts.model";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateShiftsDto } from './dto/CreateShifts.dto ';
import { DeleteShiftDto } from './dto/DeleteShift.dto';
import { EditShiftsDto } from './dto/EditShifts.dto';
import { GetShiftsByShopDto } from './dto/getShiftsByShop.dto';
import { UsersShiftsDto } from './dto/UsersShifts.dto';
import RequestCustom from 'src/types/request.t';

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
    getUsersShifts(@Request() req: Request, @Query() query: UsersShiftsDto) {
        return this.ShiftsService.getUsersShifts(req, query)
    }



    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '...' })
    @ApiResponse({ status: 200, type: [Shifts] })
    @Post("/create")
    create(@Body() dto: CreateShiftsDto, @Request() req: RequestCustom) {
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



    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '...' })
    @ApiResponse({ status: 200, type: [Shifts] })
    @Post("/getShiftsByShop")
    getShiftsByShop(@Body() dto: GetShiftsByShopDto, @Request() req: Request) {
        return this.ShiftsService.getShiftsByShop(dto, req)
    }




    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '...' })
    @ApiResponse({ status: 200, type: [Shifts] })
    @Post("/getShiftsByShop")
    getShiftsByFullInfo(@Body() dto: GetShiftsByShopDto, @Request() req: Request) {
        return this.ShiftsService.getShiftsFullInfo(dto, req)
    }


}
