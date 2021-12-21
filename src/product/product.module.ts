import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCustomService } from './product.custom.service';
import { ProductCrudService } from './product.crud.service';
import { ProductCustomController } from './product.custom.controller';
import { ProductCrudController } from './product.crud.controller';
import { Product } from './entities/product.entity';
import { AuthModule } from '../auth/auth.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), AuthModule,ConfigService],
  providers: [ProductCustomService, ProductCrudService, Logger],
  controllers: [ProductCustomController, ProductCrudController],
})
export class ProductModule {}
