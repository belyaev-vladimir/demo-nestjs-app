import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductCrudService extends TypeOrmCrudService<Product>{
  constructor(@InjectRepository(Product) productsRepository: Repository<Product>){
    super(productsRepository);
  }
}
