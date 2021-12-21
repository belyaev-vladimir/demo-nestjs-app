import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageRequest } from '../common/models/pagination/page-request.model';
import { Page } from '../common/models/pagination/page.model';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductNotFoundException } from './exceptions/product-not-found.exception';
import { UpdateProductDto } from './dto/update-product.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProductCustomService {
  private _cache:number = 60000;

  constructor(
    @InjectRepository(Product)
    private readonly _productRepository: Repository<Product>,
    private readonly _configService: ConfigService,
  ) {
    this._cache =  this._configService.get<number>('CACHE');
  }

  public async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    const prod: Product = this._productRepository.create({
      ...createProductDto,
    });

    return this._productRepository.save(prod);
  }

  public async getAllProducts(): Promise<Product[]> {
    return this._productRepository.find();
  }

  public async getAllUsersByPage(
    pageRequest: PageRequest,
  ): Promise<Page<Product>> {
    const sort: { [key: string]: string } = pageRequest.sort.asKeyValue();
    const result = await this._productRepository.findAndCount({
      order: sort,
      skip: (pageRequest.page - 1) * pageRequest.size,
      take: pageRequest.size,
    });
    return Page.from(result[0], result[1], pageRequest);
  }

  public async getProductById(id: number): Promise<Product> {
    const product: Product = await this._productRepository.findOne({
      where: { id },
      cache: this._cache,
    });
    if (!product) {
      throw new ProductNotFoundException();
    }
    return product;
  }

  public async updateProductById(
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product: Product = await this._productRepository.findOne(
      updateProductDto.id,
    );
    if (!product) {
      throw new ProductNotFoundException();
    }

    product.name = updateProductDto.name;

    return this._productRepository.save(product);
  }
}
