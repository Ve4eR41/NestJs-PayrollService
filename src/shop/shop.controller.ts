import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/CreateShop.dto';

@Controller('shop')
export class ShopController {
    constructor(private shopService: ShopService) { }

    @Post()
    create(@Body() dto: CreateShopDto) {
        return this.shopService.create(dto);
    }

    @Get('/:id')
    getById(@Param('id') id: string) {
        return this.shopService.getById(id);
    }

    @Get('')
    getAll() {
        return this.shopService.getAll();
    }
}
