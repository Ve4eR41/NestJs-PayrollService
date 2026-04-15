import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Shop } from './shop.model';

@Module({
    providers: [ShopService],
    controllers: [ShopController],
    imports: [
        SequelizeModule.forFeature([Shop])
    ],
    exports: [
        ShopService
    ]
})
export class ShopModule { }
