import {
  getRepository,
  MigrationInterface,
  QueryRunner,
  Repository,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { MOCK_PRODUCTS } from '../seeds/products.seed';

export class PopulateProduct1640045353610 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const productRepository: Repository<Product> = getRepository(Product);

    await productRepository.save(MOCK_PRODUCTS);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const productRepository: Repository<Product> = getRepository(Product);
    await productRepository.clear();
  }
}
