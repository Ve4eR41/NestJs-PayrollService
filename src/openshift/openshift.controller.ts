import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Openshift } from './openshift.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import RequestCustom from 'src/types/request.t';
import { OpenshiftService } from './openshift.service';
import { Roles } from 'src/auth/roles-auth.decorator';

@ApiTags('Для отслеживания и хранения открытой смены пользователей')
@Controller('shifts/openshift')
export class OpenshiftController {
    constructor(private OpenshiftService: OpenshiftService) { }


    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '...' })
    @ApiResponse({ status: 200, type: [Openshift] })
    @Post("/open")
    open(@Request() req: RequestCustom) {
        return this.OpenshiftService.open(req)
    }

    

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '...' })
    @ApiResponse({ status: 200, type: [Openshift] })
    @Post("/close")
    close(@Request() req: RequestCustom) {
        return this.OpenshiftService.close(req)
    }



    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '...' })
    @ApiResponse({ status: 200, type: [Openshift] })
    @Get("/isOpen")
    isOpen(@Request() req: RequestCustom) {
        return this.OpenshiftService.isOpen(req)
    }

    

    @Roles('ADMIN','MODER')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: '...' })
    @ApiResponse({ status: 200, type: [Openshift] })
    @Get("/getAll")
    getAll(@Request() req: RequestCustom) {
        return this.OpenshiftService.getAll()
    }

}
