import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Shop } from './shop.model';
import { CreateShopDto } from './dto/CreateShop.dto';

@Injectable()
export class ShopService {

    constructor(@InjectModel(Shop) private shopRepository: typeof Shop) { }

    async create(dto: CreateShopDto) {
        const shop = await this.shopRepository.create(dto);
        return shop;
    }

    async getById(id: string) {
        const shop = await this.shopRepository.findOne({ where: { id } });
        return shop;
    }

    async getAll() {
        const shops = await this.shopRepository.findAll({ include: { all: true } });
        return shops;
    }
}
