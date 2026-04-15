import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ShiftTypeService } from './shiftType.service';
import { CreateShiftTypeDto } from './dto/CreateShiftType.dto';

@Controller('shiftType')
export class ShiftTypeController {
    constructor(private shiftTypeService: ShiftTypeService) { }

    @Post()
    create(@Body() dto: CreateShiftTypeDto) {
        return this.shiftTypeService.create(dto);
    }

    @Get('/:id')
    getById(@Param('id') id: string) {
        return this.shiftTypeService.getById(id);
    }

    @Get('')
    getAll() {
        return this.shiftTypeService.getAll();
    }
}
